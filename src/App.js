import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import Vaccination from './components/Vaccination'
import StateWiseCases from './components/StateWiseCases'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/vaccination" component={Vaccination} />
    <Route exact path="/state/:stateCode" component={StateWiseCases} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App

// import './App.css'
// import {Component} from 'react'
// import {Switch, Route, Redirect} from 'react-router-dom'

// import Home from './components/Home'
// import About from './components/About'
// import Vaccination from './components/Vaccination'
// import StateWiseCases from './components/StateWiseCases'
// import NotFound from './components/NotFound'
// import ThemeContext from './context/ThemeContext'

// class App extends Component {
//   state = {
//     isDark: true,
//   }

//   onChangeTheme = () => {
//     this.setState(prevState => ({
//       isDark: !prevState.isDark,
//     }))
//   }

//   render() {
//     const {isDark} = this.state

//     return (
//       <ThemeContext.Provider value={{isDark, changeTheme: this.onChangeTheme}}>
//         <Switch>
//           <Route exact path="/" component={Home} />
//           <Route exact path="/about" component={About} />
//           <Route exact path="/vaccination" component={Vaccination} />
//           <Route exact path="/state/:stateCode" component={StateWiseCases} />
//           <Route exact path="/not-found" component={NotFound} />
//           <Redirect to="not-found" />
//         </Switch>
//       </ThemeContext.Provider>
//     )
//   }
// }

// export default App
