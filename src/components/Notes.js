import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Note from './Note'
import { addNote } from '../actions/equipment'
import flow from 'lodash/flow';
import PropTypes from 'prop-types';
import { removeNote } from '../actions/equipment'
import { connect } from 'react-redux'
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from '@material-ui/core/Input';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  gridRoot: {
    flexGrow: 1
  }
});

class Notes extends Component {

  state = {
    open: false
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSelectChange = name => event => {
    this.setState({ [name]: event.target.value });
  }

  notesAdded = 0


  handleAddNote = event => {
    const error = this.state.details === undefined | this.state.details === ''
    | this.state.note === undefined | this.state.note === ''
    | this.state.treater === undefined | this.state.treater === '' ? true:false

    if (error) {
    this.props.toggleNotification('note')
    this.setState({
      note: '',
      details: '',
      treater: '',
    })
  } else {
    this.notesAdded = this.notesAdded + 1
    console.log(this.props.notes[0].totalNotes + this.notesAdded)
    this.props.dispatch(
      addNote(
        this.props.unitnumber,
        {
      id: 'new',
      noteNum: this.props.notes[0].totalNotes + this.notesAdded,
      title: this.state.note,
      details: this.state.details,
      treater: this.state.treater
    },
     this.props.type)
  )
    fetch('https://odessafleettracker.herokuapp.com/api/v1/add_note/',{ // TODO: replace url
      method:'POST',
      mode: 'cors',
      body: JSON.stringify({
        number: this.props.notes[0].totalNotes + this.notesAdded,
        title: this.state.note,
        details: this.state.details,
        supervisor: this.state.treater,
        unitnumber: this.props.unitnumber
      }),
      headers:{
        'Content-Type': 'application/json'
      }
        }
      ).then(response => {
        this.setState({
          note: '',
          details: '',
          treater: '',
        })
        this.props.toggleNotification('noteSuccess')}).catch(error =>{
        this.props.toggleNotification('noteFail')
        this.props.dispatch(
          removeNote(this.props.notes.length - 1,
            this.props.unitnumber, this.props.type)
          )}
        )}

  }

  handleDelete = (index, recId, treater, details, title, noteNum) => {
    if (title !== 'This is a note'){
    this.props.dispatch(removeNote(index, this.props.unitnumber, this.props.type))
    fetch('https://odessafleettracker.herokuapp.com/api/v1/delete_note/',{ // TODO: replace url
      method:'POST',
      mode: 'cors',
      body: JSON.stringify({
        noteNum: noteNum,
        recId: recId,
        unitnumber: this.props.unitnumber
      }),
      headers:{
        'Content-Type': 'application/json'
      }
        }
      ).catch(error =>{
        this.props.dispatch(
          addNote(
            this.props.unitnumber,
            {
          notNum: noteNum,
          id: recId,
          title: title,
          details: details,
          treater: treater
        },
         this.props.type)
          )}
        )} else {this.props.toggleNotification('test')}

  }

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
        <Button color="primary" onClick={this.handleClickOpen}>
          Notes
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Notes on {this.props.unitnumber}</DialogTitle>
          <DialogContent>
            <div className={classes.gridRoot}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <DialogContentText>
                    Add Notes here.
                  </DialogContentText>
                </Grid>

                {this.props.notes.map((note, index) => (
                  <Note key={index} note={note} index={index} deleteNote={this.handleDelete}/>
                ))}
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="treater">Supervisor Name</InputLabel>
                    <Select
                      native
                      value={this.state.treater}
                      onChange={this.handleSelectChange('treater')}
                      input={<Input id="treater" />}
                    >
                      <option value="" />
                      { this.props.treaters.treaters.map(treater =>
                      <option key={treater.name} value={treater.name}>{treater.name}</option>
                        )
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <TextField
                  autoFocus
                  margin="dense"
                  id="note"
                  label="Enter Note Title Here"
                  type="note"
                  onChange={this.handleChange}
                  value={this.state.note}
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="details"
                  label="Enter Note Details Here"
                  type="details"
                  value= {this.state.details}
                  onChange={this.handleChange}
                  fullWidth
                />
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Exit</Button>
            <Button color="primary" onClick={this.handleAddNote}>
              Add Note
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    treaters: state.treaters
  }
}

Notes.propTypes = {
  notes: PropTypes.array.isRequired,
  unitnumber: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default flow(
  withStyles(styles),
 connect(mapStateToProps))(Notes);
