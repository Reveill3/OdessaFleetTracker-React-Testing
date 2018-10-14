import React from 'react';
import {
  DragSource,
  DropTarget,
  ConnectDragPreview
 } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { XYCoord } from 'dnd-core';
import flow from 'lodash/flow';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Button from '@material-ui/core/Button';
import { getEmptyImage } from 'react-dnd-html5-backend'
import MoveEquipmentWindow from './MoveEquipmentWindow'
import MaintenanceForm from './MaintenanceForm'
import DataTable from './DataTable'
import Grid from '@material-ui/core/Grid';

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
function types (props) {
  return {CARD: 'card-' + props.type }
};

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    marginRight: 30,
    marginTop: 5
  }
});

const cardSource = {
  beginDrag(props) {
    props.standbytoggle(props.standby)
    return {
      id: props.id,
      index: props.index,
      standby: props.standby,
      movement: props.movement,
      maintenance: props.maintenance,
      holehours: props.holehours
    }
  },

  endDrag(props){
    props.droptoggle()
  }
};

const cardTarget = {
drop(props, monitor, component) {
    const dragId = monitor.getItem().id
    const hoverIndex = props.index
    const dragstandby = monitor.getItem().standby
    const movement = monitor.getItem().movement
    const maintenance = monitor.getItem().maintenance
    const holehours = monitor.getItem().holehours
    props.moveCard(dragId, hoverIndex, dragstandby, maintenance, movement, holehours)
  },
}

class PumpCard extends React.Component {
  static propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  moveCard: PropTypes.func.isRequired,
  standbytoggle: PropTypes.func.isRequired,
  tostandby:PropTypes.bool.isRequired
}

  componentDidMount(){
    const img = new Image()
    img.onload = () =>
      this.props.connectDragPreview && this.props.connectDragPreview(img)
      img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAZhJREFUaN7tmEFKw0AUhj+t1pWV6gnctvUO7gRXhVIv4SHMBZQUih7FhSLeoQrdWm9Qu5KUupgUyjOFlHkvyUB+mEWgzHzf5CXzUqhTp45PorIBfOFXZUP4wgcpsAkfnICED0ogCz4YgW3wGmMBfAAx0AsNXo4EGAPNvHD7FsYeaQC3wHNeiUaO37wDe8BlgSLnQDsVUUuEzUN8DPSBKf/Lqau9M1kSWmkDMzH3g7ZAloRmhmLuiYWAlNBMSwjMrQQ2JTRzsqvAgaeAdq7E9ZfBGmY5A74p4CHWTgu4yYBPgI7FghfACNe/LLBrK0ba4EfAI7A0hF6PF+BQG/6tAPAk3XlVeIAnQ+gf3IF1j2HNy7KZAQNcH1P5xBnwp2VD7ZJPITBQnj+yFpgLAe2yWVlLFCFgKiFLqG8kYCYRi0WmuI8PCwETiR7ugJFvoiGuj9EWMJEYY3eQbRuqEk3gtYoSef8X+gWu0zux1NyZMtLFfWhMcH1MECVkmSz4u7KhfASCgpcCwcFvCgQJvxYIFh4CetvUqVPF/AFam4FIxrxyCwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0xMC0wNFQyMTo0NTozOSswMDowMANz6dAAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMTAtMDRUMjE6NDU6MzkrMDA6MDByLlFsAAAAKHRFWHRzdmc6YmFzZS11cmkAZmlsZTovLy90bXAvbWFnaWNrLWViTXhCclZPu/nMewAAAABJRU5ErkJggg=='
  }


  render() {
    const { classes } = this.props
    // Your component receives its own props as usual
    const { id,
            isDragging,
            connectDragSource,
            connectDropTarget,
          } = this.props;
    return (
      connectDragSource &&
      connectDropTarget &&
                <Grid item xs={12}>
                <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                {connectDragSource(
                      connectDropTarget(
                  <div>
                    <Chip
                      avatar={<Avatar>{this.props.inlineindex}</Avatar>}
                      key={this.props.key}
                      label={this.props.text}
                      className={classes.chip}
                      standbytoggle={this.props.standbyToggle}
                      tostandby={this.props.toStandby}
                    />
                </div>                  )
                                )
                }
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className='d-block'>
                <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Typography variant='title'>
                    Recent Maintenance
                  </Typography>


                {this.props.maintenance.slice(Math.max(this.props.maintenance.length - 3, 1)).map((message, index) =>
                  <div key={index}>
                <Typography variant='body2'>
                  {message}
                </Typography>
                </div>
              )}
                </Grid>
                <Grid item xs={12}>
                <Typography variant='title'>
                  Recent Movement
                </Typography>
                {this.props.movement.slice(Math.max(this.props.movement.length - 3, 1)).map((message, index) =>
                  <div key={index}>
                <Typography variant='body2'>
                  {message}
                </Typography>
                </div>
              )}
                </Grid>
                <Grid item xs={12}>
                <DataTable holehours={this.props.holehours}/>
                </Grid>
                <Grid item xs={12}>
                  <MoveEquipmentWindow toggleNotification={this.props.toggleNotification} handleError={this.props.handleError} unitnumber={this.props.text} type={this.props.type} className='col-6'/>
                  { this.props.type === 'Pumps' ? <MaintenanceForm holehours={this.props.holehours} unitnumber={this.props.text}/> : null}
                </Grid>
                </Grid>
              </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          )
  }
}

export default flow(
  DragSource(
    (props) =>  ('card-' + props.type),
    cardSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
      connectDragPreview: connect.dragPreview(),
    }),
  ),
  DropTarget((props) => ('card-' + props.type), cardTarget, (connect) => ({
    connectDropTarget: connect.dropTarget(),
  })),
  withStyles(styles)
)(PumpCard);
