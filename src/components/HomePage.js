import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import Title from './JumboTron';
import Steps from './Step'
import Slide from '@material-ui/core/Slide';
import EquipmentListDrawer from './EquipmentListDrawer'
import Grid from '@material-ui/core/Grid';
import Search from './Search'

const styles = theme => ({
    button: {
        marginTop: 45,
        textAlign: 'center'
    },
    wrapper: {
        width: 1200,
        margin: 'auto'
    }
})


class HomePage extends Component {

  render() {
      const {classes} = this.props
    return (
        <Slide direction='right' in={true}>
      <div className={classes.wrapper}>
        <Title/>
          <Container>
            <Steps/>
          </Container>
          <Grid container spacing={24}>
            <Grid item xs={6} className={classes.button}>
                <EquipmentListDrawer view='home'/>
            </Grid>
            <Grid itsm xs={6} className={classes.button}>
                <Search view='home'/>
            </Grid>
          </Grid>
      </div>
       </Slide>


    );
  }
}

export default withStyles(styles)(HomePage);
