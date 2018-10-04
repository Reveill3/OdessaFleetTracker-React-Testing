import React, { Component } from 'react';
import EquipmentCategory from './EquipmentCategory'
import { connect } from 'react-redux'
import handleInitialData from '../actions/shared'


class App extends Component {
  componentDidMount() {
  this.props.dispatch(handleInitialData())
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
      </div>
    )
  }
}

export default connect()(App)
