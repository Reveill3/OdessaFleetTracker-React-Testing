import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

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

function Note (props) {
  const { classes } = props
  return (
    <Grid item xs={12}>
    <Paper className={classes.root} elevation={1}>
      <div className={classes.gridRoot}>
        <Grid container spacing={24}>
          <Grid item xs={10}>
            <Grid container spacing={24}>
              <Grid item xs={9}>
                <Typography variant='h5' component='h3'>
                  {props.note.title}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption">
                  Made By: {props.note.treater}
                </Typography>
              </Grid>
              <Grid item xs={9}>
              <Typography component="p">
                {props.note.details}
              </Typography>
            </Grid>
          </Grid>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon onClick={() => props.deleteNote(props.index, props.note.id,
                  props.note.treater,
                  props.note.details, props.note.title, props.note.noteNum
                )}/>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </div>
    </Paper>
  </Grid>)

}

export default withStyles(styles)(Note)
