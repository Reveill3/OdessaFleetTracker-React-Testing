import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux'
import flow from 'lodash/flow';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import {removeEquipment, addEquipment} from '../actions/equipment'
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    size: 10
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

export function getRecordId (crew) {
    switch(crew){
      case 'pending':
       return 'recNZ0IqxyzFcevwg'
      case 'gold':
        return 'recdf5ccGBdkP9nHg'
      case 'blue':
       return 'recFJQK7ETq0AmPQl'
      case 'green':
        return 'rech8qQeCQo3g6XsJ'
      case 'onyx':
        return 'recthKqHDjMGUla4A'
      case 'red':
        return 'recpKW7GFncVrHprG'
      case 'yard':
        return 'recKV3XMYokFrKrGZ'
      default:
        return null

    }
}

export function getCrewColor (recid) {
    switch(recid){
      case 'recNZ0IqxyzFcevwg':
       return 'pending'
      case 'recdf5ccGBdkP9nHg':
        return 'gold'
      case 'recFJQK7ETq0AmPQl':
       return 'blue'
      case 'rech8qQeCQo3g6XsJ':
        return 'green'
      case 'recthKqHDjMGUla4A':
        return 'onyx'
      case 'recpKW7GFncVrHprG':
        return 'red'
      case 'recKV3XMYokFrKrGZ':
        return 'yard'
      default:
        return null

    }
}

class MoveEquipmentWindow extends React.Component {
  state = {
    open: false,
    treater: '',
    transferTo:'',
    reason: '',
    loading: false,
    success: false,
    driver: '',
  };

  crews = ['Onyx', 'Blue', 'Red', 'Green', 'Gold', 'Yard']

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      treater: '',
      transferTo:'',
      reason: '',
      loading: false,
      success: false,
      driver:''
     });
  };

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    })
  }


  handleSend = () => {
    if (this.state.treater === '' | this.state.transferTo === '' | this.state.reason === '') {
    this.setState({
      error: true,
      treater: '',
      transferTo: '',
      reason: '',
      driver:''
    }) } else {
    this.props.dispatch(removeEquipment(this.props.unitnumber, this.props.type))
    fetch('https://odessafleettracker.herokuapp.com/api/v1/move_equipment/',{ // TODO: replace url
      method:'POST',
      mode: 'cors',
      body: JSON.stringify({
        equipment: this.props.unitnumber,
        treater: this.state.treater,
        transferTo: this.state.transferTo.toLowerCase(),
        reason: this.state.reason,
        crewFrom: this.props.authedUser, //TODO: link to logged in users crew
        driver: this.state.driver
      }),
      headers:{
        'Content-Type': 'application/json'
      }
        }
      ).then((response) => {
        this.props.toggleNotification('move')
      }
            ).catch((error) => {
              this.props.handleError()
              this.props.dispatch(addEquipment(this.props.unitnumber, this.props.type))
            })
          }
  }

  render() {
    const { classes, treaters } = this.props;
    return (
      <div>
        <Button  onClick={this.handleClickOpen}>Move {this.props.unitnumber}</Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.root}>
          <Grid container spacing={24}>
          <Grid item xs={12}>
            <DialogTitle>Send Equipment</DialogTitle>
          </Grid>
          { this.state.success ? null :
            <div>
              <DialogContent>
                <form className={classes.container}>
                  <Grid item xs={4}>
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
                  <Grid item xs={4}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="sendto">Send To</InputLabel>
                      <Select
                        native
                        value={this.state.transferTo}
                        onChange={this.handleChange('transferTo')}
                        input={<Input id="sendto" />}
                      >
                        <option value="" />
                        { this.crews.map(crew =>
                        <option key={crew} value={crew}>{crew}</option>
                          )
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="standard-full-width"
                        label="Whos Driving?"
                        style={{ margin: 8 }}
                        placeholder="Enter Name Here"
                        fullWidth
                        margin="normal"
                        value={this.state.driver}
                        onChange={this.handleChange('driver')}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="standard-full-width"
                      label="Why are you sending it?"
                      style={{ margin: 8 }}
                      placeholder="Enter Description Here"
                      fullWidth
                      margin="normal"
                      value={this.state.reason}
                      onChange={this.handleChange('reason')}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary" disabled={this.state.loading}>
                  {this.state.loading ? <CircularProgress/> : 'Cancel'}
                </Button>
                <Button onClick={this.handleSend} color="primary" disabled={this.state.loading}>
                  {this.state.loading ? <CircularProgress/> : 'Send'}
                </Button>
              </DialogActions>

            </div>
            }
          </Grid>
            </div>
        </Dialog>
      </div>
    );
  }
}

MoveEquipmentWindow.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps (state) {
  return {
    treaters: state.treaters,
    authedUser: state.authedUser
  }
}

export default
flow(connect(mapStateToProps),
withStyles(styles))(MoveEquipmentWindow);
