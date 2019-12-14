import React from 'react';

import pinShape from '../../helpers/propz/pinShape';

class Pins extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
  }

  render() {
    const { pin } = this.props;

    return (
      <div>
        <p>{pin.title}</p>
      </div>
    );
  }
}

export default Pins;
