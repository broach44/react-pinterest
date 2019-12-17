import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';

class PinForm extends React.Component {
  static propTypes = {
    addPin: PropTypes.func,
    selectedBoardId: PropTypes.string,
  }

  state = {
    imageUrl: '',
    title: '',
  }

  savePinEvent = (e) => {
    const { addPin, selectedBoardId } = this.props;

    e.preventDefault();
    const newPin = {
      title: this.state.title,
      imageUrl: this.state.imageUrl,
      uid: authData.getUid(),
      boardId: selectedBoardId,
    };
    addPin(newPin);
  }

  imageChange = (e) => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.value });
  }

  titleChange = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  render() {
    const { title, imageUrl } = this.state;

    return (
      <form className='col-6 offset-3 PinForm'>
        <div className="form-group">
          <label htmlFor="pin-title">Pin Title:</label>
          <input
            type="text"
            className="form-control"
            id="pin-title"
            placeholder="Cat Pic"
            value={title}
            onChange={this.titleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pin-image-url">Pin Image Url:</label>
          <input
            type="text"
            className="form-control"
            id="pin-image-url"
            placeholder="https://www.google.com"
            value={imageUrl}
            onChange={this.imageChange}
          />
        </div>
        <button className="btn btn-secondary" onClick={this.savePinEvent}>Add Pin</button>
      </form>
    );
  }
}

export default PinForm;
