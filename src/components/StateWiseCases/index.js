import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import LoaderSpinner from '../LoaderSpinner'
import StateCards from '../StateCards'
import ShowEachDistrictData from '../ShowEachDistrictData'
import Charts from '../Charts'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410530/andaman_mhysom.png',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672412401/AP_w1oc4e.png',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410254/arunachal_pradesh_bw8ho9.png',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410254/Assam_a4blbs.png',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410254/bihar_kybwc3.png',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410530/chandigarh_zr4fuo.png',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410254/chattisgarh_soz1ch.png',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410530/daman_and_diu_d0pdbs.png',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410530/Delhi_n0z8q6.png',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410254/goa_uygnvl.png',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/Gujrat_dxrbap.png',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/Haryana_c3jwlp.png',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/HP_kjbckm.png',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/JK_cokxfa.png',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/jharkand_rmbukv.png',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/jharkand_rmbukv.png',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/kerala_u6rtqe.png',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410530/Ladakh_spcndt.png',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410530/lakshadweep_bafokl.png',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/maharashtra_fcq8aw.png',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/MP_fa9prz.png',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/manipur_lxindr.png',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/meghalaya_ygne3l.png',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/mizoram_zotja6.png',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/nagaland_lip8mi.png',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/nagaland_lip8mi.png',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410531/poducherry_xe0rp9.png',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/punjab_qra2ul.png',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/rajastan_cd1owi.png',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/Sikkim_ohg4ty.png',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/tamilnadu_lfd9fm.png',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410257/telangana_bv5bke.png',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410257/tripura_um8629.png',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410257/up_nfmlxh.png',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410257/uttrahkhand_tr0yku.png',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410257/west_bengal_c2jo9z.png',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

const categoryConstants = {
  confirmed: 'confirmed',
  active: 'active',
  recovered: 'recovered',
  deceased: 'deceased',
}

class StateWiseCases extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    stateDetails: {},
    category: categoryConstants.confirmed,
  }

  componentDidMount = () => {
    this.getSpecificData()
  }

  getSpecificData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const apiUrl = `https://apis.ccbp.in/covid19-state-wise-data`

    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      //  console.log(data)
      const stateObject = statesList.filter(
        each => each.state_code === stateCode,
      )
      const eachState = data[stateCode].total
      const stateName = stateObject[0].state_name

      const dateData = new Date(data[stateCode].meta.last_updated)
      const stateTestedData = data[stateCode].total.tested
      // const population = data[stateCode].meta.population
      const {
        meta: {population},
      } = data[stateCode]
      // console.log(dateData, data[stateCode].meta.last_updated)
      const detailsObj = {
        eachStateTotalData: eachState,
        totalTestedData: stateTestedData,
        nameOfState: stateName,
        id: stateCode,
        population,
        dataArray: data,
        date: dateData,
        stateCode,
      }
      this.setState({
        stateDetails: detailsObj,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      console.log('Fetch Error')
    }
  }

  getCategoryWiseData = () => {
    const {stateDetails, category} = this.state
    const {id, dataArray} = stateDetails

    const districtOutput = dataArray[id].districts
    const distNamesList = Object.keys(districtOutput)

    const categoryData = distNamesList.map(eachDist => ({
      distName: eachDist,
      value: districtOutput[eachDist]?.total[category] || 0,
    }))

    categoryData.sort((a, b) => b.value - a.value)

    const activeCases = distNamesList.map(eachDist => ({
      distName: eachDist,
      value:
        (districtOutput[eachDist]?.total.confirmed || 0) -
        ((districtOutput[eachDist]?.total.recovered || 0) +
          (districtOutput[eachDist]?.total.deceased || 0)),
    }))

    activeCases.sort((a, b) => b.value - a.value)

    if (category === 'active') {
      return activeCases
    }
    return categoryData
  }

  onGetCategory = value => {
    this.setState({category: value})
  }

  //   getFormattedMetaData = meta => ({
  //     date: meta.date,
  //     lastUpdated: meta.last_updated,
  //     population: meta.population,
  //     tested: meta.tested,
  //     vaccinated: meta.vaccinated,
  //   })

  renderSuccessView = () => {
    const {stateDetails, category} = this.state

    const {
      nameOfState,
      totalTestedData,
      eachStateTotalData,
      date,
      stateCode,
      population,
    } = stateDetails

    const getDateWith = day => {
      switch (day) {
        case 1:
          return '1st'
        case 2:
          return '2nd'
        case 3:
          return '3rd'
        default:
          return `${day}th`
      }
    }

    // console.log(date.getMonth())
    const monthName = date.toLocaleString('default', {month: 'long'})
    const year = date.getFullYear()
    const dateWith = getDateWith(date.getDate())

    const stateImgUrl = statesList.find(
      eachState => eachState.state_code === stateCode,
    ).imageUrl

    // console.log(dateWith)

    const categoryData = this.getCategoryWiseData()

    // const metaData = this.getFormattedMetaData(stateData.meta)
    // const {population} = metaData

    return (
      <div className="state-wise-cases-container">
        <div className="state-name-tested-container">
          <h1 className="state-name">{nameOfState}</h1>
          <div className="state-tested-container">
            <p className="tested-text">Tested</p>
            <p className="total-tested">{totalTestedData}</p>
          </div>
        </div>
        <div className="date-container">
          <p className="date-text">{`Last update on ${monthName} ${dateWith}  ${year}`}</p>
        </div>
        <div className="state-cards">
          <StateCards
            onGetCategory={this.onGetCategory}
            eachStateTotalData={eachStateTotalData}
            activeTab={category}
          />
        </div>
        {/* india map state wise shown the specific state in the map. */}
        <div className="map-container">
          <img src={stateImgUrl} alt={nameOfState} className="map-image" />
          <div className="ncp-report-container">
            <p className="ncp-report-title">NCP report</p>
            <div className="ncp-content-container">
              <div className="ncp-sub-container">
                <p className="ncp-heading">Population</p>
                <p className="ncp-count">{population}</p>
              </div>
              <div className="ncp-sub-container">
                <p className="ncp-heading">Tested</p>
                <p className="ncp-count" testid="ncpTotalTestedData">
                  {totalTestedData}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className={`top-district-label ${category}-title`}>
            Top Districts
          </h1>
          <div className="ul-parent-list">
            <div className="district-data-ul-list">
              <ul
                className="each-districts-container"
                testid="topDistrictsUnorderedList"
              >
                {categoryData.map(each => (
                  <ShowEachDistrictData
                    key={each.distName}
                    value={each.value}
                    name={each.distName}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="charts-data-container">
          <Charts stateCode={stateCode} activeTab={category} />
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="home-details-loader-spinner" testid="stateDetailsLoader">
      <LoaderSpinner />
    </div>
  )

  renderStateSpecificDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderStateSpecificDetails()}
        <Footer />
      </div>
    )
  }
}

