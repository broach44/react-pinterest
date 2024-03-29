import React from 'react';
import PropTypes from 'prop-types';
import pinShape from '../../helpers/propz/pinShape';

class Pins extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
    deleteSinglePin: PropTypes.func,
  }

  deletePinEvent = (e) => {
    e.preventDefault();
    const { deleteSinglePin, pin } = this.props;
    deleteSinglePin(pin.id);
  }

  render() {
    const { pin } = this.props;

    return (
      <div className="card">
        <img className="card-img-top" src={pin.imageUrl} alt="cat" />
        <div className="card-body">
          <h5 className="card-title">{pin.title}</h5>
          <button className="btn btn-danger" onClick={this.deletePinEvent}>Delete Pin</button>
        </div>
      </div>
    );
  }
}

export default Pins;
