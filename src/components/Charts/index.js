import {Component} from 'react'
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import LoaderSpinner from '../LoaderSpinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Charts extends Component {
  state = {
    timelineData: [],
    districtWiseTimeLines: null,
    displayDistrictTimelines: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTimeLineDatas()
  }

  convertObjectsDataIntoListItemsUsingForInMethod = data => {
    const resultList = []

    const keyNames = Object.keys(data)

    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        resultList.push({
          Date: keyName,
          confirmed,
          deceased,
          recovered,
          tested,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList
  }

  getTimeLineDatas = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {stateCode} = this.props

    const url = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const listOfTestedDates = this.convertObjectsDataIntoListItemsUsingForInMethod(
        data[`${stateCode}`].dates,
      )
      const districtTimeLines = data[`${stateCode}`].districts
      this.setState({
        districtWiseTimeLines: districtTimeLines,
        timelineData: listOfTestedDates,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  dataFormatter = number => {
    if (number > 100000) {
      return `${(number / 100000).toString()}L`
    }
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  renderFailureView = () => (
    <div className="job-item-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-item-failure-img"
      />
      <h1 className="job-item-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="job-item-failure-description">
        We cannot seem to find the page you are looking for
      </p>

      <button
        type="button"
        testid="button"
        className="job-item-failure-button"
        onClick={this.getJobData}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container3" testid="timelinesDataLoader">
      <LoaderSpinner />
    </div>
  )

  districtChanged = value => {
    const {districtWiseTimeLines} = this.state
    const specificDistrictTimelines = districtWiseTimeLines[`${value.label}`]
    const formattedTimeLinesForDistricts = this.convertObjectsDataIntoListItemsUsingForInMethod(
      specificDistrictTimelines.dates,
    )

    this.setState({displayDistrictTimelines: formattedTimeLinesForDistricts})
  }

  renderTimeLineView = () => {
    const {timelineData, displayDistrictTimelines} = this.state
    const {activeTab} = this.props

    let barColor = ''
    switch (activeTab) {
      case 'confirmed':
        barColor = '#9A0E31'
        break
      case 'deceased':
        barColor = '#474C57'
        break
      case 'active':
        barColor = '#0A4FA0'
        break
      default:
        barColor = '#216837'
        break
    }

    const options = {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    }

    const month = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ]
    let minConfirmedCases = Infinity
    let minActiveCases = Infinity
    let minDeceasedCases = Infinity
    let minRecoveredCases = Infinity
    let minTestedCases = Infinity

    const formattedTimeLine = timelineData.map(each => {
      const newDate = new Date(each.Date)
      const monthName = month[newDate.getMonth()]
      const formattedDate = `${newDate.getDate()} ${monthName}`
      if (each.confirmed < minConfirmedCases) {
        minConfirmedCases = each.confirmed
      }
      if (each.active < minActiveCases) {
        minActiveCases = each.active
      }
      if (each.deceased < minDeceasedCases) {
        minDeceasedCases = each.deceased
      }
      if (each.recovered < minRecoveredCases) {
        minRecoveredCases = each.recovered
      }
      if (each.tested < minTestedCases) {
        minTestedCases = each.tested
      }

      return {...each, Date: formattedDate}
    })

    // const lastTenTimeLineData = formattedTimeLine.slice(
    //   timelineData.length - 10,
    //   timelineData.length,
    // )

    const maxBarChart = formattedTimeLine.slice(
      Math.max(formattedTimeLine.length - 10, 0),
    )
    // eslint-disable-next-line
    // const districtCodeAndNameList = districtNames.map(each => ({
    //   value: each.stateName,
    //   label: each.stateName,
    // }))

    let districtList
    if (displayDistrictTimelines.length === 0) {
      districtList = timelineData
    } else {
      districtList = displayDistrictTimelines
      // eslint-disable-next-line
      const formattedDistrictTimeLineDatas = districtList.map(each => {
        if (each.confirmed < minConfirmedCases) {
          minConfirmedCases = each.confirmed
        }
        if (each.active < minActiveCases) {
          minActiveCases = each.active
        }
        if (each.deceased < minDeceasedCases) {
          minDeceasedCases = each.deceased
        }
        if (each.recovered < minRecoveredCases) {
          minRecoveredCases = each.recovered
        }
        if (each.tested < minTestedCases) {
          minTestedCases = each.tested
        }

        return {...each}
      })
    }

    return (
      <>
        <div className="bar-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={800}
              height={450}
              data={maxBarChart}
              margin={{top: 30, bottom: 50}}
            >
              <XAxis
                dataKey="Date"
                stroke={`${barColor}`}
                tick={{
                  stroke: 'transparant',
                  strokeWidth: 1,
                  fontSize: 12,
                  fontFamily: 'Roboto',
                }}
                axisLine="false"
              />
              <Tooltip stroke={`${barColor}`} />
              <Legend
                wrapperStyle={{fontSize: 22, textTransform: 'capitalize'}}
              />
              <Bar
                dataKey={`${activeTab}`}
                fill={`${barColor}`}
                label={{
                  position: 'top',
                  fill: `${barColor}`,
                  fontSize: 12,
                }}
                barSize="2%"
                radius={[7, 7, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* <div className="bar-chart-container-sm">
          <BarChart
            width={600}
            height={350}
            data={maxBarChart}
            margin={{top: 30, bottom: 50}}
          >
            <XAxis
              dataKey="Date"
              stroke={`${barColor}`}
              tick={{
                stroke: 'transparant',
                strokeWidth: 1,
                fontSize: 12,
                fontFamily: 'Roboto',
              }}
              axisLine="false"
            />
            <Tooltip stroke={`${barColor}`} />
            <Legend
              wrapperStyle={{fontSize: 22, textTransform: 'capitalize'}}
            />
            <Bar
              dataKey={`${activeTab}`}
              fill={`${barColor}`}
              label={{
                position: 'top',
                fill: `${barColor}`,
                fontSize: 12,
              }}
              barSize="2%"
              radius={[7, 7, 0, 0]}
            />
          </BarChart>
        </div> /*}
        {/* // <div className="bar-chart-container">
        //   <BarChart
        //     data={maxBarChart}
        //     margin={{
        //       top: 30,
        //       bottom: 50,
        //     }}
        //   >
        //     <XAxis
        //       dataKey="Date"
        //       stroke={`${barColor}`}
        //       tick={{
        //         stroke: 'transparant',
        //         strokeWidth: 1,
        //         fontSize: 12,
        //         fontFamily: 'Roboto',
        //       }}
        //       axisLine="false"
        //     />
        //     <Tooltip cursor={{fill: 'white'}} />
        //     <Bar
        //       dataKey={`${activeTab}`}
        //       fill={`${barColor}`}
        //       className="bar"
        //       label={{
        //         position: 'top',
        //         style: {
        //           fill: `${barColor}`,
        //           fontFamily: 'Roboto',
        //           fontSize: 12,
        //         },
        //       }}
        //       barSize="2%"
        //       radius={[7, 7, 0, 0]}
        //     />
        //   </BarChart>
        // </div> */}
        <>
          <h1 className="daily-spread-heading">Daily Spread Trends</h1>
        </>

        <div className="line-charts-wrapper" testid="lineChartsContainer">
          <>
            <div className="line-chart-div red-bg">
              <h1 className="confirmed-legend-heading">Confirmed</h1>

              <ResponsiveContainer width="100%" height="80%">
                <LineChart
                  data={districtList}
                  margin={{top: 5, right: 20, left: 20, bottom: 5}}
                  width={1000}
                  height={300}
                >
                  <XAxis
                    dataKey="Date"
                    stroke="#FF073A"
                    tick={{
                      fontSize: 12,
                      fontFamily: 'Roboto',
                    }}
                  />
                  <YAxis
                    stroke="#FF073A"
                    tickFormatter={this.dataFormatter}
                    tick={{
                      fontSize: 12,
                      fontFamily: 'Roboto',
                    }}
                    domain={[minConfirmedCases, 'auto']}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="confirmed"
                    stroke="#FF073A"
                    fill="#FF073A"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
          <>
            <div className="line-chart-div blue-bg">
              <h1 className="confirmed-legend-heading">Total Active</h1>
              <ResponsiveContainer width="100%" height="80%">
                <LineChart
                  data={districtList}
                  margin={{top: 5, right: 40, left: 0, bottom: 5}}
                  options={options}
                  width={1000}
                  height={300}
                >
                  <XAxis
                    dataKey="Date"
                    stroke="#007BFF"
                    tick={{
                      fontSize: 12,
                      fontFamily: 'Roboto',
                    }}
                  />
                  <YAxis
                    stroke="#007BFF"
                    tickFormatter={this.dataFormatter}
                    tick={{
                      fontSize: 12,
                      fontFamily: 'Roboto',
                    }}
                    domain={[minActiveCases, 'auto']}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="active"
                    stroke="#007BFF"
                    fill="#007BFF"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
          <>
            <div className="line-chart-div green-bg">
              <h1 className="confirmed-legend-heading">Recovered</h1>
              <ResponsiveContainer width="100%" height="80%">
                <LineChart
                  data={districtList}
                  margin={{top: 5, right: 40, left: 0, bottom: 5}}
                  options={options}
                  width={1000}
                  height={300}
                >
                  <XAxis
                    dataKey="Date"
                    stroke="#27A243"
                    tick={{
                      fontSize: 12,
                      fontFamily: 'Roboto',
                    }}
                  />
                  <YAxis
                    stroke="#27A243"
                    tickFormatter={this.dataFormatter}
                    tick={{
                      fontSize: 12,
                      fontFamily: 'Roboto',
                    }}
                    domain={[minRecoveredCases, 'auto']}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="recovered"
                    stroke="#27A243"
                    fill="#27A243"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
          <>
            <div className="line-chart-div grey-bg">
              <h1 className="confirmed-legend-heading">Deceased</h1>
              <ResponsiveContainer width="100%" height="80%">
                <LineChart
                  data={districtList}
                  margin={{top: 5, right: 40, left: 0, bottom: 5}}
                  options={options}
                  width={1000}
                  height={300}
                >
                  <XAxis
                    dataKey="Date"
                    stroke="#6C757D"
                    tick={{
                      fontSize: 12,
                      fontFamily: 'Roboto',
                    }}
                  />
                  <YAxis
                    stroke="#6C757D"
                    tickFormatter={this.dataFormatter}
                    tick={{
                      fontSize: 12,
                      fontFamily: 'Roboto',
                    }}
                    domain={[minDeceasedCases, 'auto']}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="deceased"
                    stroke="#6C757D"
                    fill="#6C757D"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
          <>
            <div className="line-chart-div violet-bg">
              <h1 className="confirmed-legend-heading">Tested</h1>
              <ResponsiveContainer width="100%" height="80%">
                <LineChart
                  data={districtList}
                  margin={{top: 5, right: 40, left: 0, bottom: 5}}
                  options={options}
                  width={1000}
                  height={300}
                >
                  <XAxis
                    dataKey="Date"
                    stroke="#9673B9"
                    tick={{
                      fontSize: 12,
                      fontFamily: 'Roboto',
                    }}
                  />
                  <YAxis
                    stroke="#9673B9"
                    tickFormatter={this.dataFormatter}
                    tick={{
                      fontSize: 12,
                      fontFamily: 'Roboto',
                    }}
                    domain={[minTestedCases, 'auto']}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="tested"
                    stroke="#9673B9"
                    fill="#9673B9"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        </div>
      </>
    )
  }

  renderTimeLineViewForStates = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTimeLineView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderTimeLineViewForStates()}</>
  }
}

export default Charts

// import {Component} from 'react'
// import {
//   BarChart,
//   Bar,
//   Tooltip,
//   Legend,
//   XAxis,
//   LineChart,
//   Line,
//   YAxis,
// } from 'recharts'
// import LoaderSpinner from '../LoaderSpinner'
// import './index.css'

// const apiStatusConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   inProgress: 'IN_PROGRESS',
// }

// class Charts extends Component {
//   state = {
//     chartsList: '',
//     chartsOther: '',
//     apiStatus: apiStatusConstants.initial,
//   }

//   componentDidMount() {
//     this.getStateCovidData()
//   }

//   getStateCovidData = async () => {
//     this.setState({
//       apiStatus: apiStatusConstants.inProgress,
//     })

//     const {stateCode} = this.props

//     const apiUrl = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
//     const options = {
//       method: 'GET',
//     }
//     const response = await fetch(apiUrl, options)
//     if (response.ok === true) {
//       const data = await response.json()
//       const dataObject = Object.keys(data[stateCode].dates)

//       const dataState = dataObject.map(eachDate => ({
//         eachDate,
//         confirmed: data[stateCode].dates[eachDate].total.confirmed,
//         recovered: data[stateCode].dates[eachDate].total.recovered,
//         deceased: data[stateCode].dates[eachDate].total.deceased,
//         tested: data[stateCode].dates[eachDate].total.tested,
//         active:
//           data[stateCode].dates[eachDate].total.confirmed -
//           (data[stateCode].dates[eachDate].total.recovered +
//             data[stateCode].dates[eachDate].total.deceased),
//       }))
//       this.setState({
//         chartsList: dataState,
//         chartsOther: dataState,
//         apiStatus: apiStatusConstants.success,
//       })
//     } else {
//       console.log('Fetching Error')
//     }
//   }

//   barGraph = () => {
//     const {chartsList} = this.state
//     const {category} = this.props
//     const maxBarChart = chartsList.slice(Math.max(chartsList.length - 10, 0))

//     let barColor
//     if (category === 'confirmed') {
//       barColor = '#9A0E31'
//     } else if (category === 'active') {
//       barColor = '#0A4FA0'
//     } else if (category === 'recovered') {
//       barColor = '#216837'
//     } else if (category === 'deceased') {
//       barColor = '#474C57'
//     }

//     return (
//       <>
//         <div className="bar-graph-container-lg">
//           <BarChart
//             width={800}
//             barSize={45}
//             height={450}
//             data={maxBarChart}
//             margin={{top: 20, bottom: 10}}
//           >
//             <XAxis
//               dataKey="eachDate"
//               stroke={`${barColor}`}
//               interval={0}
//               axisLine={false}
//               fontSize={10}
//               tickLine={0}
//               strokeWidth={1}
//               style={{
//                 fontFamily: 'Roboto',
//                 fontWeight: 500,
//                 fontSize: 14,
//                 textTransform: 'uppercase',
//               }}
//             />
//             <Tooltip stroke={`${barColor}`} />
//             <Legend
//               wrapperStyle={{fontSize: 22, textTransform: 'capitalize'}}
//             />
//             <Bar
//               dataKey={category}
//               fill={`${barColor}`}
//               label={{
//                 position: 'top',
//                 fill: `${barColor}`,
//                 fontSize: 14,
//               }}
//               radius={[8, 8, 0, 0]}
//             />
//           </BarChart>
//         </div>

//         <div className="bar-graph-container-sm">
//           <BarChart
//             width={550}
//             barSize={35}
//             height={400}
//             data={maxBarChart}
//             margin={{top: 15, bottom: 10}}
//           >
//             <XAxis
//               dataKey="eachDate"
//               stroke={`${barColor}`}
//               interval={0}
//               axisLine={false}
//               fontSize={5}
//               tickLine={0}
//               strokeWidth={1}
//               style={{
//                 fontFamily: 'Roboto',
//                 fontWeight: 500,
//                 fontSize: 10,
//                 textTransform: 'uppercase',
//               }}
//             />
//             <Tooltip stroke={`${barColor}`} />
//             <Legend
//               wrapperStyle={{fontSize: 18, textTransform: 'capitalize'}}
//             />
//             <Bar
//               dataKey={`${category}`}
//               fill={`${barColor}`}
//               label={{
//                 position: 'top',
//                 fill: `${barColor}`,
//                 fontSize: 10,
//               }}
//               barSize="2%"
//               radius={[7, 7, 0, 0]}
//             />
//           </BarChart>
//         </div>
//       </>
//     )
//   }

//   lineGraph = (eachCategory, color) => {
//     const {chartsOther} = this.state

//     return (
//       <>
//         <div className={`line-graph-container-lg line-graph-${eachCategory}`}>
//           <LineChart
//             width={800}
//             height={270}
//             data={chartsOther}
//             margin={{
//               top: 5,
//               right: 40,
//               left: 0,
//               bottom: 5,
//             }}
//           >
//             <XAxis
//               dataKey="eachDate"
//               style={{
//                 fontFamily: 'Roboto',

//                 textTransform: 'uppercase',
//               }}
//               dy={5}
//               stroke={color}
//             />
//             <YAxis stroke={color} />
//             <Tooltip />
//             <Legend
//               wrapperStyle={{fontSize: 18, textTransform: 'capitalize'}}
//               margin={{top: 10, bottom: 10}}
//             />
//             <Line type="monotype" dataKey={eachCategory} stroke={color} />
//           </LineChart>
//         </div>

//         <div className={`line-graph-container-sm line-graph-${eachCategory}`}>
//           <LineChart
//             width={330}
//             height={200}
//             data={chartsOther}
//             margin={{
//               top: 5,
//               right: 10,
//               left: 10,
//               bottom: 5,
//             }}
//           >
//             <XAxis
//               dataKey="eachDate"
//               style={{
//                 fontFamily: 'Roboto',
//                 fontWeight: 500,
//                 textTransform: 'uppercase',
//                 fontSize: 10,
//               }}
//               dy={5}
//               stroke={color}
//             />
//             <YAxis stroke={color} fontSize={10} />
//             <Tooltip />
//             <Legend
//               wrapperStyle={{fontSize: 10, textTransform: 'capitalize'}}
//               margin={{top: 10, bottom: 10}}
//             />
//             <Line type="monotype" dataKey={eachCategory} stroke={color} />
//           </LineChart>
//         </div>
//       </>
//     )
//   }

//   lineGraphCharts = () => (
//     <div>
//       <h1 className="charts-graph-heading">Speed Trends</h1>
//       <div className="line-charts-graph">
//         <div className="charts-graph-list-margin charts-graph-red">
//           {this.lineGraph('confirmed', '#FF073A')}
//         </div>
//         <div className="charts-graph-list-margin charts-graph-blue">
//           {this.lineGraph('active', '#007BFF')}
//         </div>
//         <div className="charts-graph-list-margin charts-graph-green">
//           {this.lineGraph('recovered', '#27A243')}
//         </div>
//         <div className="charts-graph-list-margin charts-graph-gray">
//           {this.lineGraph('deceased', '#6C757D')}
//         </div>
//         <div className="charts-graph-list-margin charts-graph-vi">
//           {this.lineGraph('tested', '#9673B9')}
//         </div>
//       </div>
//     </div>
//   )

//   renderSuccessView = () => (
//     <>
//       {this.barGraph()}
//       {this.lineGraphCharts()}
//     </>
//   )

//   renderLoaderView = () => (
//     <div testid="timelinesDataLoader" id="timeline-loader-container">
//       <LoaderSpinner />
//     </div>
//   )

//   renderTimeLineUI = () => {
//     const {apiStatus} = this.state
//     switch (apiStatus) {
//       case apiStatusConstants.success:
//         return this.renderSuccessView()
//       case apiStatusConstants.inProgress:
//         return this.renderLoaderView()
//       default:
//         return null
//     }
//   }

//   render() {
//     return <div className="charts-container">{this.renderTimeLineUI()}</div>
//   }
// }

// export default Charts

// <div className="select-div">
//   <SelectDownBar
//     options={districtCodeAndNameList}
//     onChange={this.districtChanged}
//   />
// </div>

// ;<div className="select-div">
//   <SelectDownBar
//     options={districtCodeAndNameList}
//     onChange={this.districtChanged}
//   />
// </div>

// import {useState, useEffect} from 'react'
// import {useParams} from 'react-router-dom'
// import {
//   BarChart,
//   Bar,
//   Tooltip,
//   Legend,
//   XAxis,
//   LineChart,
//   Line,
//   YAxis,
// } from 'recharts'

// import './index.css'

// const Charts = props => {
//   const {category} = props
//   const {stateCode} = useParams()

//   const [stateChartData, setStateChartData] = useState({
//     chartsList: '',
//     chartsOther: '',
//   })

//   useEffect(() => {
//     const getStateCovidData = async () => {
//       const apiUrl = 'https://apis.ccbp.in/covid19-timelines-data/'
//       const options = {
//         method: 'GET',
//       }
//       const response = await fetch(apiUrl, options)
//       if (response.ok === true) {
//         const data = await response.json()
//         const dataObject = Object.keys(data[stateCode].dates)

//         const dataState = dataObject.map(eachDate => ({
//           eachDate,
//           confirmed: data[stateCode].dates[eachDate].total.confirmed,
//           recovered: data[stateCode].dates[eachDate].total.recovered,
//           deceased: data[stateCode].dates[eachDate].total.deceased,
//           tested: data[stateCode].dates[eachDate].total.tested,
//           active:
//             data[stateCode].dates[eachDate].total.confirmed -
//             data[stateCode].dates[eachDate].total.recovered -
//             data[stateCode].dates[eachDate].total.deceased,
//         }))
//         setStateChartData(prevState => ({
//           ...prevState,
//           chartsList: dataState,
//           chartsOther: dataState,
//         }))
//       }
//     }
//     getStateCovidData()
//   }, [stateCode])

//   const barGraph = () => {
//     const {chartsList} = stateChartData
//     const maxBarChart = chartsList.slice(Math.max(chartsList.length - 10, 0))

//     let barColor
//     if (category === 'confirmed') {
//       barColor = '#9A0E31'
//     } else if (category === 'active') {
//       barColor = '#0A4FA0'
//     } else if (category === 'recovered') {
//       barColor = '#216837'
//     } else if (category === 'deceased') {
//       barColor = '#474C57'
//     }

//     return (
//       <>
//         <div className="bar-graph-container-lg">
//           <BarChart
//             width={800}
//             barSize={45}
//             height={450}
//             data={maxBarChart}
//             margin={{top: 20, bottom: 10}}
//           >
//             <XAxis
//               dataKey="eachDate"
//               stroke={`${barColor}`}
//               interval={0}
//               axisLine={false}
//               fontSize={10}
//               tickLine={0}
//               strokeWidth={1}
//               style={{
//                 fontFamily: 'Roboto',
//                 fontWeight: 500,
//                 fontSize: 14,
//                 textTransform: 'uppercase',
//               }}
//             />
//             <Tooltip stroke={`${barColor}`} />
//             <Legend
//               wrapperStyle={{fontSize: 22, textTransform: 'capitalize'}}
//             />
//             <Bar
//               dataKey={category}
//               fill={`${barColor}`}
//               label={{
//                 position: 'top',
//                 fill: `${barColor}`,
//                 fontSize: 14,
//               }}
//               radius={[8, 8, 0, 0]}
//             />
//           </BarChart>
//         </div>
//         <div className="bar-graph-container-sm">
//           <BarChart
//             width={550}
//             barSize={35}
//             height={400}
//             data={maxBarChart}
//             margin={{top: 15, bottom: 10}}
//           >
//             <XAxis
//               dataKey="eachDate"
//               stroke={`${barColor}`}
//               interval={0}
//               axisLine={false}
//               fontSize={5}
//               tickLine={0}
//               strokeWidth={1}
//               style={{
//                 fontFamily: 'Roboto',
//                 fontWeight: 500,
//                 fontSize: 10,
//                 textTransform: 'uppercase',
//               }}
//             />
//             <Tooltip stroke={`${barColor}`} />
//             <Legend
//               wrapperStyle={{fontSize: 18, textTransform: 'capitalize'}}
//             />
//             <Bar
//               dataKey={category}
//               fill={`${barColor}`}
//               label={{
//                 position: 'top',
//                 fill: `${barColor}`,
//                 fontSize: 10,
//               }}
//               radius={[8, 8, 0, 0]}
//             />
//           </BarChart>
//         </div>
//       </>
//     )
//   }

//   const lineGraph = (eachCategory, color) => {
//     const {chartsOther} = stateChartData

//     return (
//       <>
//         <div className={`line-graph-container-lg line-graph-${eachCategory}`}>
//           <LineChart
//             width={800}
//             height={270}
//             data={chartsOther}
//             margin={{
//               top: 5,
//               right: 50,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <XAxis
//               dataKey="eachDate"
//               style={{
//                 fontFamily: 'Roboto',
//                 fontWeight: 500,
//                 textTransform: 'uppercase',
//               }}
//               dy={5}
//               stroke={color}
//             />
//             <YAxis stroke={color} />
//             <Tooltip />
//             <Legend
//               wrapperStyle={{fontSize: 18, textTransform: 'capitalize'}}
//               margin={{top: 10, bottom: 10}}
//             />
//             <Line type="monotype" dataKey={eachCategory} stroke={color} />
//           </LineChart>
//         </div>
//         <div className={`line-graph-container-sm line-graph-${eachCategory}`}>
//           <LineChart
//             width={330}
//             height={200}
//             data={chartsOther}
//             margin={{
//               top: 5,
//               right: 10,
//               left: 10,
//               bottom: 5,
//             }}
//           >
//             <XAxis
//               dataKey="eachDate"
//               style={{
//                 fontFamily: 'Roboto',
//                 fontWeight: 500,
//                 textTransform: 'uppercase',
//                 fontSize: 10,
//               }}
//               dy={5}
//               stroke={color}
//             />
//             <YAxis stroke={color} fontSize={10} />
//             <Tooltip />
//             <Legend
//               wrapperStyle={{fontSize: 10, textTransform: 'capitalize'}}
//               margin={{top: 10, bottom: 10}}
//             />
//             <Line type="monotype" dataKey={eachCategory} stroke={color} />
//           </LineChart>
//         </div>
//       </>
//     )
//   }

//   const lineGraphCharts = () => (
//     <div>
//       <h1 className="charts-graph-heading">Speed Trends</h1>
//       <div className="line-charts-graph">
//         <div className="charts-graph-list-margin charts-graph-red">
//           {lineGraph('confirmed', '#FF073A')}
//         </div>
//         <div className="charts-graph-list-margin charts-graph-blue">
//           {lineGraph('active', '#007BFF')}
//         </div>
//         <div className="charts-graph-list-margin charts-graph-green">
//           {lineGraph('recovered', '#27A243')}
//         </div>
//         <div className="charts-graph-list-margin charts-graph-gray">
//           {lineGraph('deceased', '#6C757D')}
//         </div>
//         <div className="charts-graph-list-margin charts-graph-vi">
//           {lineGraph('tested', '#9673B9')}
//         </div>
//       </div>
//     </div>
//   )

//   return (
//     <div className="charts-container">
//       {barGraph()}
//       {lineGraphCharts()}
//     </div>
//   )
// }

// export default Charts
