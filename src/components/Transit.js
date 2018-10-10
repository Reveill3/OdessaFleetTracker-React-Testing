import React, { Component } from 'react';
import {ListGroup} from 'reactstrap';
import Equipment from './Equipment';
import { getRecordId, getCrewColor } from './MoveEquipmentWindow'


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
    fetch('http://192.168.86.26:8000/api/v1/transit_list', {mode: 'cors'})
      .then(response => response.json())
      .then(MyJson => {
        let pumpArray = [];
        MyJson.map((entry) =>{
          if ([entry.transferfrom, entry.transferto].some((condition) =>
                getRecordId('red').includes(condition) //TODO: Need to link 'red' to logged in users crew
                  ))
          { pumpArray.push(
            {
              unitnumber: entry.unitnumber,
              id: entry.id,
              message: entry.unitnumber + ' in transit to ' + getCrewColor(entry.transferto),
              isCancelled: false,
              transferTo: getCrewColor(entry.transferto),
              transferFrom: getCrewColor(entry.transferfrom),
              yours: 'red',
              details: entry.details
            })}})

        this.setState(
          {
            pending: false,
            pumps: pumpArray
          }
        )})
      }


  cancelTransit = () => {
    let cancelled = this.state.pumps.filter((movement) => movement.isCancelled);
    let cancelledId = cancelled.map((object) => {
      return {
        id: object.id,
        transferfrom: getRecordId(object.transferFrom),
        transferTo: getRecordId(object.transferTo),
        yours: object.yours
      }

    });
    fetch('http://192.168.86.26:8000/api/v1/transit_list/', {
      method:'POST',
      mode: 'cors',
      body: JSON.stringify(cancelledId),
      headers:{
        'Content-Type': 'application/json'
      }
        }
      ).then( () => this.populate_transit()).then(window.location.reload());

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
        <Equipment transitequipment={this.state.pumps} cancelClick={this.handleCancelClick}/>
        <button className='btn btn-dark' onClick={this.retrieveInTransit}>
          {this.state.pending ? 'Submit': 'Refresh'}
        </button>
      </ListGroup>
    );
  }
}

export default  Transit;
