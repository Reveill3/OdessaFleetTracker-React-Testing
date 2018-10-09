import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import PumpCard from './PumpCard'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import flow from 'lodash/flow';
import InlineDrop from './InlineDrop'
import { connect } from 'react-redux'
import { transitionEquipment, transferEquipment } from '../actions/equipment'
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';




const update = require('immutability-helper');

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
    minHeight: 85,
    marginRight:40,
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
    const dragIndex = this.props.equipment.findIndex(x => x.text === dragId)
    const newItem =      this.state.standbyToggle ?  {
            unitnumber: dragId,
            standby: false
          } : {
                  unitnumber: dragId,
                  standby: true
                }
    dispatch(transferEquipment(dragId, newItem, this.props.type))
  }

  moveCard = (dragId, hoverIndex, dragstandby) => {
    const { dispatch } = this.props
    const dragIndex = this.props.equipment.findIndex(x => x.unitnumber === dragId)

    const dragCard =
                     this.props.equipment[dragIndex].standby == false && this.props.equipment[hoverIndex].standby == true ?
                     {
                       unitnumber: dragId,
                       standby: true
                     }
                     :
                    {
                      unitnumber: dragId,
                      standby: this.props.equipment[dragIndex].standby && this.props.equipment[hoverIndex].standby ? true:false
                    }
    const hoverCard = {
                      unitnumber: this.props.equipment[hoverIndex].unitnumber,
                      standby: this.props.equipment[dragIndex].standby ? true:false
                        }

    dispatch(transitionEquipment(dragCard, hoverCard, hoverIndex, this.props.type))
  }

  state = {
displayAdd: true,
standbyToggle: false,
isDragging: false
}


  render() {
    const { classes } = this.props
    return ( this.props.type === 'Blenders' | this.props.type === 'Pumps' ?
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <h1>{this.props.type}</h1>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
        <div className='row'>
          <div className='col-5'>
            <h3>Inline</h3>
            <Paper className={classes.root}>
            { this.props.loading ? <CircularProgress /> :
              this.props.equipment.filter(card => !card.standby).map((card, index) => (
              <PumpCard
                id={card.unitnumber}
                key={card.unitnumber}
                index={this.props.equipment.findIndex(x => x.unitnumber === card.unitnumber)}
                text={card.unitnumber}
                moveCard = {this.moveCard}
                standby = {card.standby}
                standbytoggle={this.standbyToggle}
                tostandby={this.state.standbyToggle}
                inlineindex={index + 1}
                droptoggle={this.dropToggle}
                type={this.props.type}
              />
            )
          )
        }
        </Paper>
          </div>
          <div className='col-5'>
            <h3>Standby</h3>
            <Paper className={classes.root}>
            { this.props.loading ? <CircularProgress /> :
              this.props.equipment.filter(card => card.standby).map((card, index) => (
              <PumpCard
                id={card.unitnumber}
                key={card.unitnumber}
                index={this.props.equipment.findIndex(x => x.unitnumber === card.unitnumber)}
                text={card.unitnumber}
                moveCard = {this.moveCard}
                standby = {card.standby}
                standbytoggle={this.standbyToggle}
                tostandby={this.state.standbyToggle}
                inlineindex={index + 1}
                droptoggle={this.dropToggle}
                type={this.props.type}
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
            standbytoggle={this.state.standbyToggle}
            type={this.props.type}/>
          </div>
        </div>
        </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>:
              <div className='col-3'>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <h1>{this.props.type}</h1>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Paper className={classes.root}>
                    { this.props.loading ? <CircularProgress /> :
                      this.props.equipment.filter(card => !card.standby).map((card, index) => (
                      <PumpCard
                        id={card.unitnumber}
                        key={card.unitnumber}
                        index={this.props.equipment.findIndex(x => x.unitnumber === card.unitnumber)}
                        text={card.unitnumber}
                        moveCard = {this.moveCard}
                        standby = {card.standby}
                        standbytoggle={this.standbyToggle}
                        tostandby={this.state.standbyToggle}
                        inlineindex={index + 1}
                        droptoggle={this.dropToggle}
                        type={this.props.type}
                      />
                    )
                  )
                }
                </Paper>
              </ExpansionPanelDetails>
            </ExpansionPanel>
              </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    equipment: state[ownProps.type.toLowerCase()],
    loading: state.loading
  }
}

export default flow(
  connect(mapStateToProps),
  DragDropContext(HTML5Backend),
  withStyles(styles)
)(EquipmentCategory)
