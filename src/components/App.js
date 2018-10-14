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

      default:
      const message = ''
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
        <EquipmentCategory toggleNotification={this.toggleNotification} handleError={this.raiseError} type='Pumps'/>
        <hr/>
        <EquipmentCategory toggleNotification={this.toggleNotification} handleError={this.raiseError} type='Blenders'/>
        <hr/>
        <div className='row'>
          <EquipmentCategory toggleNotification={this.toggleNotification} handleError={this.raiseError} type='Hydrations'/>
          <hr/>
          <EquipmentCategory toggleNotification={this.toggleNotification} handleError={this.raiseError} type='Floats'/>
          <hr/>
          <EquipmentCategory toggleNotification={this.toggleNotification} handleError={this.raiseError} type='Missiles'/>
        </div>
        <hr/>
        <Transit handleError={this.raiseError} toggleNotification={this.toggleNotification}/>
      </div>
    )
  }
}

export default connect()(App)