export default withRouter(StateWiseCases)

// import {useState, useEffect} from 'react'
// import {useParams} from 'react-router-dom'
// import Header from '../Header'
// import Footer from '../Footer'
// import LoaderSpinner from '../LoaderSpinner'
// import StateCards from '../StateCards'
// import ShowEachDistrictData from '../ShowEachDistrictData'
// import Charts from '../Charts'
// import './index.css'

// const apiStatusConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }

// const statesList = [
//   {
//     state_code: 'AN',
//     state_name: 'Andaman and Nicobar Islands',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410530/andaman_mhysom.png',
//   },
//   {
//     state_code: 'AP',
//     state_name: 'Andhra Pradesh',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672412401/AP_w1oc4e.png',
//   },
//   {
//     state_code: 'AR',
//     state_name: 'Arunachal Pradesh',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410254/arunachal_pradesh_bw8ho9.png',
//   },
//   {
//     state_code: 'AS',
//     state_name: 'Assam',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410254/Assam_a4blbs.png',
//   },
//   {
//     state_code: 'BR',
//     state_name: 'Bihar',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410254/bihar_kybwc3.png',
//   },
//   {
//     state_code: 'CH',
//     state_name: 'Chandigarh',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410530/chandigarh_zr4fuo.png',
//   },
//   {
//     state_code: 'CT',
//     state_name: 'Chhattisgarh',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410254/chattisgarh_soz1ch.png',
//   },
//   {
//     state_code: 'DN',
//     state_name: 'Dadra and Nagar Haveli and Daman and Diu',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410530/daman_and_diu_d0pdbs.png',
//   },
//   {
//     state_code: 'DL',
//     state_name: 'Delhi',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410530/Delhi_n0z8q6.png',
//   },
//   {
//     state_code: 'GA',
//     state_name: 'Goa',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410254/goa_uygnvl.png',
//   },
//   {
//     state_code: 'GJ',
//     state_name: 'Gujarat',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/Gujrat_dxrbap.png',
//   },
//   {
//     state_code: 'HR',
//     state_name: 'Haryana',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/Haryana_c3jwlp.png',
//   },
//   {
//     state_code: 'HP',
//     state_name: 'Himachal Pradesh',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/HP_kjbckm.png',
//   },
//   {
//     state_code: 'JK',
//     state_name: 'Jammu and Kashmir',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/JK_cokxfa.png',
//   },
//   {
//     state_code: 'JH',
//     state_name: 'Jharkhand',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/jharkand_rmbukv.png',
//   },
//   {
//     state_code: 'KA',
//     state_name: 'Karnataka',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/jharkand_rmbukv.png',
//   },
//   {
//     state_code: 'KL',
//     state_name: 'Kerala',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/kerala_u6rtqe.png',
//   },
//   {
//     state_code: 'LA',
//     state_name: 'Ladakh',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410530/Ladakh_spcndt.png',
//   },
//   {
//     state_code: 'LD',
//     state_name: 'Lakshadweep',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410530/lakshadweep_bafokl.png',
//   },
//   {
//     state_code: 'MH',
//     state_name: 'Maharashtra',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/maharashtra_fcq8aw.png',
//   },
//   {
//     state_code: 'MP',
//     state_name: 'Madhya Pradesh',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/MP_fa9prz.png',
//   },
//   {
//     state_code: 'MN',
//     state_name: 'Manipur',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/manipur_lxindr.png',
//   },
//   {
//     state_code: 'ML',
//     state_name: 'Meghalaya',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/meghalaya_ygne3l.png',
//   },
//   {
//     state_code: 'MZ',
//     state_name: 'Mizoram',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/mizoram_zotja6.png',
//   },
//   {
//     state_code: 'NL',
//     state_name: 'Nagaland',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/nagaland_lip8mi.png',
//   },
//   {
//     state_code: 'OR',
//     state_name: 'Odisha',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/nagaland_lip8mi.png',
//   },
//   {
//     state_code: 'PY',
//     state_name: 'Puducherry',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410531/poducherry_xe0rp9.png',
//   },
//   {
//     state_code: 'PB',
//     state_name: 'Punjab',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/punjab_qra2ul.png',
//   },
//   {
//     state_code: 'RJ',
//     state_name: 'Rajasthan',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/rajastan_cd1owi.png',
//   },
//   {
//     state_code: 'SK',
//     state_name: 'Sikkim',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/Sikkim_ohg4ty.png',
//   },
//   {
//     state_code: 'TN',
//     state_name: 'Tamil Nadu',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/tamilnadu_lfd9fm.png',
//   },
//   {
//     state_code: 'TG',
//     state_name: 'Telangana',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410257/telangana_bv5bke.png',
//   },
//   {
//     state_code: 'TR',
//     state_name: 'Tripura',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410257/tripura_um8629.png',
//   },
//   {
//     state_code: 'UP',
//     state_name: 'Uttar Pradesh',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410257/up_nfmlxh.png',
//   },
//   {
//     state_code: 'UT',
//     state_name: 'Uttarakhand',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410257/uttrahkhand_tr0yku.png',
//   },
//   {
//     state_code: 'WB',
//     state_name: 'West Bengal',
//     imageUrl:
//       'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410257/west_bengal_c2jo9z.png',
//   },
// ]

