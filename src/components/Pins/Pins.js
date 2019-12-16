import React from 'react';

import pinShape from '../../helpers/propz/pinShape';

class Pins extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
  }

  render() {
    const { pin } = this.props;

    return (
      <div class="card">
        <img class="card-img-top" src={pin.imageUrl} alt="cat" />
        <div class="card-body">
          <h5 class="card-title">{pin.title}</h5>
        </div>
      </div>
    );
  }
}

export default Pins;
