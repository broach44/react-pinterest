import React from 'react';
import PropTypes from 'prop-types';

import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import Pins from '../Pins/Pins';
import PinForm from '../PinForm/PinForm';

class SingleBoard extends React.Component {
  static propTypes = {
    selectedBoardId: PropTypes.string,
    setSingleBoard: PropTypes.func,
  }

  state = {
    board: {},
    pins: [],
    editPinMode: false,
    pinToEdit: {},
    showPinForm: false,
  }

  getPinData = (selectedBoardId) => {
    pinsData.getPinsByBoardId(selectedBoardId)
      .then((pins) => {
        this.setState({ pins });
      })
      .catch((error) => console.error(error));
  }

  componentDidMount() {
    const { selectedBoardId } = this.props;
    boardsData.getSingleBoard(selectedBoardId)
      .then((request) => {
        this.setState({ board: request.data });
        this.getPinData(selectedBoardId);
      })
      .catch((errorFromGetSingleBoard) => console.error(errorFromGetSingleBoard));
  }

  addPin = (newPin) => {
    const { selectedBoardId } = this.props;
    pinsData.savePin(newPin)
      .then(() => {
        this.getPinData(selectedBoardId);
      })
      .catch((errorFromAddPin) => console.error(errorFromAddPin));
    this.setState({ title: '', imageUrl: '' });
  };

  updatePin = (pinId, updatedPin) => {
    const { selectedBoardId } = this.props;
    pinsData.updatePin(pinId, updatedPin)
      .then(() => {
        this.setState({ editPinMode: false, showPinForm: false });
        this.getPinData(selectedBoardId);
      })
      .catch((errFromUpdatePin) => console.error(errFromUpdatePin));
  }

  deleteSinglePin = (pinId) => {
    pinsData.deletePin(pinId)
      .then(() => {
        this.getPinData(this.props.selectedBoardId);
      })
      .catch((error) => console.error(error));
  }

  removeSelectedBoardId = (e) => {
    e.preventDefault();
    const { setSingleBoard } = this.props;
    setSingleBoard(null);
  }

  setEditPinMode = (editMode) => {
    this.setState({ editMode, showPinForm: true });
  }

  setPinToEdit = (pin) => {
    this.setState({ pinToEdit: pin });
  }

  setShowPinForm = () => {
    this.setState({ showPinForm: true });
  }

  render() {
    const { board, pins } = this.state;
    const { selectedBoardId } = this.props;
    return (
      <div>
        <PinForm
          addPin={this.addPin}
          selectedBoardId={selectedBoardId}
          updatePin={this.updatePin}
          editPinMode={this.state.editPinMode}
          pinToEdit={this.state.pinToEdit}
          />
        <button className="btn btn-info" onClick={this.removeSelectedBoardId}>x Close Board View</button>
        <div className="SingleBoard col-8 offset-2">
          <h2>{board.name}</h2>
          <p>{board.description}</p>
          <div className="d-flex flex-wrap">
            { pins.map((pin) => <Pins key={pin.id} pin={pin} deleteSinglePin={this.deleteSinglePin} setEditPinMode={this.setEditPinMode} setPinToEdit={this.setPinToEdit} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default SingleBoard;
