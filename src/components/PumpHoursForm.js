import React, { Fragment } from 'react';
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
import { updatePumpHours } from '../actions/pumps'

const styles = theme => ({
  root: {
  maxWidth: 720,
  backgroundColor: theme.palette.background.paper,
},
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
    toUpdate: []
  };

handleSubmit = () => {
  fetch('https://odessafleettracker.herokuapp.com/api/v1/update_pump_hours/',{ // TODO: replace url
    method:'POST',
    mode: 'cors',
    body: JSON.stringify(this.state.toUpdate),
    headers:{
      'Content-Type': 'application/json'
    }
      }
    ).then(() => {
      this.state.toUpdate.forEach(pump => this.props.dispatch(updatePumpHours(pump.unitnumber, pump.pumphours)))
      this.props.toggleNotification('hours')
      this.setState({
        open:false,
        toUpdate: []
      })
    })
    .catch(error => this.props.toggleNotification(''))
}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange =  (e) => {
    if (e.target.value === ''){
      this.props.toggleNotification('number')
      this.setState({
        toUpdate: [...this.state.toUpdate.slice(0, this.state.toUpdate.findIndex(x => x.unitnumber == e.target.value),
          ...this.state.toUpdate.slice(this.state.toUpdate.findIndex(x => x.unitnumber == e.target.value) + 1)
        )]
      })
    }else{
    const newList = this.state.toUpdate.filter(equipment => equipment.unitnumber !== e.target.name)
    this.setState({
      toUpdate: [...newList, {
        unitnumber: e.target.name,
        pumphours: e.target.value
      }]
      })
    }
  }



  handleClose = () => {
    this.setState({ open: false,
                    toUpdate: []
                    });
  };

  render() {
    console.log(this.state)
    const { classes } = this.props;
    const disabled = this.state.toUpdate.length > 0 ? this.state.toUpdate.some(equipment => isNaN(equipment.pumphours)):
    true
    disabled && this.state.open ? this.props.toggleNotification('number'):null
    return (
      <div >
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
              <Typography variant="display1" color="inherit" className={classes.flex}>
                Pump Hours
              </Typography>
              <Button color="inherit" onClick={this.handleSubmit} disabled={disabled}>
                Save Pump Hours
              </Button>
            </Toolbar>
          </AppBar>
          <div className='container'>
          <List className={classes.root}>
            {this.props.pumps.map((pump) =>
              <Fragment key={pump.unitnumber}>
                <ListItem button>
                  <ListItemText primary={pump.unitnumber}/>
                  <TextField
                    id={pump.unitnumber}
                    name={pump.unitnumber}
                    className={classes.textField}
                    placeholder="Pump Hours"
                    margin="normal"
                    onChange={this.handleChange}
                  />
                </ListItem>
                <Divider />
              </Fragment>
            )}

          </List>
        </div>
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
