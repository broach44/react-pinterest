import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';
import boardsData from '../../helpers/data/boardsData';

import Board from '../Board/Board';
import BoardForm from '../BoardForm/BoardForm';

class BoardsContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func,
  }

  state = {
    boards: [],
  }

  componentDidMount() {
    this.getBoardData();
  }

  getBoardData = () => {
    boardsData.getBoardsByUid(authData.getUid())
      .then((boards) => {
        this.setState({ boards });
      })
      .catch((errfromBoardContainer) => console.error(errfromBoardContainer));
  }

  addBoard = (newBoard) => {
    boardsData.saveBoard(newBoard)
      .then(() => {
        this.getBoardData();
      })
      .catch((errorFromSaveBoard) => console.error(errorFromSaveBoard));
    this.setState({ boardName: '', description: '' });
  }

  render() {
    const { setSingleBoard } = this.props;
    return (
    <div>
      <BoardForm addBoard={this.addBoard} />
      {this.state.boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} />)}
    </div>);
  }
}

export default BoardsContainer;
