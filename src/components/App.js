import React, { Component } from 'react';
import EquipmentCategory from './EquipmentCategory'
import { connect } from 'react-redux'
import handleInitialData from '../actions/shared'
import Transit from './Transit'
import getRecordId from './MoveEquipmentWindow'


class App extends Component {
  componentDidMount() {
  this.props.dispatch(handleInitialData('red')) //TODO: need to link 'red' to logged in users crew
}

  render(){
    return (
      <div className='container'>
        <EquipmentCategory type='Pumps'/>
        <hr/>
        <EquipmentCategory type='Blenders'/>
        <hr/>
        <div className='row'>
          <EquipmentCategory type='Hydrations'/>
          <hr/>
          <EquipmentCategory type='Floats'/>
          <hr/>
          <EquipmentCategory type='Missiles'/>
        </div>
        <hr/>
        <Transit/>
      </div>
    )
  }
}

export default connect()(App)
