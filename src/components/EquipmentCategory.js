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
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import PumpHoursForm from './PumpHoursForm'




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
  loadroot: {
  flexGrow: 1,
},
colorPrimary: {
  backgroundColor: '#B2DFDB',
},
barColorPrimary: {
  backgroundColor: '#00695C',
},
});



class EquipmentCategory extends Component {

  dropToggle = () => {
    this.setState({
      ...this.state,
      isDragging: !this.state.isDragging
    })
  }

  toggleLoading = () => {
    this.setState({
      updateLoading: !this.state.updateLoading
    })
  }

  updateLayout = (inline, standby) => {
    this.toggleLoading()
    fetch('http://192.168.1.173:8000/api/v1/update_layout/',{ // TODO: replace url
      method:'POST',
      mode: 'cors',
      body: JSON.stringify({
        inline: inline,
        standby: standby,
      }),
      headers:{
        'Content-Type': 'application/json'
      }
        }
      ).then(() => {
        this.toggleLoading()
        this.props.toggleNotification('update')
      })
      .catch(() => this.props.raiseError())
  }

  standbyToggle = (standby) => {
    this.setState({
      ...this.state,
      standbyToggle: standby ? true:false,
      isDragging: true
    })
  }

  addCard = (dragId, movement, maintenance) => {
    const { dispatch } = this.props
    const dragIndex = this.props.equipment.findIndex(x => x.text === dragId)
    const newItem =      this.state.standbyToggle ?  {
            unitnumber: dragId,
            standby: false,
            maintenance: maintenance,
            movement: movement
          } : {
                  unitnumber: dragId,
                  standby: true,
                  maintenance: maintenance,
                  movement: movement
                }
    dispatch(transferEquipment(dragId, newItem, this.props.type))
  }

  moveCard = (dragId, hoverIndex, dragstandby, maintenance, movement) => {
    const { dispatch } = this.props
    const dragIndex = this.props.equipment.findIndex(x => x.unitnumber === dragId)

    const dragCard =
                     this.props.equipment[dragIndex].standby == false && this.props.equipment[hoverIndex].standby == true ?
                     {
                       unitnumber: dragId,
                       standby: true,
                       maintenance: maintenance,
                       movement: movement
                     }
                     :
                    {
                      unitnumber: dragId,
                      standby: this.props.equipment[dragIndex].standby && this.props.equipment[hoverIndex].standby ? true:false,
                      maintenance: maintenance,
                      movement: movement
                    }
    const hoverCard = {
                      unitnumber: this.props.equipment[hoverIndex].unitnumber,
                      standby: this.props.equipment[dragIndex].standby ? true:false,
                      maintenance: this.props.equipment[hoverIndex].maintenance.slice(Math.max(this.props.equipment[hoverIndex].maintenance.length - 3, 1)),
                      movement: this.props.equipment[hoverIndex].movement.slice(Math.max(this.props.equipment[hoverIndex].movement.length - 3, 1))
                        }

    dispatch(transitionEquipment(dragCard, hoverCard, hoverIndex, this.props.type))
  }

  state = {
displayAdd: true,
standbyToggle: false,
isDragging: false,
updateLoading: false
}


  render() {
    const { classes } = this.props
    const inline =   this.props.equipment.filter(card => !card.standby)
    const standby = this.props.equipment.filter(card => card.standby)
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
              inline.map((card, index) => (
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
                handleError={this.props.handleError}
                toggleNotification={this.props.toggleNotification}
                maintenance={card.maintenance}
                movement={card.movement}
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
              standby.map((card, index) => (
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
                handleError={this.props.handleError}
                toggleNotification={this.props.toggleNotification}
                maintenance={card.maintenance}
                movement={card.movement}
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
        {this.state.updateLoading ? <div className={classes.loadroot}>
          <LinearProgress
                classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }}
            />
        </div> :
        <div>
          <Button variant="contained" color="primary" onClick ={() => this.updateLayout(inline, standby)}>
            Update Equipment Layout
          </Button>
          {this.props.type === 'Pumps' ?
          <PumpHoursForm/>:null
        }

        </div>
        }
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
                      inline.map((card, index) => (
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
                        handleError={this.props.handleError}
                        toggleNotification={this.props.toggleNotification}
                        maintenance={card.maintenance}
                        movement={card.movement}
                      />
                    )
                  )
                }
                </Paper>
              </ExpansionPanelDetails>
              {this.state.updateLoading ? <div className={classes.loadroot}>
                <LinearProgress
                      classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }}
                  />
              </div> :
              <Button variant="contained" color="primary" onClick ={() => this.updateLayout(inline, standby)}>
                Update Equipment Layout
              </Button>}
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
