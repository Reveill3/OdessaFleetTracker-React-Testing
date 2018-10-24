import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import flow from 'lodash/flow';
import { ConnectDropTarget, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const addTarget = {
  drop(props, monitor, component) {
    const dragId = monitor.getItem().id
    const movement = monitor.getItem().movement
    const maintenance = monitor.getItem().maintenance
    const holehours = monitor.getItem().holehours
    const previous_hours = monitor.getItem().previous_hours
    const current_pumphours = monitor.getItem().current_pumphours
    const notes = monitor.getItem().notes

    props.addCard(dragId, movement, maintenance, holehours, previous_hours, current_pumphours, notes)
  }
}

const styles = {
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    margin: 15,
    fontSize: 14,
    textAlign: 'center'
  },
  pos: {
    marginBottom: 12,
  },
  card: {
    minHeight: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 10
  },
};

class InlineDrop extends Component {
  static propTypes = {
      standbytoggle: PropTypes.bool.isRequired
  }

  render(){
    const { connectDropTarget, standbytoggle, classes } = this.props

    return(
      connectDropTarget(
        <div>
           <Card className={classes.card}>
             <Typography className={classes.title} color="textSecondary">
               { this.props.isDragging ? standbytoggle ? 'Drop Here to Put Equipment Inline':
               'Drop Here to Put Equipment On Standby': 'Drag Equipment Here To Move'}
           </Typography>
           </Card>
         </div>
    )
    )
  }
}

export default flow(
  DropTarget((props) =>  ('card-' + props.type), addTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
  })),
  withStyles(styles))(InlineDrop)
