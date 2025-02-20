import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {showMobileMenu: false}

  onClickHamburgerBtn = () => {
    this.setState(prevState => ({showMobileMenu: !prevState.showMobileMenu}))
  }

  onClickCloseIcon = () => {
    this.setState({showMobileMenu: false})
  }

  render() {
    const {showMobileMenu} = this.state
    const {location} = this.props
    const {pathname} = location
    const homeClassName = pathname === '/' ? 'highlight-nav-link' : ''
    const aboutClassName = pathname === '/about' ? 'highlight-nav-link' : ''
    const vaccinationClassName =
      pathname === '/vaccination' ? 'highlight-nav-link' : ''
    return (
      <>
        <nav className="navbar-container">
          <Link to="/" className="link">
            <p className="logo-name">
              COVID19
              <span className="highlight-logo">INDIA</span>
            </p>
          </Link>
          <ul className="desktop-nav-links-container">
            <Link to="/" className="link">
              <li className={`nav-link-item desktop-nav-link ${homeClassName}`}>
                Home
              </li>
            </Link>
            <Link to="/vaccination" className="link">
              <li
                className={`nav-link-item desktop-nav-link ${vaccinationClassName}`}
              >
                Vaccination
              </li>
            </Link>
            <Link to="/about" className="link">
              <li
                className={`nav-link-item desktop-nav-link ${aboutClassName}`}
              >
                About
              </li>
            </Link>
          </ul>

          <button
            type="button"
            onClick={this.onClickHamburgerBtn}
            className="mobile-nav-button"
          >
            <img
              src="https://res.cloudinary.com/dkxj0xjra/image/upload/v1672040731/Covid%20Dashboard/nav-icon_n1fkqy.png"
              alt="mobile menu"
              className="mobile-menu-image"
            />
          </button>
        </nav>
        {showMobileMenu && (
          <ul className="mobile-menu-list">
            <Link to="/" className="link">
              <li className={`nav-link-item mobile-nav-link ${homeClassName}`}>
                Home
              </li>
            </Link>
            <Link to="/vaccination" className="link">
              <li
                className={`nav-link-item mobile-nav-link ${vaccinationClassName}`}
              >
                Vaccination
              </li>
            </Link>
            <Link to="/about" className="link">
              <li className={`nav-link-item mobile-nav-link ${aboutClassName}`}>
                About
              </li>
            </Link>
            <li className="mobile-close-btn-container">
              <button
                type="button"
                onClick={this.onClickCloseIcon}
                className="close-icon-container"
              >
                <img
                  src="https://res.cloudinary.com/dkxj0xjra/image/upload/v1672044667/Covid%20Dashboard/close_afraqj.png"
                  className="mobile-close-icon"
                  alt="close icon"
                />
              </button>
            </li>
          </ul>
        )}
      </>
    )
  }
}

export default withRouter(Header)

//  <button onClick={toggleTheme} className="theme-toggle">
//             {isDark ? '🌞 Light' : '🌙 Dark'}
//           </button>

// import {useState} from 'react'
// import {Link, withRouter} from 'react-router-dom'
// import {ImMenu3} from 'react-icons/im'
// import {AiOutlineCloseCircle} from 'react-icons/ai'
// import './index.css'

// const Header = () => {
//   const [stateData, setStateData] = useState({
//     showMenu: false,
//     activeMenu: 'home',
//   })

//   const onToggleMobileMenu = () => {
//     setStateData(prevState => ({
//       ...prevState,
//       showMenu: !prevState.showMenu,
//     }))
//   }

//   const toggleMenu = value => {
//     setStateData(prevState => ({
//       ...prevState,
//       activeMenu: value,
//     }))
//   }

//   const {activeMenu, showMenu} = stateData

//   const activeMenuHomeColor = activeMenu === 'home' ? 'active-menu' : ''
//   const activeMenuVaccinationColor =
//     activeMenu === 'vaccination' ? 'active-menu' : ''
//   const activeMenuAboutColor = activeMenu === 'about' ? 'active-menu' : ''

//   return (
//     <header>
//       <ul className="nav-container">
//         <li>
//           <Link to="/" className="nav-link">
//             <h1 className="header-heading">
//               COVID19<span className="india-text">INDIA</span>
//             </h1>
//           </Link>
//         </li>
//         <div className="nav-menu">
//           <li>
//             <Link to="/" className="nav-link">
//               <button
//                 type="button"
//                 value="home"
//                 onClick={() => toggleMenu('home')}
//                 className={`nav-menu-item ${activeMenuHomeColor}`}
//               >
//                 Home
//               </button>
//             </Link>
//           </li>
//           <li>
//             <Link to="/vaccination" className="nav-link">
//               <button
//                 type="button"
//                 value="vaccination"
//                 onClick={() => toggleMenu('vaccination')}
//                 className={`nav-menu-item ${activeMenuVaccinationColor}`}
//               >
//                 Vaccination
//               </button>
//             </Link>
//           </li>
//           <li>
//             <Link to="/about" className="nav-link">
//               <button
//                 type="button"
//                 value="about"
//                 onClick={() => toggleMenu('about')}
//                 className={`nav-menu-item ${activeMenuAboutColor}`}
//               >
//                 About
//               </button>
//             </Link>
//           </li>
//         </div>
//         <button
//           type="button"
//           className="mobile-menu-icon-button"
//           onClick={onToggleMobileMenu}
//           aria-label="Toggle Mobile Menu"
//         >
//           <ImMenu3 className="menu-icon" />
//         </button>
//       </ul>
//       {showMenu ? (
//         <div className="mobile-nav-items-container">
//           <ul className="menu-items-container">
//             <li>
//               <Link to="/" className="nav-link">
//                 <button
//                   type="button"
//                   value="home"
//                   onClick={() => toggleMenu('home')}
//                   className={`nav-menu-item ${activeMenuHomeColor}`}
//                 >
//                   Home
//                 </button>
//               </Link>
//             </li>
//             <li>
//               <Link to="/vaccination" className="nav-link">
//                 <button
//                   type="button"
//                   value="vaccination"
//                   onClick={() => toggleMenu('vaccination')}
//                   className={`nav-menu-item ${activeMenuVaccinationColor}`}
//                 >
//                   Vaccination
//                 </button>
//               </Link>
//             </li>
//             <li>
//               <Link to="/about" className="nav-link">
//                 <button
//                   type="button"
//                   value="about"
//                   onClick={() => toggleMenu('about')}
//                   className={`nav-menu-item ${activeMenuAboutColor}`}
//                 >
//                   About
//                 </button>
//               </Link>
//             </li>
//           </ul>
//           <div>
//             <button
//               type="button"
//               className="close-icon-button"
//               onClick={onToggleMobileMenu}
//               aria-label="Close Mobile Menu"
//             >
//               <AiOutlineCloseCircle className="menu-icon" />
//             </button>
//           </div>
//         </div>
//       ) : null}
//     </header>
//   )
// }

// export default withRouter(Header)
