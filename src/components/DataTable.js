import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
});

let id = 0;
function createData(hole, hours) {
  id += 1;
  return {id, hole, hours};
}



function DataTable(props) {
  const { classes } = props;
  const rows = [
    createData('1', props.holehours[0]),
    createData('2', props.holehours[1]),
    createData('3', props.holehours[2]),
    createData('4', props.holehours[3]),
    createData('5', props.holehours[4]),
  ];
  return (
    <Grid item xs={12}>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Hole</TableCell>
            <TableCell numeric>Current Valve & Seat Life</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.hole}
                </TableCell>
                <TableCell numeric>{row.hours}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  </Grid>
  );
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  holehours: PropTypes.array.isRequired
};

export default withStyles(styles)(DataTable);
