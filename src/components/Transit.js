import React, { Component , Fragment} from 'react';
import {ListGroup} from 'reactstrap';
import Equipment from './Equipment';
import { getRecordId, getCrewColor } from './MoveEquipmentWindow'
import { connect } from 'react-redux';
import {addEquipment} from '../actions/equipment'
import CircularProgress from '@material-ui/core/CircularProgress';
import {toggleLoading} from '../actions/generic'


class Transit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: false,
      pumps: []
    };
  }

  handleCancelClick = (index) => {
    this.setState((prevState) =>
      prevState.pumps[index].isCancelled = !prevState.pumps[index].isCancelled
    );

    this.setState((prevState) => {
        prevState.pumps.every((equipment) => equipment.isCancelled === false)
          ? prevState.pending = false: prevState.pending = true
      }
    )};


  populate_transit = () => {
    this.props.dispatch(toggleLoading())
    fetch('https://odessafleettracker.herokuapp.com/api/v1/transit_list', {mode: 'cors'})
      .then(response => response.json())
      .then(MyJson => {
        this.props.dispatch(toggleLoading())
        let pumpArray = [];
        MyJson.map((entry) =>{
          console.log(entry)
          if ([entry.transferfrom, entry.transferto].some((condition) =>
                getRecordId(this.props.authedUser).includes(condition) //TODO: Need to link 'red' to logged in users crew
                  ))
          { pumpArray.push(
            {
              unitnumber: entry.unitnumber,
              id: entry.id,
              message: entry.unitnumber + ' in transit to ' + getCrewColor(entry.transferto),
              isCancelled: false,
              transferTo: getCrewColor(entry.transferto),
              transferFrom: getCrewColor(entry.transferfrom),
              yours: this.props.authedUser === getCrewColor(entry.transferfrom), //TODO: connected to authedUser
              details: entry.details,
              type: entry.type,
              unit: entry.unit
            })}})

        this.setState(
          {
            pending: false,
            pumps: pumpArray
          }
        )})
      }


  cancelTransit = () => {
    const cancelled = this.state.pumps.filter((movement) => movement.isCancelled);
    cancelled.forEach(cancelledEquipment =>
      this.props.dispatch(addEquipment(cancelledEquipment.unit, cancelledEquipment.type)
        )
      )


    let cancelledId = cancelled.map((object) => {
      return {
        id: object.id,
        transferfrom: getRecordId(object.transferFrom),
        transferTo: getRecordId(object.transferTo),
        yours: object.yours,
        type: object.type
      }

    });
    this.props.dispatch(toggleLoading())
    fetch('http://192.168.86.26:8000/api/v1/transit_list/', {
      method:'POST',
      mode: 'cors',
      body: JSON.stringify(cancelledId),
      headers:{
        'Content-Type': 'application/json'
      }
        }
      ).then( () => {
        this.props.dispatch(toggleLoading())
        this.props.toggleNotification('transit')
      this.populate_transit()}).catch(error =>
        this.handleError()
      );

  };

  retrieveInTransit = () => {
    if (this.state.pending) {
    this.cancelTransit() } else {
      this.populate_transit()
    }
  };


  render() {
    return (
      <ListGroup>
        <h1 className='border-bottom'>In Transit</h1>
        {this.props.loading ? <CircularProgress/>:
        <Fragment>
        <Equipment transitequipment={this.state.pumps} cancelClick={this.handleCancelClick}/>
          <button className='btn btn-dark' onClick={this.retrieveInTransit}>
            {this.state.pending ? 'Submit': 'Refresh'}
          </button>
        </Fragment>
        }
      </ListGroup>
    );
  }
}

function mapStateToProps(state){
  return {
    authedUser: state.authedUser,
    loading: state.loading
  }
}



export default connect(mapStateToProps)(Transit);
