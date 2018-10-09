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
    open: false,
    pump_hours: '',
    hole: '',
    suction_valves: '',
    suction_seats: '',
    discharge_valves: '',
    discharge_seats: '',
    display: 'select'
  };

  options = [1,2,3,4,5,6,7,8,9,10]
  holes = [1,2,3,4,5]
  vs = ['suction_valves', 'suction_seats' , 'discharge_valves', 'discharge_seats', 'suction_spring', 'discharge_spring']
  packing = ['Packing(W/Brass Ring)','Packing(w/o Brass Ring)']

  handleChange = name => event => {
    this.setState({ [name]: Number(event.target.value) });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  toggleView = (display)  => {
    this.setState({
      display: display
    })
  }

  handleClose = () => {
    this.setState({
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
    console.log(this.state)
    const { classes } = this.props;
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


    return (
      <div className={classes.root}>
        <Button onClick={this.handleClickOpen}>Log Maintenance</Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          {this.state.display === 'select' ?  main_type_buttons :
          <Fragment>
            <DialogTitle>Fill the form</DialogTitle>
            <DialogContent>
              <form className={classes.container}>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
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
                    { this.state.display === 'vs' ? this.vs.map(item =>
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
                        </Grid> ) : 'hello'

                    }
                </Grid>
              </form>
            </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Ok
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

export default withStyles(styles)(MaintenanceForm);
