class Game {
  constructor() {
    this.init();
  }

  init() {
    this.boards = {};
    this.turn = Math.random() < 0.5 ? 'Player 1' : 'Player 2';
    this.gameOver = false;
    this.initBoards();
    this.displayMessage(`${this.turn}'s Turn`, 'turn');
    this.addResetHandler();
  }

  initBoards() {
    const board1 = new Board(10);
    const board2 = new Board(10);
    this.addBoardToGame(board1);
    this.addBoardToGame(board2);
    this.fireEvent = this.fireEvent.bind(this);
    this.turn === 'Player 1'
      ? this.addFireEventHandler('board2')
      : this.addFireEventHandler('board1');
  }

  addBoardToGame(board) {
    this.boards[board.id] = board;
  }

  switchTurns() {
    if (this.turn === 'Player 1') {
      if(!this.gameOver) this.toggleFireEventHandler('board1', 'board2');
      this.turn = 'Player 2';
    } else if (this.turn === 'Player 2') {
      if (!this.gameOver) this.toggleFireEventHandler('board2', 'board1');
      this.turn = 'Player 1';
    }
    if (!this.gameOver) this.displayMessage(`${this.turn}'s Turn`, 'turn');
  }

  fireEvent(e) {
    if (e.target.matches('td')) {
      console.log(+e.target.dataset.x, +e.target.dataset.y);
      this.fire(
        +e.target.dataset.x,
        +e.target.dataset.y,
        e.target.dataset.board,
        e.target
      );
      e.stopPropagation();
    }
  }

  toggleFireEventHandler(boardToAdd, boardToRemove) {
    this.addFireEventHandler(boardToAdd);
    this.removeFireEventHandler(boardToRemove);
  }

  addFireEventHandler(boardId) {
    let board = document.querySelector(`#${boardId}`);
    board.addEventListener('click', this.fireEvent);
  }

  removeFireEventHandler(boardId) {
    let board = document.querySelector(`#${boardId}`);
    board.removeEventListener('click', this.fireEvent);
  }

  fire(x, y, boardId, cell) {
    // check if there is a ship at location
    let currentBoard = this.boards[boardId];

    if (currentBoard.board[x][y] === 'taken') {
      this.displayMessage('Already taken', 'game');
      return;
    } else if (currentBoard.board[x][y]) {
      let currentShip = currentBoard.board[x][y];
      currentBoard.board[x][y] = 'taken';
      cell.style.backgroundColor = 'red';
      // check if any of that ship is remaining
      for (let i = 0; i < currentBoard.board.length; i++) {
        let row = currentBoard.board[i];
        for (let j = 0; j < row.length; j++) {
          if (currentShip === row[j]) {
            this.switchTurns();
            this.displayMessage(`Hit ${this.turn}'s ${currentShip}`, 'game');
            return;
          }
        }
      }
      currentBoard.shipsSunk++;
      this.checkForWin(boardId);
      this.switchTurns();
      this.displayMessage(`Sink ${this.turn}'s ${currentShip}`, 'game');
    
    } else {
      currentBoard.board[x][y] = 'taken';
      cell.style.backgroundColor = 'white';
      this.switchTurns();
      this.displayMessage('Miss', 'game');
    }
  }

  checkForWin(boardId) {
    let currentBoard = this.boards[boardId];
    if (currentBoard.shipsSunk === currentBoard.ships.length) {
      this.gameOver = true;
    }
    if (this.gameOver) {
      this.displayMessage(`${this.turn} Wins`, 'turn');
      for (let boardId in this.boards) {
        this.removeFireEventHandler(boardId);
      }
    }
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
