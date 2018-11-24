import React, { Component } from 'react'
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    dialog:{
        width: 800,
        height: 800
    }
})

class Search extends Component {
    state = {
        open: false
    }

    render(){
        const {classes} = this.props
        return (
            <div style={this.props.view ==='home' ?({padding: 12}):null}>
            <Button variant={this.props.view ==='home' ? 'contained':null} color='inherit' onClick={() => {this.setState({open: true})}}>Search For Equipment</Button>
            <Dialog maxWidth='lg' open={this.state.open} onClose={() => {this.setState({open: false})}} aria-labelledby="EquipmentListDialog">
              <DialogContent className={classes.dialog}>
              <iframe class="airtable-embed" src="https://airtable.com/embed/shrgWbpJzll2KxGJC?backgroundColor=gray" frameborder="0"
              onmousewheel="" width="100%" height="533"></iframe>
              </DialogContent>
            </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(Search)
