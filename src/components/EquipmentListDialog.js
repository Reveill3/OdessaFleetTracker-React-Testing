import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';

const styles = {
  dialog: {
    width: 800,
    height: 800
  }
}

class EquipmentListDialog extends React.Component {

    render() {
      const { classes } = this.props
      return (
        <Dialog maxWidth='lg' open={this.props.open} onClose={this.props.handleClose} aria-labelledby="EquipmentListDialog">
          <DialogContent className={classes.dialog}>
            <iframe
            src={`https://airtable.com/embed/${this.props.view}?backgroundColor=gray&viewControls=on`}
            FrameBorder="0" onWheel="" width="700" height="700"
            style={{background: 'transparent', border: '1px solid #ccc'}}>
            </iframe>
          </DialogContent>
        </Dialog>
      )
    }
}

export default withStyles(styles)(EquipmentListDialog)
