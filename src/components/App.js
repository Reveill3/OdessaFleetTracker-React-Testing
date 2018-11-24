import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import EquipmentList from './EquipmentList'
import NavBar from './NavBar'
import { createMuiTheme } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles';
import HomePage from './HomePage'

const theme = createMuiTheme(
  {
	"palette":
	{
		"common":
		{
			"black": "#000",
			"white": "#fff"
		},
		"background":
		{
			"paper": "#fff",
			"default": "#fafafa"
		},
		"primary":
		{
			"light": "rgba(126, 211, 33, 1)",
			"main": "rgba(57, 104, 2, 1)",
			"dark": "rgba(27, 50, 1, 1)",
			"contrastText": "#fff"
		},
		"secondary":
		{
			"light": "rgba(249, 229, 27, 1)",
			"main": "rgba(128, 118, 0, 1)",
			"dark": "rgba(84, 77, 0, 1)",
			"contrastText": "#fff"
		},
		"error":
		{
			"light": "#e57373",
			"main": "#f44336",
			"dark": "#d32f2f",
			"contrastText": "#fff"
		},
		"text":
		{
			"primary": "rgba(0, 0, 0, 0.87)",
			"secondary": "rgba(0, 0, 0, 0.54)",
			"disabled": "rgba(0, 0, 0, 0.38)",
			"hint": "rgba(0, 0, 0, 0.38)"
		}
	}
}
)

class App extends React.Component {

  state = {
    view: 'list',
    loggedIn: false,
    crew: ''
  }

  login = (crew) => {
      this.setState({
          loggedIn: !this.state.loggedIn,
          crew: crew
      })
  }

  logout = () =>{
      fetch('https://odessafleettracker.herokuapp.com/logout', {
          method:'POST',
          mode: 'cors',
          body: JSON.stringify([{}]),
          headers:{
            'Content-Type': 'application/json'
          }
      }).then(
          this.setState({
              loggedIn: false
          })
      )
  }

  render(){
    const { classes } = this.props

    return(
      <div>
        <MuiThemeProvider theme={theme}>
         <NavBar login={this.login} authenticated={this.state.loggedIn} logout={this.logout}/>
          <div className={classes.mainView}>
            <Router>
              <Switch>
                <Route path='/' exact render={() => ( this.state.loggedIn ? (<Redirect to='/equipment'/>): (<HomePage/>))}/>
                <Route path='/equipment' render={() => (this.state.loggedIn ? (<EquipmentList authedUser={this.state.crew}/>):(<Redirect to='/'/>))}/>
              </Switch>
            </Router>
            </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

const styles = theme => ({
  mainView: {
    marginTop: theme.spacing.unit * 4,
  }
});


export default withStyles(styles)(App)
