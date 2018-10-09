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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux'
import flow from 'lodash/flow';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import {removeEquipment} from '../actions/equipment'

const styles = theme => ({
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

class MoveEquipmentWindow extends React.Component {
  state = {
    open: false,
    treater: '',
    crew:'',
    reason: '',
    loading: false,
    success: false,
    error: false,
  };

  crews = ['Onyx', 'Blue', 'Red', 'Green', 'Gold', 'Yard']

  handleChange = name => event => {
    console.log(this.state)
    this.setState({ [name]: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      treater: '',
      crew:'',
      reason: '',
      loading: false,
      success: false,
      error: false,
     });
  };

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    })
  }

  handleSend = () => {
    console.log(this.state)
    if (this.state.treater === '' | this.state.crew === '' | this.state.reason === '') {
    this.setState({
      error: true,
      treater: '',
      crew: '',
      reason: '',
    }) } else {
    this.handleClose()
    this.props.dispatch(removeEquipment(this.props.unitnumber, this.props.type))
    fetch('http://192.168.86.26:8000/api/v1/move_equipment/',{
      method:'POST',
      mode: 'cors',
      body: JSON.stringify({
        equipment: this.props.unitnumber,
        treater: this.state.treater,
        crew: this.state.crew.toLowerCase(),
        reason: this.state.reason,
        crewFrom: 'red'
      }),
      headers:{
        'Content-Type': 'application/json'
      }
        }
      ).then((response) => {
        this.setState({
          loading: false
        })
              }
            )}
  }

  render() {
    const { classes, treaters } = this.props;

    return (
      <div>
        <Button onClick={this.handleClickOpen}>Send Equipment</Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className='row'>
          <DialogTitle className='col-6'>{this.state.error ? 'Please Fill out all fields': this.state.success ? 'Movement logged successfully':'Send Equipment'}</DialogTitle>
          </div>
          { this.state.success ? null :
            <div>
              <DialogContent>
                <form className={classes.container}>
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
                  <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="sendto">Send To</InputLabel>
                  <Select
                    native
                    value={this.state.crew}
                    onChange={this.handleChange('crew')}
                    input={<Input id="sendto" />}
                  >
                    <option value="" />
                    { this.crews.map(crew =>
                    <option key={crew} value={crew}>{crew}</option>
                      )
                    }


                  </Select>
                  </FormControl>
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
    treaters: state.treaters
  }
}

export default
flow(connect(mapStateToProps),
withStyles(styles))(MoveEquipmentWindow);