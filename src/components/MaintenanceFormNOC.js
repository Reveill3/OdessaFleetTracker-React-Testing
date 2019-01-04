import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import { updateHours } from '../actions/pumps'


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  section: {
    marginBottom: 10,
    marginTop: 36
  },
  vsPackingParts: {
    paddingTop: 11,
    paddingBottom: 11,
    marginBottom: 10,
    marginTop: 10
  },
  vs: {
    marginTop: 28,
    paddingTop: 11
  },
  text: {
    maxHeight: 55,
    marginTop: 62,
    paddingLeft: 20,
    marginLeft: 10,
    minHeight: 60,
    paddingBottom: 10
  },
  paper: {
    marginLeft: 10
  },
  labels: {
    marginLeft: 25,
    marginTop: 30
  },
  appBar: {
  position: 'relative',
},
partsContainer: {
  marginTop:10
}
});

class MainForm extends React.Component {
  state = {
    open: false,
    unitnumber: this.props.unitnumber,
    crew: this.props.authedUser,
    treater: '',
    ['pump_hours']: '',
    ["grease_pressure1"]: 0,
    ["grease_pressure2"]: 0,
    ["grease_pressure3"]: 0,
    ["grease_pressure4"]: 0,
    ["grease_pressure5"]: 0,
    ["Discharge Seat1"]: false,
    ["Discharge Seat2"]: false,
    ["Discharge Seat3"]: false,
    ["Discharge Seat4"]: false,
    ["Discharge Seat5"]: false,
    ["Discharge Valve1"]: false,
    ["Discharge Valve2"]: false,
    ["Discharge Valve3"]: false,
    ["Discharge Valve4"]: false,
    ["Discharge Valve5"]: false,
    ['Discharge Valve Spring1']: false,
    ['Discharge Valve Spring2']: false,
    ['Discharge Valve Spring3']: false,
    ['Discharge Valve Spring4']: false,
    ['Discharge Valve Spring5']: false,
    ["Suction Seat1"]: false,
    ["Suction Seat2"]: false,
    ["Suction Seat3"]: false,
    ["Suction Seat4"]: false,
    ["Suction Seat5"]: false,
    ["Suction Valve1"]: false,
    ["Suction Valve2"]: false,
    ["Suction Valve3"]: false,
    ["Suction Valve4"]: false,
    ["Suction Valve5"]: false,
    ['Suction Spring1']: false,
    ['Suction Spring2']: false,
    ['Suction Spring3']: false,
    ['Suction Spring4']: false,
    ['Suction Spring5']: false,
    ["Packing(w / Brass Ring)1"]: false,
    ["Packing(w / Brass Ring)2"]: false,
    ["Packing(w / Brass Ring)3"]: false,
    ["Packing(w / Brass Ring)4"]: false,
    ["Packing(w / Brass Ring)5"]: false,
    ["Packing(w / o Brass Ring)1"]: false,
    ["Packing(w / o Brass Ring)2"]: false,
    ["Packing(w / o Brass Ring)3"]: false,
    ["Packing(w / o Brass Ring)4"]: false,
    ["Packing(w / o Brass Ring)5"]: false,
    ['Plunger1']: false,
    ['Plunger2']: false,
    ['Plunger3']: false,
    ['Plunger4']: false,
    ['Plunger5']: false,
    ['Clamp Plunger1']: false,
    ['Clamp Plunger2']: false,
    ['Clamp Plunger3']: false,
    ['Clamp Plunger4']: false,
    ['Clamp Plunger5']: false,
    ['4" Flappers']: "",
    ['6" Vic Seal']: "",
    ['Clamp']: "",
    ['Pin Clamp Style']: "",
    ['Christmas Tree']: "",
    ['Discharge Flange Bolt']: "",
    ['Discharge Flange Nut']: "",
    ['Discharge O-ring']: "",
    ['Pressure Cap']: "",
    ['Flange O-ring']: "",
    ['Needle Valve']: "",
    ['Grease Plunger']: "",
    ['Gland Nut']: "",
    ['Manifold O-ring']: "",
    ['Pony Rod Adapter Bolts']: "",
    ['Grease Check Valve']: "",
    ['Spacer/Adapter']: "",
    ['Spring Keeper']: "",
    ['Spring Keeper Pin']: "",
    ['Stay Rod']: "",
    ['Stay Rod Nut']: "",
    ['Suction Manifold Bolt']: "",
    ['Suction Valve Guide']: "",
    ['Gauge Retainer Nut']: "",
    ['FMC Check Valve Kit']: "",
  };

