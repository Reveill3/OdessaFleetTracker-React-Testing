import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListAlt from '@material-ui/icons/ListAlt'
import EquipmentListDialog from './EquipmentListDialog'

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class EquipmentListDrawer extends React.Component {
  state = {
    right: false,
    dialog: false,
    view: '',
  };

  lookupViewId = (crew) =>{
    switch(crew){
      case 'Yard':
        return 'shrJ9ulknTJX2YhwE'

      case 'Red Crew':
        return 'shrn2JtpTlkk2uYf1'

      case 'Gold Crew':
        return 'shrNBZQwduQyeHzIA'

      case 'Onyx Crew':
        return 'shrZ0HKZcn77tEf4u'

      case 'Blue Crew':
        return 'shrJM1ASXX3a9iv5j'

      case 'Green Crew':
        return 'shrnlJwQi8sRcCtKq'

    case 'Motley Crew':
        return 'shr4QkmcHSEinPazM'

    case 'Golf Crew':
        return 'shrl7s3qQSThgqEKq'

      default:
        return crew
    }
  }

  handleDialogClose = () => {
    this.setState({
      dialog: false
    })
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  openEquipmentList = (text) => {
    this.setState({
      dialog: true,
      right: false,
      view: this.lookupViewId(text)
    })

  }

  render() {
    const { classes } = this.props;
    const dialog = this.state.dialog

    const sideList = (
      <div className={classes.list}>
        <List>
          {['Red Crew', 'Gold Crew', 'Onyx Crew', 'Blue Crew', 'Green Crew', 'Motley Crew', 'Golf Crew', 'Yard'].map((text, index) => (
            <ListItem button onClick={() => this.openEquipmentList(text)} key={text}>
              <ListItemIcon>
                <ListAlt/>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
    <div>
        <EquipmentListDialog handleClose={this.handleDialogClose} view={this.state.view} open={this.state.dialog}/>
        <Button variant={this.props.view ==='home' ? 'contained':null} color='inherit' onClick={this.toggleDrawer('right', true)}>Print/View Equipment Lists</Button>
        <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

EquipmentListDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EquipmentListDrawer);
