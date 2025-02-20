import {Component} from 'react'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import StateListItem from '../StateListItem'
import './index.css'

class StatesInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stateInfo: this.getStatesData(props),
    }
  }

  getStatesData = props => {
    const {covidData, statesList} = props
    return statesList.map(eachState => ({
      stateName: eachState.state_name,
      stateCode: eachState.state_code,
      confirmed: covidData[eachState.state_code]?.total?.confirmed || 0,
      deceased: covidData[eachState.state_code]?.total?.deceased || 0,
      recovered: covidData[eachState.state_code]?.total?.recovered || 0,
      population: covidData[eachState.state_code]?.meta?.population || 0,
    }))
  }

  onClickAsc = () => {
    this.setState(prevState => ({
      stateInfo: [...prevState.stateInfo].sort((a, b) =>
        a.stateName.localeCompare(b.stateName),
      ),
    }))
  }

  onClickDesc = () => {
    this.setState(prevState => ({
      stateInfo: [...prevState.stateInfo].sort((a, b) =>
        b.stateName.localeCompare(a.stateName),
      ),
    }))
  }

  render() {
    const {stateInfo} = this.state
    return (
      <div className="states-table" testid="stateWiseCovidDataTable">
        <div className="table-header-container">
          <div className="states-name-column">
            <p className="table-header-title">States/UT</p>
            <div className="sort-icons-container">
              <button
                type="button"
                onClick={this.onClickAsc}
                aria-label="Sort in ascending order"
                testid="ascendingSort"
                className="sorting-icon-button"
              >
                <FcGenericSortingAsc />
              </button>
              <button
                type="button"
                onClick={this.onClickDesc}
                aria-label="Sort in descending order"
                testid="descendingSort"
                className="sorting-icon-button"
              >
                <FcGenericSortingDesc />
              </button>
            </div>
          </div>
          <div className="table-column">
            <p className="table-header-title">Confirmed</p>
          </div>
          <div className="table-column">
            <p className="table-header-title">Active</p>
          </div>
          <div className="table-column">
            <p className="table-header-title">Recovered</p>
          </div>
          <div className="table-column">
            <p className="table-header-title">Deceased</p>
          </div>
          <div className="table-column">
            <p className="table-header-title">Population</p>
          </div>
        </div>
        <hr className="line" />
        <ul className="state-wise-stats-container">
          {stateInfo.map(eachState => (
            <StateListItem key={eachState.stateCode} stateDetails={eachState} />
          ))}
        </ul>
      </div>
    )
  }
}

export default StatesInfo

// import {useState} from 'react'
// import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
// import StateListItem from '../StateListItem'
// import './index.css'

// const StatesInfo = props => {
//   const {covidData, statesList} = props

//   const statesData = statesList.map(eachState => ({
//     stateName: eachState.state_name,
//     stateCode: eachState.state_code,
//     confirmed: Object.keys(covidData)
//       .filter(state => state === eachState.state_code)
//       .map(e => covidData[e].total.confirmed),
//     deceased: Object.keys(covidData)
//       .filter(state => state === eachState.state_code)
//       .map(e => covidData[e].total.deceased),
//     recovered: Object.keys(covidData)
//       .filter(state => state === eachState.state_code)
//       .map(e => covidData[e].total.recovered),
//     population: Object.keys(covidData)
//       .filter(state => state === eachState.state_code)
//       .map(e => covidData[e].meta.population),
//   }))

//   const [stateInfo, setStateInfo] = useState(statesData)

//   const onClickAsc = () => {
//     const sortedData = [...stateInfo].sort((a, b) =>
//       a.stateName.toUpperCase() > b.stateName.toUpperCase() ? 1 : -1,
//     )
//     setStateInfo(sortedData)
//   }

//   const onClickDesc = () => {
//     const sortedData = [...stateInfo].sort((a, b) =>
//       a.stateName.toUpperCase() > b.stateName.toUpperCase() ? -1 : 1,
//     )
//     setStateInfo(sortedData)
//   }

//   return (
//     <div className="states-table" testid="stateWiseCovidDataTable">
//       <div className="table-header-container">
//         <div className="states-name-column">
//           <p className="table-header-title">States/UT</p>
//           <div className="sort-icons-container">
//             <button
//               type="button"
//               onClick={onClickAsc}
//               aria-label="Sort in ascending order"
//               testid="ascendingSort"
//               className="sorting-icon-button"
//             >
//               <FcGenericSortingAsc />
//             </button>
//             <button
//               type="button"
//               onClick={onClickDesc}
//               aria-label="Sort in descening order"
//               testid="desceningSort"
//               className="sorting-icon-button"
//             >
//               <FcGenericSortingDesc />
//             </button>
//           </div>
//         </div>
//         <div className="table-column">
//           <p className="table-header-title">Confirmed</p>
//         </div>
//         <div className="table-column">
//           <p className="table-header-title">Active</p>
//         </div>
//         <div className="table-column">
//           <p className="table-header-title">Recovered</p>
//         </div>
//         <div className="table-column">
//           <p className="table-header-title">Deceased</p>
//         </div>
//         <div className="table-column">
//           <p className="table-header-title">Population</p>
//         </div>
//       </div>
//       <hr className="line" />
//       <ul className="state-wise-stats-container">
//         {stateInfo.map(eachState => (
//           <StateListItem key={eachState.stateCode} stateDetails={eachState} />
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default StatesInfo
