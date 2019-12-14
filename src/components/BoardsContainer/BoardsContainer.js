import React from 'react';

import authData from '../../helpers/data/authData';
import boardsData from '../../helpers/data/boardsData';

class BoardsContainer extends React.Component {
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
    return (<div>{this.state.boards.map((board) => <h6>{board.name}</h6>)}</div>);
  }
}

export default BoardsContainer;
