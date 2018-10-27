import React, { Component } from 'react';
import EquipmentCategory from './EquipmentCategory'
import { connect } from 'react-redux'
import handleInitialData from '../actions/shared'
import {setAuthedUser} from '../actions/authedUser'
import Transit from './Transit'
import getRecordId from './MoveEquipmentWindow'
import flow from 'lodash/flow';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class App extends Component {

  state = {
    notification: false,
    error: false,
    vertical: 'top',
    horizontal: 'center',
    message: ''
  }

  raiseError = () => {
    this.setState ({
      error: true
    })
  }

  toggleNotification = (type) => {
    switch(type){
      case 'move':
      const moveMessage =
        this.state.error ? 'There was an error. Equipment sent was placed back in the standby column. Please Try Again.':
          'Movement Logged Succesfully'
          this.setState ({
            notification: true,
            message: moveMessage
          })
          return moveMessage

      case 'update':
      const updateMessage =
        this.state.error ? 'There was an error updating. Please Try Again.' :
        'Layout Updated Succesfully'
        this.setState ({
          notification: true,
          message: updateMessage
        })
        return updateMessage

      case 'transit':
        const transitMessage = this.state.error ? "There was an error. Please refresh the page and try again later.":
        'Equipment was moved to the standby column for that category of equipment.'
        this.setState ({
          notification: true,
          message: transitMessage
        })
        return transitMessage

      case 'hours':
        const hoursMessage = this.state.error ? 'There was an error. Please refresh the page and try again later.':
        'Pump Hours Updated Succesfully'
        this.setState({
          notification: true,
          message: hoursMessage
        })
        return hoursMessage

        case 'number':
          const numberMessage = 'Pump hours must be a number.'
          this.setState({
            notification: true,
            message: numberMessage
          })
          return numberMessage

        case 'maintenance':
          const maintenanceMessage = 'Must use some parts. Must inlcude a supervisor name. Pump hours and grease pressures must be a number. If you did packing you have to enter the grease pressure.'
          this.setState({
            notification: true,
            message: maintenanceMessage
          })
          return maintenanceMessage

        case 'maintenance_success':
          const maintenanceSuccess = 'Maintenance Logged Succesfully'
          this.setState({
            notification: true,
            message: maintenanceSuccess
          })
          return maintenanceSuccess

        case 'pumpHours':
          const maintenanceHourFailure = 'You cannot log maintenance with less pump hours than current pump hours.'
          this.setState({
            notification: true,
            message: maintenanceHourFailure
          })
          return maintenanceHourFailure

        case 'plunger':
          const plungerError = 'Two types of plungers one hole?'
          this.setState({
            notification: true,
            message: plungerError
          })
          return plungerError

        case 'note':
          const noteMessage = 'You must fill out all fields'
          this.setState({
            notification: true,
            message: noteMessage
          })
          return noteMessage

        case 'noteSuccess':
          const noteSuccess = 'Note added succsefully'
          this.setState({
            notification: true,
            message: noteSuccess
          })
          return noteSuccess

        case 'noteFail':
          const noteFail = 'Note failed to upload. Please try again.'
          this.setState({
            notification: true,
            message: noteFail
          })
          return noteFail
        case 'test':
          const noteTest = 'The test note has to stay for now. All other notes can be deleted.'
          this.setState({
            notification: true,
            message: noteTest
          })
          return noteFail

      default:
      const message = 'There was a network error. Please try again later.'
        this.setState ({
          notification: true,
          message: message
        })
        return message
    }
  }


  handleNotificationClose = () => {
    this.setState({
      notification: false
    })
  }

  componentDidMount() {
  this.props.dispatch(setAuthedUser(this.props.authedUser))
  this.props.dispatch(handleInitialData(this.props.authedUser)) //TODO: need to link 'red' to logged in users crew
}

  render(){
    const {classes} = this.props
    const {vertical, horizontal, notification, message} = this.state
    return (
      <div className='container'>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={notification}
          autoHideDuration={4000}
          onClose={this.handleNotificationClose}
          ContentProps={{
            'aria-describedby': 'snackbar-fab-message-id'
          }}
          message={<span id="snackbar-fab-message-id">{message}</span>}
          action={
            <Button color="inherit" size="small" onClick={this.handleNotificationClose}>
              Exit
            </Button>
          }
        />
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <EquipmentCategory toggleNotification={this.toggleNotification} handleError={this.raiseError} type='Pumps'/>
              <hr/>
            </Grid>
            <Grid item xs={12}>
              <EquipmentCategory toggleNotification={this.toggleNotification} handleError={this.raiseError} type='Blenders'/>
              <hr/>
            </Grid>
            <Grid item xs={5}>
              <EquipmentCategory toggleNotification={this.toggleNotification} handleError={this.raiseError} type='Hydrations'/>
              <hr/>
            </Grid>
            <Grid item xs={5}>
              <EquipmentCategory toggleNotification={this.toggleNotification} handleError={this.raiseError} type='Floats'/>
              <hr/>
            </Grid>
            <Grid item xs={5}>
              <EquipmentCategory toggleNotification={this.toggleNotification} handleError={this.raiseError} type='Missiles'/>
              <hr/>
            </Grid>
            <Grid item xs={5}>
              <EquipmentCategory toggleNotification={this.toggleNotification} handleError={this.raiseError} type='Chem_Adds'/>
              <hr/>
            </Grid>
            <Grid item xs={5}>
              <EquipmentCategory toggleNotification={this.toggleNotification} handleError={this.raiseError} type='Data_Vans'/>
              <hr/>
            </Grid>
            <Grid item xs={5}>
              <EquipmentCategory toggleNotification={this.toggleNotification} handleError={this.raiseError} type='Crew_Vans'/>
              <hr/>
            </Grid>
            </Grid>
        </div>


        <Transit handleError={this.raiseError} toggleNotification={this.toggleNotification}/>
      </div>
    )
  }
}

export default flow(withStyles(styles), connect())(App)
