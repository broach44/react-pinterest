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
    editMode: false,
    boardToEdit: {},
    showBoardForm: false,
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
        this.setState({ showBoardForm: false });
      })
      .catch((errorFromSaveBoard) => console.error(errorFromSaveBoard));
    this.setState({ boardName: '', description: '' });
  }

  updateBoard = (boardId, updatedBoard) => {
    boardsData.updateBoard(boardId, updatedBoard)
      .then(() => {
        this.setState({ editMode: false, showBoardForm: false });
        this.getBoardData();
      })
      .catch((errFromUpdateBoard) => console.error(errFromUpdateBoard));
  };

  setEditMode = (editMode) => {
    this.setState({ editMode, showBoardForm: true });
  };

  setBoardToEdit = (board) => {
    this.setState({ boardToEdit: board });
  }

  setshowBoardForm = () => {
    this.setState({ showBoardForm: true });
  }

  render() {
    const { setSingleBoard } = this.props;
    return (
    <div>
      <button className="btn btn-secondary mt-2" onClick={this.setshowBoardForm}>Add New Board</button>
      { this.state.showBoardForm
      && <BoardForm
        addBoard={this.addBoard}
        editMode={this.state.editMode}
        boardToEdit={this.state.boardToEdit}
        updateBoard={this.updateBoard}
      /> }
      <div className="row">
      {this.state.boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} setEditMode={this.setEditMode} setBoardToEdit={this.setBoardToEdit} />)}
    </div>
    </div>);
  }
}

export default BoardsContainer;
