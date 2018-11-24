import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EquipmentListDrawer from './EquipmentListDrawer'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import {Redirect} from 'react-router-dom'
import flow from 'lodash/flow';
import {connect} from 'react-redux'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Search from './Search'

const styles = theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  text: {
      maxHeight: 60,
  },
  close: {
  padding: theme.spacing.unit / 2,
},
});

class NavBar extends Component {

    state = {
        open: false,
        loggingOut: false
    }

    handleChange = name => event => {
      this.setState({ [name]: event.target.value });
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleSubmit = () => {
        if (this.state.username === undefined | this.state.username === '' | this.state.password === undefined | this.state.password === '') {
            this.setState({
                open: true
            })
        } else {
            fetch('https://odessafleettracker.herokuapp.com/login',{ // TODO: replace url
              method:'POST',
              mode: 'cors',
              body: JSON.stringify([{'username': this.state.username, 'password': this.state.password}]),
              headers:{
                'Content-Type': 'application/json'
              }
          }).then(resp => resp.json()).then((data) => {
              if (data.authenticated){
              this.props.login(data.crew)
              this.setState({
                  username: "",
                  password: ""
              })
          } else {
              this.setState({
                  open: true,
                  username: "",
                  password: ""
              })
          }
      })
    }
}

  render(){
  const { classes } = this.props
  console.log(this.state)
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
            <Grid container spacing={24} className={classes.root}>
                <Grid item xs={7}>
                     {this.props.authenticated ?  <Typography variant="h6" color="inherit" className={classes.grow}>
                        Equipment List
                      </Typography> : null}
                  </Grid>
            {!this.props.authenticated ?  (<Fragment>
                  <Grid item xs={1}>
                  <FormControl>
                      <TextField
                        id="username"
                        label='Username'
                        margin="normal"
                        value={this.state.username}
                        onChange={this.handleChange('username')}
                        input={<Input name='username' id='username'/>}
                        />
                    </FormControl>
                  </Grid>
                  <Grid item xs={1}>
                  <FormControl>
                      <TextField
                        id="password"
                        type="password"
                        label='Password'
                        value={this.state.password}
                        autoComplete="current-password"
                        margin="normal"
                        onChange={this.handleChange('password')}
                        input={<Input name='password' id='password'/>}
                        />
                    </FormControl>
                  </Grid>
                  <Grid item xs={1} className={classes.text}>
                    <Button color="inherit" onClick={() => this.handleSubmit()}>Login</Button>
                    <Grid item xs={12}>
                        <Snackbar
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'center',
                            }}
                            open={this.state.open}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                            ContentProps={{
                              'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">Username or Password Incorrect</span>}
                            action={[
                              <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleClose}
                              >
                                <CloseIcon />
                              </IconButton>,
                            ]}
                  />
              </Grid>
                </Grid>
            </Fragment>) : (
                <Fragment>
                <Search/>
                <EquipmentListDrawer/>
                <Button color="inherit" onClick={() => this.props.logout()}>Logout</Button>
                </Fragment>)
            }
              </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );}
}

function mapStateToProps (state) {
        return {
            authedUser: state.authedUser
        }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default flow(connect(
    mapStateToProps
),withStyles(styles))(NavBar);
