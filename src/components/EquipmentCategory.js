import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import PumpCard from './PumpCard'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import flow from 'lodash/flow';
import InlineDrop from './InlineDrop'
import { connect } from 'react-redux'
import { transitionPump, transferPump } from '../actions/pumps'
import CircularProgress from '@material-ui/core/CircularProgress';




const update = require('immutability-helper');

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
    minHeight: 85
  },
});



class EquipmentCategory extends Component {

  dropToggle = () => {
    this.setState({
      ...this.state,
      isDragging: !this.state.isDragging
    })
  }

  standbyToggle = (standby) => {
    this.setState({
      ...this.state,
      standbyToggle: standby ? true:false,
      isDragging: true
    })
  }

  addCard = (dragId) => {
    const { dispatch } = this.props
    const dragIndex = this.props.pumps.findIndex(x => x.text === dragId)
    const newItem =      this.state.standbyToggle ?  {
            unitnumber: dragId,
            standby: false
          } : {
                  unitnumber: dragId,
                  standby: true
                }
    dispatch(transferPump(dragId, newItem))
  }

  moveCard = (dragId, hoverIndex, dragstandby) => {
    const { dispatch } = this.props
    const dragIndex = this.props.pumps.findIndex(x => x.unitnumber === dragId)

    const dragCard =
                     this.props.pumps[dragIndex].standby == false && this.props.pumps[hoverIndex].standby == true ?
                     {
                       unitnumber: dragId,
                       standby: true
                     }
                     :
                    {
                      unitnumber: dragId,
                      standby: this.props.pumps[dragIndex].standby && this.props.pumps[hoverIndex].standby ? true:false
                    }
    const hoverCard = {
                      unitnumber: this.props.pumps[hoverIndex].unitnumber,
                      standby: this.props.pumps[dragIndex].standby ? true:false
                        }

    dispatch(transitionPump(dragCard, hoverCard, hoverIndex))
  }

  state = {
displayAdd: true,
standbyToggle: false,
isDragging: false
}


  render() {
    const { classes } = this.props
    return ( this.props.type === 'blender' | this.props.type === 'pump' ?
      <div className='row'>
        <div className='col-5'>
          <h1>Inline</h1>
          <Paper className={classes.root}>
          { this.props.loading ? <CircularProgress /> :
            this.props.pumps.filter(card => !card.standby).map((card, index) => (
            <PumpCard
              id={card.unitnumber}
              key={card.unitnumber}
              index={index}
              text={card.unitnumber}
              moveCard = {this.moveCard}
              standby = {card.standby}
              standbytoggle={this.standbyToggle}
              tostandby={this.state.standbyToggle}
              inlineindex={index + 1}
              droptoggle={this.dropToggle}
            />
          )
        )
      }
      </Paper>
        </div>
        <div className='col-5'>
          <h1>Standby</h1>
          <Paper className={classes.root}>
          { this.props.loading ? <CircularProgress /> :
            this.props.pumps.filter(card => card.standby).map((card, index) => (
            <PumpCard
              id={card.unitnumber}
              key={card.unitnumber}
              index={this.props.pumps.findIndex(x => x.unitnumber === card.unitnumber)}
              text={card.unitnumber}
              moveCard = {this.moveCard}
              standby = {card.standby}
              standbytoggle={this.standbyToggle}
              tostandby={this.state.standbyToggle}
              inlineindex={index + 1}
              droptoggle={this.dropToggle}
            />
          )
        )
      }
      </Paper>
        </div>
        <div className='col-2'>
          <InlineDrop
          isDragging={this.state.isDragging}
          addCard={this.addCard}
          standbytoggle={this.state.standbyToggle}/>
        </div>
      </div> :         <div className='col-5'>
                <h1>{this.props.type.toUpperCase() + "'S"}</h1>
                <Paper className={classes.root}>
                { this.props.loading ? <CircularProgress /> :
                  this.props.pumps.filter(card => !card.standby).map((card, index) => (
                  <PumpCard
                    id={card.unitnumber}
                    key={card.unitnumber}
                    index={index}
                    text={card.unitnumber}
                    moveCard = {this.moveCard}
                    standby = {card.standby}
                    standbytoggle={this.standbyToggle}
                    tostandby={this.state.standbyToggle}
                    inlineindex={index + 1}
                    droptoggle={this.dropToggle}
                  />
                )
              )
            }
            </Paper>
              </div>
    );
  }
}

function mapStateToProps ({pumps, loading}) {
  return {
    pumps: pumps,
    loading: loading
  }
}

export default flow(
  connect(mapStateToProps),
  DragDropContext(HTML5Backend),
  withStyles(styles)
)(EquipmentCategory)
