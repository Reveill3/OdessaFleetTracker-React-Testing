import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux'
import flow from 'lodash/flow';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  textField: {
  marginLeft: theme.spacing.unit,
  marginRight: theme.spacing.unit,
  width: 200,
}
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class PumpHoursForm extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="contained" color='primary' onClick={this.handleClickOpen}>Update Pump Hours</Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Pump Hours
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                Save Pump Hours
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemText primary="53Q-12222"/>
              <TextField
                id="standard-bare"
                className={classes.textField}
                defaultValue="Pump Hours"
                margin="normal"
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Default notification ringtone" secondary="Tethys" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    pumps: state.pumps
  }
}

PumpHoursForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default flow(connect(mapStateToProps),withStyles(styles))(PumpHoursForm);