// const StateWiseCases = () => {
//   const [stateCovidData, setStateCovidData] = useState({
//     apiStatus: apiStatusConstants.initial,
//     totalState: [],
//     totalTested: 0,
//     listStateName: '',
//     stateCode: '',
//     stateDate: '',
//     population: '',
//     localStoreData: [],
//     category: 'confirmed',
//     errorMsg: '',
//   })

//   const {stateCode} = useParams()

//   useEffect(() => {
//     setStateCovidData(prevState => ({
//       ...prevState,
//       apiStatus: apiStatusConstants.inProgress,
//     }))
//     const getStateWiseCovidData = async () => {
//       const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
//       const options = {
//         method: 'GET',
//       }
//       const response = await fetch(apiUrl, options)
//       const data = await response.json()
//       if (response.ok === true) {
//         const activeState = statesList.filter(
//           eachState => eachState.state_code === stateCode,
//         )
//         const stateName = activeState[0].state_name
//         const stateTested = data[stateCode].total.tested
//         const newDate = new Date(data[stateCode].meta.last_updated)
//         // const population = data[stateCode].meta.population
//         // Destructure meta and its properties
//         const {
//           meta: {population},
//         } = data[stateCode]
//         const totalStateData = data[stateCode].total

//         setStateCovidData(prevState => ({
//           ...prevState,
//           apiStatus: apiStatusConstants.success,
//           totalState: totalStateData,
//           totalTested: stateTested,
//           listStateName: stateName,
//           stateCode,
//           population,
//           stateDate: newDate,
//           localStoreData: data,
//         }))
//       } else {
//         setStateCovidData(prevState => ({
//           ...prevState,
//           apiStatus: apiStatusConstants.failure,
//           errorMsg: data.error_msg,
//         }))
//       }
//     }
//     getStateWiseCovidData()
//   }, [stateCode])

//   const renderLoaderView = () => (
//     <div className="home-details-loader-spinner" testid="stateDetailsLoader">
//       <LoaderSpinner />
//     </div>
//   )

