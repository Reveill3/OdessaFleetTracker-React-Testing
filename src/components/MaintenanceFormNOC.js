import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 1000,
    minWidth: 850
  },
  section: {
    paddingTop: 11,
    paddingBottom: 11,
    marginBottom: 10,
    marginTop: 10
  },
  vsPackingParts: {
    paddingTop: 11,
    paddingBottom: 11,
    marginBottom: 10,
    marginTop: 10
  },
  vs: {
    marginTop: 5,
    paddingTop: 11
  },
  text: {
    maxHeight: 55,
    marginTop: 23,
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
  }
});

class MainForm extends React.Component {
  state = {
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
    ["Suction Seat1"]: false,
    ["Suction Seat2"]: false,
    ["Suction Seat3"]: false,
    ["Suction Seat4"]: false,
    ["Suction Seat5"]: false,
    ["Suction Valve1"]: false,
    ["Suction Valve2"]: false,
    ["Suction Valve3"]: false,
    ["Suction Valve4"]: false,
    ["Suction Valve5"]: false};

  handleCheckChange = (name, hole) => event => {
    this.setState({ [name + hole]: event.target.checked });
  };

  handleSelectChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

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
      ["Discharge Valve5"]: true,
    })
  }

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
    })
  }

  uncheck = () => {
    this.setState({
      ['Clamp Plunger1']: false,
      ['Clamp Plunger2']: false,
      ['Clamp Plunger3']: false,
      ['Clamp Plunger4']: false,
      ['Clamp Plunger5']: false,
      ['Discharge Seat1']: false,
      ['Discharge Seat2']: false,
      ['Discharge Seat3']: false,
      ['Discharge Seat4']: false,
      ['Discharge Seat5']: false,
      ['Discharge Valve1']: false,
      ['Discharge Valve2']: false,
      ['Discharge Valve3']: false,
      ['Discharge Valve4']: false,
      ['Discharge Valve5']: false,
      ['Discharge Valve Spring1']: false,
      ['Discharge Valve Spring2']: false,
      ['Discharge Valve Spring3']: false,
      ['Discharge Valve Spring4']: false,
      ['Discharge Valve Spring5']: false,
      ['Packing(w / Brass Ring)1']: false,
      ['Packing(w/ Brass Ring)2']: false,
    ['Packing(w / Brass Ring)3']: false,
    ['Packing(w / Brass Ring)4']: false,
    ['Packing(w / Brass Ring)5']: false,
    ['Packing(w / o Brass Ring)1']: false,
    ['Packing(w / o Brass Ring)2']: false,
    ['Packing(w / o Brass Ring)3']: false,
    ['Packing(w / o Brass Ring)4']: false,
    ['Packing(w / o Brass Ring)5']: false,
    ['Plunger1']: false,
    ['Plunger2']: false,
    ['Plunger3']: false,
    ['Plunger4']: false,
    ['Plunger5']: false,
    ['Suction Seat1']: false,
    ['Suction Seat2']: false,
    ['Suction Seat3']: false,
    ['Suction Seat4']: false,
    ['Suction Seat5']: false,
    ['Suction Spring1']: false,
    ['Suction Spring2']: false,
    ['Suction Spring3']: false,
    ['Suction Spring4']: false,
    ['Suction Spring5']: false,
    ['Suction Valve1']: false,
    ['Suction Valve2']: false,
    ['Suction Valve3']: false,
    ['Suction Valve4']: false,
    ['Suction Valve5']: false,
    })
  }

  generateSection = (
    iterable,
    hole,
    labels = null,
    type = null,
    style = null,
    state = null
  ) => {
    console.log(this.state);
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
                <Typography variant="h5" component="h3">
                  {hole}
                </Typography>
              ) : null}
            </Grid>
            {iterable.map(
              thing =>
                labels === null ? (
                  <Grid item xs={12}>
                    <Checkbox
                      checked={this.state[thing + hole.slice(-1)]}
                      onChange={this.handleCheckChange(thing, hole.slice(-1))}
                      value={this.state[thing + hole.slice(-1)]}
                      color="Primary"
                    />
                    <hr />
                  </Grid>
                ) : (type === "packing") | (type === "vs") ? (
                  <Grid
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
                        onChange={() => this.handleSelectChange(thing)}
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
    const { classes } = this.props;
    const count = new Array().fill();
    const holes = ["Hole 1", "Hole 2", "Hole 3", "Hole 4", "Hole 5"];
    const vsLabels = [
      "Suction Valve",
      "Suction Seat",
      "Suction Spring",
      "Discharge Valve",
      "Discharge Seat",
      "Discharge Valve Spring"
    ];
    const packingLabels = [
      "Packing (w/Brass Ring)",
      "Packing (w/o Brass Ring)",
      "Plunger",
      "Clamp Plunger"
    ];
    const otherParts = [
      "Suction Valve Guide",
      "Discharge Valve Cover",
      "Discharge Cover W/Gauge",
      "Discharge O-ring",
      "Gland Nut",
      "Spacer/Adapter",
      "Clamp Adapter",
      "Clamp Adapter Pin",
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
      "Fluid End - Stainless",
      "Fluid End = Alloy",
      "Stay Rod",
      "Stay Rod Nut",
      "SPM Check Valve Kit",
      "FMC Check Valve Kit",
      "TSI Check Valve Kit"
    ];

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={10}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography component="h2" variant="display1" gutterBottom>
                  Valves & Seats
                </Typography>
              </Grid>
              <Grid item className={this.props.classes.column} xs={2}>
                {this.generateSection(vsLabels, "Parts", vsLabels, "packing")}
              </Grid>
              {holes.map(hole => (
                <Grid item xs={2}>
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
                  vsLabels,
                  "packing"
                )}
              </Grid>
              {holes.map(hole => (
                <Grid item xs={2}>
                  {this.generateSection(packingLabels, hole)}
                </Grid>
              ))}
              <Grid xs={6}>
                <Grid container spacing={24}>
                  <Grid xs={6}>
                    {this.generateSection(
                      otherParts,
                      "Parts",
                      otherParts,
                      "packing",
                      "packing"
                    )}
                  </Grid>
                  <Grid xs={6}>
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
              <Grid xs={6}>
                <Grid container spacing={24}>
                  <Grid xs={6}>
                    {this.generateSection(
                      otherPartsTwo,
                      "Parts",
                      otherPartsTwo,
                      "packing",
                      "packing"
                    )}
                  </Grid>
                  <Grid xs={6}>
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
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MainForm);
