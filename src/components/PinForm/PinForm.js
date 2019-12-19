import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';
import boardShape from '../../helpers/propz/boardShape';

class PinForm extends React.Component {
  static propTypes = {
    addPin: PropTypes.func,
    selectedBoardId: PropTypes.string,
    pinToEdit: boardShape.boardShape,
    editPinMode: PropTypes.bool,
    updatePin: PropTypes.func,
  }

  state = {
    imageUrl: '',
    title: '',
  }

  componentDidMount() {
    const { pinToEdit, editPinMode } = this.props;
    if (editPinMode) {
      this.setState({ title: pinToEdit.title, imageUrl: pinToEdit.imageUrl });
    }
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

  updatePinEvent = (e) => {
    e.preventDefault();
    const { updatePin, pinToEdit, selectedBoardId } = this.props;
    const updatedPin = {
      title: this.state.title,
      imageUrl: this.state.imageUrl,
      boardId: selectedBoardId,
      uid: authData.getUid(),
    };
    updatePin(pinToEdit.id, updatedPin);
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
    const { editPinMode } = this.props;

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
        {
          (editPinMode) ? (<button className="btn btn-info" onClick={this.updatePinEvent}>Update Pin</button>)
            : (<button className="btn btn-secondary" onClick={this.savePinEvent}>Save Pin</button>)
        }
      </form>
    );
  }
}

export default PinForm;
