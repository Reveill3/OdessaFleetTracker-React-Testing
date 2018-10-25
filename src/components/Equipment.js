import React from 'react';
import {ListGroupItem, ListGroupItemText, ListGroupItemHeading, Button} from 'reactstrap';
import PropTypes from 'prop-types';

const Equipment = props => {
  if (props.transitequipment !== []) { return (
    props.transitequipment.map((equipment, index) =>
      <div key={index}>
        <ListGroupItem id='transit-row' className='row'>
          <div className='col'>
            <ListGroupItemHeading className='d-inline-block'>{equipment.unitnumber}</ListGroupItemHeading>
            <ListGroupItemText>{equipment.message}</ListGroupItemText>
            <h3>Reason:</h3>
            <ListGroupItemText>{equipment.details}</ListGroupItemText>
            <h3>Driver:</h3>
            <ListGroupItemText>{equipment.driver}</ListGroupItemText>
          </div>
          <Button color={(equipment.yours && equipment.isCancelled) ? 'danger':
            (equipment.isCancelled) ? 'success' : 'warning'}
                  className='col' onClick={() => props.cancelClick( index )}>
            {(equipment.yours && equipment.isCancelled) ?  'Press Submit to Cancel' :
              (equipment.isCancelled) ? 'Press Submit to Receive Equipment' :'Click Here To Select for Receipt/Cancellation'}
          </Button>
        </ListGroupItem>
      </div>
    )
  )} else {
    return (<div>No equipment in Transit</div>)
  }
};



Equipment.propTypes = {
  transitequipment: PropTypes.array.isRequired,
  cancelClick: PropTypes.func.isRequired,
};

export default Equipment;
