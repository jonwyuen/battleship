class Game {
  constructor() {
    this.init();
  }

  init() {
    this.boards = {};
    this.turn = Math.random() < 0.5 ? 'Player1' : 'Player2';
    this.gameOver = false;
    this.initBoards();
    this.displayMessage(`${this.turn}'s Turn`, 'turn');
    this.addResetHandler();
  }

  initBoards() {
    const board1 = new Board(6);
    const board2 = new Board(6);
    this.addBoardToGame(board1);
    this.addBoardToGame(board2);
    for (let boardId in this.boards) {
      this.addFireEventHandler(boardId);
    }
  }

  addBoardToGame(board) {
    this.boards[board.id] = board;
  }

  switchTurns() {
    if (this.gameOver) {
      this.displayMessage(`${this.turn} Wins`, 'turn');
      // stop the game
    } else {
      // switch turns
      if (this.turn === 'Player1') this.turn = 'Player2';
      else if (this.turn === 'Player2') this.turn = 'Player1';
      this.displayMessage(`${this.turn}'s Turn`, 'turn');
    }
  }

  fireEventListener(boardId, e) {
    if (e.target.matches('td')) {
      console.log(+e.target.dataset.x, +e.target.dataset.y);
      this.fire(+e.target.dataset.x, +e.target.dataset.y, e.target, boardId);
      e.stopPropagation();
    }
  }

  addFireEventHandler(boardId) {
    let board = document.querySelector(`#${boardId}`);
    board.addEventListener('click', this.fireEventListener.bind(this, boardId));
  }

  fire(x, y, cell, boardId) {
    // check if there is a ship at location
    let currentBoard = this.boards[boardId];

    if (currentBoard.board[x][y] === 'taken') {
      this.displayMessage('Already taken', 'game');
      return;
    } else if (currentBoard.board[x][y]) {
      let currentShip = currentBoard.board[x][y];
      currentBoard.board[x][y] = 'taken';
      cell.style.backgroundColor = 'green';
      // check if any of that ship is remaining
      for (let i = 0; i < currentBoard.board.length; i++) {
        let row = currentBoard.board[i];
        for (let j = 0; j < row.length; j++) {
          if (currentShip === row[j]) {
            this.displayMessage('Hit', 'game');
            this.switchTurns();
            return;
          }
        }
      }
      this.displayMessage(`Sink ${currentShip}`, 'game');
      currentBoard.shipsSunk++;
      this.checkForWin(boardId);
      this.switchTurns();
    } else {
      cell.style.backgroundColor = 'red';
      this.displayMessage('Miss', 'game');
      this.switchTurns();
    }
  }

  checkForWin(boardId) {
    let currentBoard = this.boards[boardId];
    if (currentBoard.shipsSunk === currentBoard.ships.length) {
      this.gameOver = true;
    }
    // return this.gameOver;
    // let flag = true;
    // for (let i = 0; i < currentBoard.length; i++) {
    //   if (!flag) break;
    //   let row = currentBoard[i];
    //   for (let j = 0; j < row.length; j++) {
    //     if (row[j] !== null && row[j] !== 'taken') {
    //       flag = false;
    //       break;
    //     }
    //   }
    // }
    // if (flag) {
    //   this.gameOver = true;
    // }
    // return flag;
  }

  addResetHandler() {
    let resetButton = document.querySelector('#reset');
    resetButton.addEventListener('click', e => {
      this.reset();
    });
  }

  displayMessage(message, type) {
    document.querySelector(`#${type}-message`).innerHTML = message;
  }

  reset() {}
}