  blankState = {
    open: true,
    unitnumber: this.props.unitnumber,
    crew: this.props.authedUser,
    treater: '',
    ['pump_hours']: '',
    ["grease_pressure1"]:0,
    ["grease_pressure2"]: 0,
    ["grease_pressure3"]: 0,
    ["grease_pressure4"]: 0,
    ["grease_pressure5"]: 0,
    ["Discharge Seat1"]: false,
    ["Discharge Seat2"]: false,
    ["Discharge Seat3"]: false,
    ["Discharge Seat4"]: false,
    ["Discharge Seat5"]: false,
    ["Discharge Valve1"]: false,
    ["Discharge Valve2"]: false,
    ["Discharge Valve3"]: false,
    ["Discharge Valve4"]: false,
    ["Discharge Valve5"]: false,
    ['Discharge Valve Spring1']: false,
    ['Discharge Valve Spring2']: false,
    ['Discharge Valve Spring3']: false,
    ['Discharge Valve Spring4']: false,
    ['Discharge Valve Spring5']: false,
    ["Suction Seat1"]: false,
    ["Suction Seat2"]: false,
    ["Suction Seat3"]: false,
    ["Suction Seat4"]: false,
    ["Suction Seat5"]: false,
    ["Suction Valve1"]: false,
    ["Suction Valve2"]: false,
    ["Suction Valve3"]: false,
    ["Suction Valve4"]: false,
    ["Suction Valve5"]: false,
    ['Suction Spring1']: false,
    ['Suction Spring2']: false,
    ['Suction Spring3']: false,
    ['Suction Spring4']: false,
    ['Suction Spring5']: false,
    ["Packing(w / Brass Ring)1"]: false,
    ["Packing(w / Brass Ring)2"]: false,
    ["Packing(w / Brass Ring)3"]: false,
    ["Packing(w / Brass Ring)4"]: false,
    ["Packing(w / Brass Ring)5"]: false,
    ["Packing(w / o Brass Ring)1"]: false,
    ["Packing(w / o Brass Ring)2"]: false,
    ["Packing(w / o Brass Ring)3"]: false,
    ["Packing(w / o Brass Ring)4"]: false,
    ["Packing(w / o Brass Ring)5"]: false,
    ['Plunger1']: false,
    ['Plunger2']: false,
    ['Plunger3']: false,
    ['Plunger4']: false,
    ['Plunger5']: false,
    ['Clamp Plunger1']: false,
    ['Clamp Plunger2']: false,
    ['Clamp Plunger3']: false,
    ['Clamp Plunger4']: false,
    ['Clamp Plunger5']: false,
    ['4" Flappers']: "",
    ['6" Vic Seal']: "",
    ['Clamp']: "",
    ['Pin Clamp Style']: "",
    ['Christmas Tree']: "",
    ['Discharge Flange Bolt']: "",
    ['Discharge Flange Nut']: "",
    ['Discharge O-ring']: "",
    ['Pressure Cap']: "",
    ['Flange O-ring']: "",
    ['Needle Valve']: "",
    ['Grease Plunger']: "",
    ['Gland Nut']: "",
    ['Manifold O-ring']: "",
    ['Pony Rod Adapter Bolts']: "",
    ['Grease Check Valve']: "",
    ['Spacer/Adapter']: "",
    ['Spring Keeper']: "",
    ['Spring Keeper Pin']: "",
    ['Stay Rod']: "",
    ['Stay Rod Nut']: "",
    ['Suction Manifold Bolt']: "",
    ['Suction Valve Guide']: "",
    ['Gauge Retainer Nut']: "",
    ['FMC Check Valve Kit']: "",
  }

