import './index.css'

const IndiaStatsCard = props => {
  const {covidData, statesList} = props

  let activeCases = 0
  let recoveredCases = 0
  let deceasedCases = 0
  let confirmedCases = 0

  statesList.forEach(eachState => {
    if (covidData[eachState.state_code]) {
      const {total} = covidData[eachState.state_code]
      recoveredCases += total.recovered ? total.recovered : 0
      deceasedCases += total.deceased ? total.deceased : 0
      confirmedCases += total.confirmed ? total.confirmed : 0
    }
  })

  activeCases = confirmedCases - (recoveredCases + deceasedCases)

  return (
    <div className="stats-container">
      <div className="confirmed card" testid="countryWideConfirmedCases">
        <p className="stats-type confirmed-cases">Confirmed</p>
        <img
          src="https://res.cloudinary.com/dkt3zutob/image/upload/v1739602601/covid19_dashboard_images/ua40iedg060g1h0oldvb.png"
          alt="country wide confirmed cases pic"
        />
        <p className="confirmed-cases cases">{confirmedCases}</p>
      </div>
      <div className="active card" testid="countryWideActiveCases">
        <p className="stats-type active-cases">Active</p>
        <img
          src="https://res.cloudinary.com/dkt3zutob/image/upload/v1739602663/covid19_dashboard_images/nbgw1hv6066vs0pcwtod.png"
          alt="country wide active cases pic"
        />
        <p className="active-cases cases">{activeCases}</p>
      </div>
      <div className="recovered card" testid="countryWideRecoveredCases">
        <p className="stats-type recovered-cases">Recovered</p>
        <img
          src="https://res.cloudinary.com/dkt3zutob/image/upload/v1739602679/covid19_dashboard_images/hvpcn2youmgmhlsabjx9.png"
          alt="country wide recovered cases pic"
        />
        <p className="recovered-cases cases">{recoveredCases}</p>
      </div>
      <div className="deceased card" testid="countryWideDeceasedCases">
        <p className="stats-type deceased-cases">Deceased</p>
        <img
          src="https://res.cloudinary.com/dkt3zutob/image/upload/v1739602694/covid19_dashboard_images/i36ylxcria0z5uo3zx44.png"
          alt="country wide deceased cases pic"
        />
        <p className="deceased-cases cases">{deceasedCases}</p>
      </div>
    </div>
  )
}

export default IndiaStatsCard
