import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar'
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  button: {
  margin: theme.spacing.unit,
},
leftIcon: {
  marginRight: theme.spacing.unit,
},
rightIcon: {
  marginLeft: theme.spacing.unit,
},
iconSmall: {
  fontSize: 20,
},
  root: {
  flexGrow: 1,
},
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class MaintenanceForm extends React.Component {
  state = {
    errorSubmit: false,
    loading: true,
    show: false,
    pump_hours: '',
    hole: '',
    suction_valves: '',
    suction_seats: '',
    discharge_valves: '',
    discharge_seats: '',
    suction_spring: '',
    discharge_spring: '',
    display: 'select',
    open: false,
    vertical: 'top',
    horizontal: 'center',
    packing_brass: '',
    packing_nobrass: '',
    treater: '',
    grease_pressure: '',
    crew: 'Red' //TODO: link to logged in users crew
  };

  options = [1,2,3,4,5,6,7,8,9,10]
  holes = [1,2,3,4,5]
  vs = ['suction_valves', 'suction_seats' , 'discharge_valves', 'discharge_seats', 'suction_spring', 'discharge_spring']
  packing = ['packing_brass','packing_nobrass']

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = () => {
    const error = this.state.pump_hours === '' | this.state.hole === '' | this.state.treater === ''
    const maintenance_type = this.state.display === 'vs' ? 'valves & seats': 'packing'
    if (error != true)
{    fetch('http://192.168.86.26:8000/api/v1/log_maintenance/',{ // TODO: replace url
      method:'POST',
      mode: 'cors',
      body: JSON.stringify({
        pump_hours: this.state.pump_hours,
        hole: this.state.hole,
        crew: this.state.crew.toLowerCase(),
        unitnumber: this.props.unitnumber,
        treater: this.state.treater,
        grease_pressure: this.state.grease_pressure,
        suction_valves: this.state.suction_valves,
        suction_seats: this.state.suction_seats,
        discharge_valves: this.state.discharge_valves,
        discharge_seats: this.state.discharge_seats,
        suction_spring: this.state.suction_spring,
        discharge_spring: this.state.discharge_spring,
        packing_brass: this.state.packing_brass,
        packing_nobrass: this.state.packing_nobrass,
        maintenance_type: maintenance_type,
      }),
      headers:{
        'Content-Type': 'application/json'
      }
        }
      ).then((response) => {
          this.setState({
            pump_hours: '',
            hole: '',
            open: true,
            suction_valves: '',
            suction_seats: '',
            discharge_valves: '',
            discharge_seats: '',
            suction_spring: '',
            discharge_spring: '',
            packing_brass: '',
            packing_nobrass: '',
            treater: '',
            grease_pressure: '',
            error: error,
          })
              }).catch((error) => this.setState({
              errorSubmit: true
            }))

          } else {
              this.setState({
                pump_hours: '',
                hole: '',
                open: true,
                suction_valves: '',
                suction_seats: '',
                discharge_valves: '',
                discharge_seats: '',
                suction_spring: '',
                discharge_spring: '',
                packing_brass: '',
                packing_nobrass: '',
                error: error
              })
            }
  }

  handleClickOpen = () => {
    this.setState({ show: true });
  };

  toggleView = (display)  => {
    this.setState({
      display: display
    })
  }

  handleNotificationClose = () => {
    this.setState({
      open: false
    })
  }

  handleClose = () => {
    this.setState({
      show: false,
      open: false,
      pump_hours: '',
      hole: '',
      suction_valves: '',
      suction_seats: '',
      discharge_valves: '',
      discharge_seats: '',
      display: 'select'
     });
  };

  render() {
    const { classes, treaters } = this.props;
    const { open, vertical, horizontal } = this.state;
    const main_type_buttons =
    <Grid container spacing={24}>
      <Grid item xs={6}>
        <Button variant="contained"  size='medium' color="primary" className={classes.button} onClick={() => this.toggleView('vs')}>
          Valves & Seats
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" size='medium' color="primary" className={classes.button} onClick={() => this.toggleView('packing')}>
          Packing
        </Button>
      </Grid>
    </Grid>
    const message = this.state.errorSubmit ? 'There was an error submitting. Please try again.'
    : this.state.error ? 'Please Completely Fill Out The Form'
    : 'Maintenance Logged for ' + this.props.unitnumber


    return (
      <div className={classes.root}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          onClose={this.handleNotificationClose}
          ContentProps={{
            'aria-describedby': 'snackbar-fab-message-id',
            className: classes.snackbarContent,
          }}
          message={<span id="snackbar-fab-message-id">{message}</span>}
          action={
            <Button color="inherit" size="small" onClick={this.handleNotificationClose}>
              Exit
            </Button>
          }
          className={classes.snackbar}
        />
        <Button color="primary" onClick={this.handleClickOpen}>Log Maintenance</Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.show}
          onClose={this.handleClose}
        >
          {this.state.display === 'select' ?  main_type_buttons :
          <Fragment>
            <DialogTitle>Log Maintenance for {this.props.unitnumber}</DialogTitle>
            <DialogContent>
              <form className={classes.container}>
                <Grid container spacing={24}>
                  <Grid item xs={3}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="pump_hours"
                        label="Pump Hours"
                        type="text"
                        onChange={this.handleChange('pump_hours')}
                        value={this.state.pump_hours}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="hole">Hole</InputLabel>
                      <Select
                        native
                        value={this.state.hole}
                        onChange={this.handleChange('hole')}
                        input={<Input id="hole" />}
                      >
                        <option value="" />
                        { this.holes.map(option =>
                        <option key={option} value={option}>{option}</option>
                          )
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="grease_pressure"
                        label="Grease Pressure"
                        type="text"
                        onChange={this.handleChange('grease_pressure')}
                        value={this.state.grease_pressure}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="treater">Supervisor Name</InputLabel>
                      <Select
                        native
                        value={this.state.treater}
                        onChange={this.handleChange('treater')}
                        input={<Input id="treater" />}
                      >
                        <option value="" />
                        { treaters.treaters.map(treater =>
                        <option key={treater.name} value={treater.name}>{treater.name}</option>
                          )
                        }


                      </Select>
                    </FormControl>
                  </Grid>
                    { this.state.display === 'vs' ? this.vs.map(item =>
                      <Grid item key={item} xs={3}>
                        <FormControl className={classes.formControl}>
                          <InputLabel htmlFor={item}>{item}</InputLabel>
                          <Select
                            native
                            value={this.state[item]}
                            onChange={this.handleChange(item)}
                            input={<Input id={item} />}
                          >
                            <option value="" />
                            { this.options.map(option =>
                            <option key={option} value={option}>{option}</option>
                              )
                            }
                          </Select>
                        </FormControl>
                      </Grid> ) :  this.state.display === 'packing' ? this.packing.map(item =>
                        <Grid item xs={3}>
                          <FormControl className={classes.formControl}>
                            <InputLabel htmlFor={item}>{item}</InputLabel>
                            <Select
                              native
                              value={this.state[item]}
                              onChange={this.handleChange(item)}
                              input={<Input id={item} />}
                            >
                              <option value="" />
                              { this.options.map(option =>
                              <option key={option} value={option}>{option}</option>
                                )
                              }
                            </Select>
                          </FormControl>
                        </Grid> ): null

                    }
                </Grid>
              </form>
            </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit Maintenance Log
            </Button>
          </DialogActions>
        </Fragment>
      }
        </Dialog>
      </div>

    );
}}

MaintenanceForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps (state) {
  return {
    treaters: state.treaters
  }
}

export default flow(connect(mapStateToProps),
withStyles(styles))(MaintenanceForm);
