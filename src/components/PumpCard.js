import React from 'react';
import {
  DragSource,
  DropTarget,
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
      standby: props.standby
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
    props.moveCard(dragId, hoverIndex, dragstandby)
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
        connectDragSource(
              connectDropTarget(
              <div style={styles.root} className='mt-2'>
                <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Chip
                    avatar={<Avatar>{this.props.inlineindex}</Avatar>}
                    key={this.props.key}
                    label={this.props.text}
                    className={classes.chip}
                    standbytoggle={this.props.standbyToggle}
                    tostandby={this.props.toStandby}
                  />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className='d-block'>
                <div>
                  <Typography variant='title'>
                    Recent Maintenance
                  </Typography>
                </div>
                <div>
                <Typography variant='body2'>
                  V&S Hole 2
                </Typography>
                </div>
                <div>
                <Typography variant='title'>
                  Recent Movement
                </Typography>
                </div>
                <div>
                <Typography variant='body2'>
                  Moved to Red Crew on Oct 11 14:00
                </Typography>
                </div>
                <div className='row'>
                  <Button className='col-6'>Send</Button>
                  <Button color="primary" className='col-6'>Log Maintenance</Button>
                </div>
              </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          )

      )
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
    }),
  ),
  DropTarget((props) =>  {console.log(props); return('card-' + props.type)}, cardTarget, (connect) => ({
    connectDropTarget: connect.dropTarget(),
  })),
  withStyles(styles)
)(PumpCard);
