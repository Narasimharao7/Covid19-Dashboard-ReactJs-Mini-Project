import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import LoaderSpinner from '../LoaderSpinner'
import FaqsList from '../FaqsList'
import FactsList from '../FactsList'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class About extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    faqsList: [],
    factsList: [],
  }

  componentDidMount() {
    this.getFaqsData()
  }

  getFaqsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      this.setState({
        faqsList: data.faq,
        factsList: data.factoids,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="about-loader-container" testid="aboutRouteLoader">
      <LoaderSpinner />
    </div>
  )

  renderSuccessView = () => {
    const {faqsList, factsList} = this.state
    return (
      <div>
        <p className="about-heading">About</p>
        <p className="about-date">Last updated March 21, 2022</p>
        <p className="about-description">
          COVID-19 vaccines be ready for distribution
        </p>
        <ul className="list-items-container" testid="faqsUnorderedList">
          {faqsList.map(eachFaq => (
            <FaqsList key={eachFaq.qno} faqDetails={eachFaq} />
          ))}
        </ul>
        <h1 className="facts-heading">Facts</h1>
        <ul className="about-facts-items-container" testid="factsUnorderedList">
          {factsList.map(eachFact => (
            <FactsList factDetails={eachFact} key={eachFact.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderAboutUi = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <main className="about-container">{this.renderAboutUi()}</main>
        <Footer />
      </>
    )
  }
}

export default About

// import {useState, useEffect} from 'react'
// import Header from '../Header'
// import Footer from '../Footer'
// import LoaderSpinner from '../LoaderSpinner'
// import FaqsList from '../FaqsList'
// import FactsList from '../FactsList'
// import './index.css'

// const apiStatusConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }

// const About = () => {
//   const [aboutData, setAboutData] = useState({
//     apiStatus: apiStatusConstants.initial,
//     faqsList: [],
//     factsList: [],
//   })

//   useEffect(() => {
//     const getFaqsData = async () => {
//       setAboutData(prevState => ({
//         ...prevState,
//         apiStatus: apiStatusConstants.inProgress,
//       }))

//       const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
//       const options = {
//         method: 'GET',
//       }
//       const response = await fetch(apiUrl, options)

//       if (response.ok === true) {
//         const data = await response.json()
//         setAboutData(prevState => ({
//           ...prevState,
//           faqsList: data.faq,
//           factsList: data.factoids,
//           apiStatus: apiStatusConstants.success,
//         }))
//       } else {
//         setAboutData(prevState => ({
//           ...prevState,
//           apiStatus: apiStatusConstants.failure,
//         }))
//       }
//     }
//     getFaqsData()
//   }, [])

//   const renderLoaderView = () => (
//     <div className="about-loader-container" testid="aboutRouteLoader">
//       <LoaderSpinner />
//     </div>
//   )

//   const renderSuccessView = () => {
//     const {faqsList, factsList} = aboutData
//     return (
//       <div>
//         <p className="about-heading">About</p>
//         <p className="about-date">Last updated March 21, 2022</p>
//         <p className="about-description">
//           COVID-19 vaccines be ready for distribution
//         </p>
//         <ul className="list-items-container" testid="faqsUnorderedList">
//           {faqsList.map(eachFaq => (
//             <FaqsList key={eachFaq.qno} faqDetails={eachFaq} />
//           ))}
//         </ul>
//         <h1 className="facts-heading">Facts</h1>
//         <ul className="about-facts-items-container" testid="factsUnorderedList">
//           {factsList.map(eachFact => (
//             <FactsList factDetails={eachFact} key={eachFact.id} />
//           ))}
//         </ul>
//       </div>
//     )
//   }

//   const renderAboutUi = () => {
//     const {apiStatus} = aboutData
//     switch (apiStatus) {
//       case apiStatusConstants.success:
//         return renderSuccessView()
//       case apiStatusConstants.inProgress:
//         return renderLoaderView()
//       default:
//         return null
//     }
//   }

//   return (
//     <>
//       <Header />
//       <main className="about-container">{renderAboutUi()}</main>
//       <Footer />
//     </>
//   )
// }

// export default About