  handleClickOpen = () => {
  this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({...this.blankState,'open': false});
  };


  handleCheckChange = (name, hole) => event => {
    this.setState({ [name + hole]: event.target.checked });
  };

  handleSelectChange = name => event => {
    event.target.value === '' ? this.setState({ [name]: null }) : name === 'pump_hours' ? this.setState({ [name]: parseInt(event.target.value) })
    :
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = (error, errorType) => {
    const keys = Object.keys(this.state)
    const vsHoles = keys.filter(key => key.includes('Valve') | key.includes('Seat') | key.includes('Packing') && this.state[key] !== false && !isNaN(key.slice(-1)) ).map(item => item.slice(-1))
    const toUpdate = [...new Set(vsHoles)]
    const justVS = keys.filter(key => key.includes('Valve') | key.includes('Seat') && this.state[key] !== false && !isNaN(key.slice(-1))).map(item => item.slice(-1))
    let lifeObjectLog = {
            hole_1_life: 0,
            hole_2_life: 0,
            hole_3_life: 0,
            hole_4_life: 0,
            hole_5_life: 0,
          }
    justVS.forEach(hole => lifeObjectLog['hole_' + hole + '_life'] = this.state.pump_hours - this.props.holehours[parseInt(hole) - 1])
    let lifeObjectDisplay = {
            hole_1_life: this.state.pump_hours - this.props.holehours[0],
            hole_2_life: this.state.pump_hours - this.props.holehours[1],
            hole_3_life: this.state.pump_hours - this.props.holehours[2],
            hole_4_life: this.state.pump_hours - this.props.holehours[3],
            hole_5_life: this.state.pump_hours - this.props.holehours[4],
          }
    justVS.forEach(hole => lifeObjectDisplay['hole_' + hole + '_life'] = 0)
    let newPrevHours = {
      hole_1: this.props.holehours[0],
      hole_2: this.props.holehours[1],
      hole_3: this.props.holehours[2],
      hole_4: this.props.holehours[3],
      hole_5: this.props.holehours[4],
    }
    justVS.forEach(hole => newPrevHours['hole_' + hole] = this.state.pump_hours)

    if (!error)
    {
      fetch('https://odessafleettracker.herokuapp.com/api/v1/log_maintenance/',{ // TODO: replace url
      method:'POST',
      mode: 'cors',
      body: JSON.stringify({
        ...this.state,
        ...lifeObjectLog,
        toUpdate: toUpdate
      }),
      headers:{
        'Content-Type': 'application/json'
      }
        }
      ).then((response) => {
          fetch('https://odessafleettracker.herokuapp.com/api/v1/update_pump_hours/',{ // TODO: replace url
            method:'POST',
            mode: 'cors',
            body: JSON.stringify([{'unitnumber': this.props.unitnumber, 'pumphours': parseInt(this.state.pump_hours)}]),
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(() =>{
            this.props.toggleNotification('maintenance_success')
            this.props.dispatch(updateHours(this.props.unitnumber, {
              pump_hours: this.state.pump_hours,
              hole_life: [lifeObjectDisplay.hole_1_life,
              lifeObjectDisplay.hole_2_life,
              lifeObjectDisplay.hole_3_life,
              lifeObjectDisplay.hole_4_life,
              lifeObjectDisplay.hole_5_life],
              previous_hours: {
                    ...newPrevHours
              }
            }))
            this.setState(this.blankState)}
          )}
        ).catch((error) => {
              this.props.toggleNotification()
              this.setState(this.blankState)
            })} else {
              this.setState(this.blankState)
              this.props.current_pumphours > this.state.pump_hours ?
              this.props.toggleNotification('pumpHours')
              : errorType === 'plunger' ?
              this.props.toggleNotification('plunger'):
              this.props.toggleNotification('maintenance')
            }

          }


  fullBuild = () => {
    this.setState({
      ["Discharge Seat1"]: true,
      ["Discharge Seat2"]: true,
      ["Discharge Seat3"]: true,
      ["Discharge Seat4"]: true,
      ["Discharge Seat5"]: true,
      ["Discharge Valve1"]: true,
      ["Discharge Valve2"]: true,
      ["Discharge Valve3"]: true,
      ["Discharge Valve4"]: true,
      ["Discharge Valve5"]: true,
      ["Suction Seat1"]: true,
      ["Suction Seat2"]: true,
      ["Suction Seat3"]: true,
      ["Suction Seat4"]: true,
      ["Suction Seat5"]: true,
      ["Suction Valve1"]: true,
      ["Suction Valve2"]: true,
      ["Suction Valve3"]: true,
      ["Suction Valve4"]: true,
      ["Suction Valve5"]: true
    });
  };

  tops = () => {
    this.setState({
      ["Discharge Seat1"]: true,
      ["Discharge Seat2"]: true,
      ["Discharge Seat3"]: true,
      ["Discharge Seat4"]: true,
      ["Discharge Seat5"]: true,
      ["Discharge Valve1"]: true,
      ["Discharge Valve2"]: true,
      ["Discharge Valve3"]: true,
      ["Discharge Valve4"]: true,
      ["Discharge Valve5"]: true
    });
  };

  bottoms = () => {
    this.setState({
      ["Suction Seat1"]: true,
      ["Suction Seat2"]: true,
      ["Suction Seat3"]: true,
      ["Suction Seat4"]: true,
      ["Suction Seat5"]: true,
      ["Suction Valve1"]: true,
      ["Suction Valve2"]: true,
      ["Suction Valve3"]: true,
      ["Suction Valve4"]: true,
      ["Suction Valve5"]: true
    });
  };

  uncheck = () => {
    this.setState({
      ["Clamp Plunger1"]: false,
      ["Clamp Plunger2"]: false,
      ["Clamp Plunger3"]: false,
      ["Clamp Plunger4"]: false,
      ["Clamp Plunger5"]: false,
      ["Discharge Seat1"]: false,
      ["Discharge Seat2"]: false,
      ["Discharge Seat3"]: false,
      ["Discharge Seat4"]: false,
      ["Discharge Seat5"]: false,
      ["Discharge Valve1"]: false,
      ["Discharge Valve2"]: false,
      ["Discharge Valve3"]: false,
      ["Discharge Valve4"]: false,
      ["Discharge Valve5"]: false,
      ["Discharge Valve Spring1"]: false,
      ["Discharge Valve Spring2"]: false,
      ["Discharge Valve Spring3"]: false,
      ["Discharge Valve Spring4"]: false,
      ["Discharge Valve Spring5"]: false,
      ["Packing(w / Brass Ring)1"]: false,
      ["Packing(w / Brass Ring)2"]: false,
      ["Packing(w / Brass Ring)3"]: false,
      ["Packing(w / Brass Ring)4"]: false,
      ["Packing(w / Brass Ring)5"]: false,
      ["Packing(w / o Brass Ring)1"]: false,
      ["Packing(w / o Brass Ring)2"]: false,
      ["Packing(w / o Brass Ring)3"]: false,
      ["Packing(w / o Brass Ring)4"]: false,
      ["Packing(w / o Brass Ring)5"]: false,
      ["Plunger1"]: false,
      ["Plunger2"]: false,
      ["Plunger3"]: false,
      ["Plunger4"]: false,
      ["Plunger5"]: false,
      ["Suction Seat1"]: false,
      ["Suction Seat2"]: false,
      ["Suction Seat3"]: false,
      ["Suction Seat4"]: false,
      ["Suction Seat5"]: false,
      ["Suction Spring1"]: false,
      ["Suction Spring2"]: false,
      ["Suction Spring3"]: false,
      ["Suction Spring4"]: false,
      ["Suction Spring5"]: false,
      ["Suction Valve1"]: false,
      ["Suction Valve2"]: false,
      ["Suction Valve3"]: false,
      ["Suction Valve4"]: false,
      ["Suction Valve5"]: false
    });
  };

  generateSection = (
    iterable,
    hole,
    labels = null,
    type = null,
    style = null,
    state = null
  ) => {
    return (
      <div
        className={
          type === "text"
            ? this.props.classes.section
            : this.props.classes.labels
        }
      >
          <Paper className={this.props.classes.paper}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                {type !== "text" ? (
                  <Typography variant="headline" component="h3">
                    {hole}
                  </Typography>
                ) : null}
              </Grid>
              {iterable.map(
                (thing, index) =>
                  labels === null ? (
                    <Grid  key={index} item xs={12}>
                      <Checkbox
                        checked={this.state[thing + hole.slice(-1)]}
                        onChange={this.handleCheckChange(thing, hole.slice(-1))}
                        value={this.state[thing + hole.slice(-1)]}
                        color="primary"
                      />
                      <hr />
                    </Grid>
                  ) : (type === "packing") | (type === "vs") ? (
                    <Grid
                      key={index}
                      item
                      xs={12}
                      className={
                        style === "packing"
                          ? this.props.classes.section
                          : this.props.classes.vs
                      }
                    >
                      <Typography component="h2" variant="body1" gutterBottom>
                        {thing}
                      </Typography>
                      <hr />
                    </Grid>
                  ) : (
                    <Grid item xs={12} className={this.props.classes.text}>
                      <FormControl className={this.props.classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Amt</InputLabel>
                        <Select
                          native
                          value={this.state[thing]}
                          onChange={this.handleSelectChange(thing)}
                          inputProps={{
                            name: "Amt",
                            id: { thing }
                          }}
                        >
                          <option value="" />
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                        </Select>
                      </FormControl>
                    </Grid>
                  )
              )}
            </Grid>
          </Paper>
      </div>
    );
  };

  render() {
    const holes = ["Hole 1", "Hole 2", "Hole 3", "Hole 4", "Hole 5"];
    const keys = Object.keys(this.state)
    let errorFilter = keys.filter(key => key.includes('pump') | key.includes('grease') && this.state[key] === '' | isNaN(this.state[key]) | this.state['pump_hours'] === 0 | this.state['treater'] === '')
    holes.forEach(hole =>
    this.state['Plunger' + hole.slice(-1)] === true && this.state['Clamp Plunger' + hole.slice(-1)] === true ?
    errorFilter = errorFilter.concat(hole + ' Plunger'):null)
    let errorType = null
    errorFilter.forEach(item => item.includes('Plunger') ? errorType = 'plunger':null)
    let error = errorFilter.length > 0 | this.props.current_pumphours > this.state.pump_hours ? true:false
    const { classes } = this.props;
    const count = new Array().fill();



    const vsLabels = [
      "Suction Valve",
      "Suction Seat",
      "Suction Spring",
      "Discharge Valve",
      "Discharge Seat",
      "Discharge Valve Spring"
    ];
    const packingLabels = [
      "Packing(w / Brass Ring)",
      "Packing(w / o Brass Ring)",
      "Plunger",
      "Clamp Plunger"
    ];
    const otherParts = [
      "Suction Valve Guide",
      "Pressure Cap",
      "Christmas Tree",
      "Discharge O-ring",
      "Gland Nut",
      "Spacer/Adapter",
      "Clamp",
      "Pin Clamp Style",
      "Pony Rod Adapter Bolts",
      "Spring Keeper",
      "Spring Keeper Pin",
      "Suction Manifold Bolt",
      "Manifold O-ring",
      '6" Vic Seal',
      "Discharge Flange Bolt",
      "Discharge Flange Nut",
      "Flange O-ring",
      '4" Flappers'
    ];
    const otherPartsTwo = [
      "Needle Valve",
      "Grease Plunger",
      "Stay Rod",
      "Stay Rod Nut",
      "Grease Check Valve",
      "FMC Check Valve Kit",
      "Gauge Retainer Nut"
    ];

    const checkboxPackingHolesAll = Object.keys(this.state).filter(key =>
      key.includes("Packing")
    );

    let packingHoles = [];
    checkboxPackingHolesAll.forEach(
      item =>
        this.state[item] && !packingHoles.includes(parseInt(item.slice(-1)))
          ? packingHoles.push(parseInt(item.slice(-1)))
          : null
    );
    packingHoles = packingHoles.sort((a, b) => a - b);


    return (
      <div className={classes.root}>
        <Button color='primary' onClick={this.handleClickOpen}>Log Maintenance</Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Grid container spacing={24}>
          <Grid item xs={12}>
            <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Log Maintenance for {this.props.unitnumber}
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
          <Grid item xs={10}>
            <Grid container spacing={24} className={classes.partsContainer}>
              <Grid item xs={12}>
                <Typography component="h2" variant="display1" gutterBottom>
                  Valves & Seats
                </Typography>
              </Grid>
              <Grid item className={this.props.classes.column} xs={2}>
                {this.generateSection(vsLabels, "Parts", vsLabels, "packing")}
              </Grid>
              {holes.map((hole, index) => (
                <Grid key={index} item xs={2}>
                  {this.generateSection(vsLabels, hole)}
                </Grid>
              ))}
              <Grid item xs={12}>
                <Typography component="h2" variant="display1" gutterBottom>
                  Packing
                </Typography>
              </Grid>
              <Grid item xs={2}>
                {this.generateSection(
                  packingLabels,
                  "Parts",
                  packingLabels,
                  "packing"
                )}
              </Grid>
              {holes.map((hole, index) => (
                <Grid key={index} item xs={2}>
                  {this.generateSection(packingLabels, hole)}
                </Grid>
              ))}
              <Grid item xs={6}>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    {this.generateSection(
                      otherParts,
                      "Parts",
                      otherParts,
                      "packing",
                      "packing"
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {this.generateSection(
                      otherParts,
                      "Parts",
                      otherParts,
                      "text",
                      "packing"
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    {this.generateSection(
                      otherPartsTwo,
                      "Parts",
                      otherPartsTwo,
                      "packing",
                      "packing"
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {this.generateSection(
                      otherPartsTwo,
                      "Parts",
                      otherPartsTwo,
                      "text",
                      "packing"
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => this.fullBuild()}
                >
                  Full Build
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => this.tops()}
                >
                  Tops
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => this.bottoms()}
                >
                  Bottoms
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => this.uncheck()}
                >
                  Uncheck All
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="inherit" className={classes.flex}>
                  Current Pump Hours: {this.props.current_pumphours}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <TextField
                    margin="dense"
                    id="pump_hours"
                    label="Pump Hours"
                    type="text"
                    onChange={this.handleSelectChange('pump_hours')}
                    value={this.state['pump_hours']}
                  />
                </FormControl>
              </Grid>
              {packingHoles.map((hole, index) => (
                <Grid key={index} item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      margin="dense"
                      id={"grease_pressure" + String(hole)}
                      label={"Grease Pressure Hole " + String(hole)}
                      type="text"
                      onChange={this.handleSelectChange(
                        "grease_pressure" + String(hole)
                      )}
                      value={this.state["grease_pressure" + String(hole)]}
                    />
                  </FormControl>
                </Grid>
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
                    {this.props.treaters.treaters !== undefined ? ( this.props.treaters.treaters.map(treater =>
                    <option key={treater.name} value={treater.name}>{treater.name}</option>
                      ))
                   : null}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => this.handleSubmit(error, errorType)}
                >
                  Submit Maintenance
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    treaters: state.treaters,
    authedUser: state.authedUser
  }
}

export default flow(connect(mapStateToProps),
withStyles(styles))(MainForm);