//   const renderSuccessView = () => {
//     const stateData = () => {
//       const {localStoreData, category} = stateCovidData
//       const listOfDistrict = localStoreData[stateCode].districts
//       const listOfDistrictNames = Object.keys(listOfDistrict)
//       const dataElement = listOfDistrictNames.map(eachItem => ({
//         districtNameList: eachItem,
//         districtValue: listOfDistrict[eachItem]?.total[category] || 0,
//       }))

//       dataElement.sort((a, b) => b.districtValue - a.districtValue)

//       const stateActiveCases = listOfDistrictNames.map(eachItem => ({
//         districtNameList: eachItem,
//         districtValue:
//           (listOfDistrict[eachItem]?.total.confirmed || 0) -
//           (listOfDistrict[eachItem]?.total.recovered || 0) -
//           (listOfDistrict[eachItem]?.total.deceased || 0),
//       }))

//       stateActiveCases.sort((a, b) => b.districtValue - a.districtValue)

//       if (category === 'active') {
//         return stateActiveCases
//       }
//       return dataElement
//     }

//     const topDistricts = stateData()

//     const onChangeActiveCard = value => {
//       const activeCategory = value
//       setStateCovidData(prevState => ({
//         ...prevState,
//         category: activeCategory,
//       }))
//     }

//     const stateImgUrl = statesList.find(
//       eachState => eachState.state_code === stateCode,
//     ).imageUrl

//     const {
//       listStateName,
//       population,
//       totalState,
//       totalTested,
//       category,
//       stateDate,
//     } = stateCovidData

//     const months = [
//       'January',
//       'February',
//       'March',
//       'April',
//       'May',
//       'June',
//       'July',
//       'August',
//       'September',
//       'October',
//       'November',
//       'December',
//     ]

//     return (
//       <div className="state-wise-cases-container">
//         <div className="state-name-tested-container">
//           <h1 className="state-name">{listStateName}</h1>
//           <div className="state-tested-container">
//             <p className="tested-text">Tested</p>
//             <p className="total-tested">{totalTested}</p>
//           </div>
//         </div>
//         <div className="date-container">
//           <p className="date-text">{`Last updated on ${
//             months[stateDate.getMonth()]
//           } ${stateDate.getDate()} ${stateDate.getFullYear()}.`}</p>
//         </div>
//         <div className="state-cards">
//           <StateCards
//             totalStateCards={totalState}
//             category={category}
//             onChangeActiveCard={onChangeActiveCard}
//           />
//         </div>
//         <div className="map-container">
//           <img src={stateImgUrl} alt={listStateName} className="map-image" />
//           <div className="ncp-report-container">
//             <p className="ncp-report-title">NCP report</p>
//             <div className="ncp-content-container">
//               <div className="ncp-sub-container">
//                 <p className="ncp-heading">Population</p>
//                 <p className="ncp-count">{population}</p>
//               </div>
//               <div className="ncp-sub-container">
//                 <p className="ncp-heading">Tested</p>
//                 <p className="ncp-count">{totalTested}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div testid="lineChartsContainer">
//           <h1 className={`top-district-label ${category}-title`}>
//             Top Districts
//           </h1>
//           <div>
//             <div>
//               <ul
//                 testid="topDistrictsUnorderedList"
//                 className="each-districts-container"
//               >
//                 {topDistricts.map(eachItem => (
//                   <ShowEachDistrictData
//                     topDistrictData={eachItem}
//                     key={eachItem.districtNameList}
//                   />
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="charts-data-container">
//           <Charts category={category} />
//         </div>
//       </div>
//     )
//   }

//   const renderFailureView = () => {
//     const {errorMsg} = stateCovidData

//     return (
//       <div className="not-found-container">
//         <img
//           src="https://res.cloudinary.com/dkt3zutob/image/upload/v1739606551/covid19_dashboard_images/ej0epjdo3wf8rpstn07z.png"
//           alt="not-found-pic"
//           className="not-found-image"
//         />
//         <p className="not-found-description">Error: {errorMsg}</p>
//         <p className="not-found-description">
//           we are having some trouble processing your request. Please try again.
//         </p>
//       </div>
//     )
//   }

//   const renderStateDataUI = () => {
//     const {apiStatus} = stateCovidData
//     switch (apiStatus) {
//       case apiStatusConstants.success:
//         return renderSuccessView()
//       case apiStatusConstants.failure:
//         return renderFailureView()
//       case apiStatusConstants.inProgress:
//         return renderLoaderView()
//       default:
//         return null
//     }
//   }

//   return (
//     <>
//       <Header />
//       {renderStateDataUI()}
//       <Footer />
//     </>
//   )
// }

// export default StateWiseCases
