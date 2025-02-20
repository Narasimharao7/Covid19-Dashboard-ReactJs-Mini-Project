import './index.css'

const StateCards = props => {
  const {eachStateTotalData, activeTab, onGetCategory} = props

  const districtConfirmed = eachStateTotalData.confirmed
  const districtRecovered = eachStateTotalData.recovered
  const districtDeceased = eachStateTotalData.deceased
  const districtActive =
    districtConfirmed - districtRecovered - districtDeceased

  const confirmedCard = {
    name: 'Confirmed',
    logo: `https://res.cloudinary.com/dkt3zutob/image/upload/v1739602601/covid19_dashboard_images/ua40iedg060g1h0oldvb.png`,
    value: districtConfirmed,
  }

  const recoveredCard = {
    name: 'Recovered',
    logo: `https://res.cloudinary.com/dkt3zutob/image/upload/v1739602679/covid19_dashboard_images/hvpcn2youmgmhlsabjx9.png`,
    value: districtRecovered,
  }

  const deceasedCard = {
    name: 'Deceased',
    logo: `https://res.cloudinary.com/dkt3zutob/image/upload/v1739602694/covid19_dashboard_images/i36ylxcria0z5uo3zx44.png`,
    value: districtDeceased,
  }

  const activeCard = {
    name: 'Active',
    logo: `https://res.cloudinary.com/dkt3zutob/image/upload/v1739602663/covid19_dashboard_images/nbgw1hv6066vs0pcwtod.png`,
    value: districtActive,
  }

  const onClickCard = value => {
    onGetCategory(value)
  }

  const confirmedCardBgColor =
    activeTab === 'confirmed' ? 'confirmed-card-bg' : ''
  const activeCardBgColor = activeTab === 'active' ? 'active-card-bg' : ''
  const recoveredCardBgColor =
    activeTab === 'recovered' ? 'recovered-card-bg' : ''
  const deceasedCardBgColor = activeTab === 'deceased' ? 'deceased-card-bg' : ''

  return (
    <ul className="state-wise-cards-cotainer">
      <li value={confirmedCard.name} onClick={() => onClickCard('confirmed')}>
        <div
          className={`confirmed card ${confirmedCardBgColor}`}
          testid="stateSpecificConfirmedCasesContainer"
        >
          <p className="stats-type confirmed-cases">Confirmed</p>
          <img
            src={confirmedCard.logo}
            alt="state specific confirmed cases pic"
          />
          <p className="cases confirmed-cases">{confirmedCard.value}</p>
        </div>
      </li>
      <li value={activeCard.name} onClick={() => onClickCard('active')}>
        <div
          className={`active card ${activeCardBgColor}`}
          testid="stateSpecificActiveCasesContainer"
        >
          <p className="stats-type active-cases">Active</p>
          <img src={activeCard.logo} alt="state specific active cases pic" />
          <p className="cases active-cases">{activeCard.value}</p>
        </div>
      </li>
      <li value={recoveredCard.name} onClick={() => onClickCard('recovered')}>
        <div
          className={`recovered card ${recoveredCardBgColor}`}
          testid="stateSpecificRecoveredCasesContainer"
        >
          <p className="stats-type recovered-cases">Recovered</p>
          <img
            src={recoveredCard.logo}
            alt="state specific recovered cases pic"
          />
          <p className="cases recovered-cases">{recoveredCard.value}</p>
        </div>
      </li>
      <li value={deceasedCard.name} onClick={() => onClickCard('deceased')}>
        <div
          className={`deceased card ${deceasedCardBgColor}`}
          testid="stateSpecificDeceasedCasesContainer"
        >
          <p className="stats-type deceased-cases">Deceased</p>
          <img
            src={deceasedCard.logo}
            alt="state specific deceased cases pic"
          />
          <p className="cases deceased-cases">{deceasedCard.value}</p>
        </div>
      </li>
    </ul>
  )
}

export default StateCards
