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

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  CARD: 'card'
};

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    marginLeft: 10,
    marginTop: 5
  },
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
    console.log(dragstandby)
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
              <div style={styles.root}>
                <Chip
                  avatar={<Avatar>{this.props.inlineindex}</Avatar>}
                  key={this.props.key}
                  label={this.props.text}
                  className={classes.chip}
                  standbytoggle={this.props.standbyToggle}
                  tostandby={this.props.toStandby}
                />
            </div>
          )

      )
    )
  }
}

export default flow(
  DragSource(
    'card',
    cardSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  ),
  DropTarget('card', cardTarget, (connect) => ({
    connectDropTarget: connect.dropTarget(),
  })),
  withStyles(styles)
)(PumpCard);
