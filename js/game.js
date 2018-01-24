class Game {
  constructor() {
    this.fireEvent = this.fireEvent.bind(this);
    this.reset = this.reset.bind(this);
  }

  init() {
    this.boards = {};
    this.turn = Math.random() < 0.5 ? 'Player 1' : 'Player 2';
    this.gameOver = false;
    this.createPlayerLabels();
    this.initBoards();
    this.displayMessage(`${this.turn}'s Turn`, 'turn');
  }

  initBoards() {
    this.boardId = 1;
    const board1 = new Board(10, this.boardId++);
    const board2 = new Board(10, this.boardId);
    this.addBoardToGame(board1);
    this.addBoardToGame(board2);
    this.turn === 'Player 1'
      ? this.addEventHandler('#board2', 'click', this.fireEvent)
      : this.addEventHandler('#board1', 'click', this.fireEvent);
  }

  addBoardToGame(board) {
    this.boards[board.id] = board;
  }

  createPlayerLabels() {
    let playerLabels = document.querySelector('#player-labels');
    for (let i = 1; i < 3; i++) {
      let playerLabel = document.createElement('span');
      playerLabel.innerText = `Player ${i}`;
      playerLabels.appendChild(playerLabel);
    }
  }

  removeChildren(selector) {
    let element = document.querySelector(`${selector}`);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  switchTurns() {
    if (this.turn === 'Player 1') {
      if (!this.gameOver)
        this.toggleEventHandler('#board1', '#board2', 'click', this.fireEvent);
      this.turn = 'Player 2';
    } else if (this.turn === 'Player 2') {
      if (!this.gameOver)
        this.toggleEventHandler('#board2', '#board1', 'click', this.fireEvent);
      this.turn = 'Player 1';
    }
    if (!this.gameOver) this.displayMessage(`${this.turn}'s Turn`, 'turn');
  }

  fireEvent(e) {
    if (e.target.matches('td')) {
      console.log("x: "+e.target.dataset.x, "y: "+e.target.dataset.y, e.target.dataset.board);
      this.fire(
        +e.target.dataset.x,
        +e.target.dataset.y,
        e.target.dataset.board,
        e.target
      );
      e.stopPropagation();
    }
  }

  addEventHandler(selector, type, callback) {
    document.querySelector(`${selector}`).addEventListener(`${type}`, callback);
  }

  removeEventHandler(selector, type, callback) {
    document
      .querySelector(`${selector}`)
      .removeEventListener(`${type}`, callback);
  }

  toggleEventHandler(selectorToAdd, selectorToRemove, type, callback) {
    this.addEventHandler(selectorToAdd, type, callback);
    this.removeEventHandler(selectorToRemove, type, callback);
  }

  fire(x, y, boardId, cell) {
    let currentBoard = this.boards[boardId];

    if (currentBoard.board[x][y] === 'taken') {
      this.displayMessage('Already taken', 'game');
      return;
    } else if (currentBoard.board[x][y]) {
      let currentShip = currentBoard.board[x][y];
      currentBoard.board[x][y] = 'taken';
      cell.style.backgroundColor = '#CC0000';
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
      document.querySelector('#reset').innerText = 'New Game';
      this.displayMessage(`${this.turn} Wins`, 'turn');

      for (let boardId in this.boards) {
        this.removeEventHandler(`#${boardId}`, 'click', this.fireEvent);
      }
    }
  }

  displayMessage(message, type) {
    document.querySelector(`#${type}-message`).innerText = message;
  }

  reset(e) {
    document.querySelector('.messages').classList.remove('hidden');
    this.removeChildren('#game');
    this.removeChildren('#player-labels');
    e.target.innerText = 'Reset';
    this.displayMessage('', 'game');
    this.init();
  }
}
