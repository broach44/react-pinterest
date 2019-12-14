import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';
import boardsData from '../../helpers/data/boardsData';

import Board from '../Board/Board';

class BoardsContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func,
  }

  state = {
    boards: [],
  }

  componentDidMount() {
    boardsData.getBoardsByUid(authData.getUid())
      .then((boards) => {
        this.setState({ boards });
      })
      .catch((errfromBoardContainer) => console.error(errfromBoardContainer));
  }

  render() {
    const { setSingleBoard } = this.props;
    return (
    <div>
      {this.state.boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} />)}
    </div>);
  }
}

export default BoardsContainer;
