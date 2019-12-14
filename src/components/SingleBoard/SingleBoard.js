import React from 'react';
import PropTypes from 'prop-types';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import Pins from '../Pins/Pins';

class SingleBoard extends React.Component {
  static propTypes = {
    selectedBoardId: PropTypes.string,
    setSingleBoard: PropTypes.func,
  }

  state = {
    board: {},
    pins: [],
  }

  componentDidMount() {
    const { selectedBoardId } = this.props;
    boardsData.getSingleBoard(selectedBoardId)
      .then((request) => {
        this.setState({ board: request.data });
        pinsData.getPinsByBoardId(selectedBoardId)
          .then((pins) => {
            this.setState({ pins });
          })
          .catch((error) => console.error(error));
      })
      .catch((errorFromGetSingleBoard) => console.error(errorFromGetSingleBoard));
  }

  removeSelectedBoardId = (e) => {
    e.preventDefault();
    const { setSingleBoard } = this.props;
    setSingleBoard(null);
  }

  render() {
    const { board, pins } = this.state;
    return (
      <div>
        <button className="btn btn-info" onClick={this.removeSelectedBoardId}>x Close Board View</button>
        <div className="SingleBoard col-8 offset-2">
          <h2>{board.name}</h2>
          <p>{board.description}</p>
          <div className="d-flex flex-wrap">
            { pins.map((pin) => <Pins pin={pin}/>)}
          </div>
        </div>
      </div>
    );
  }
}

export default SingleBoard;
