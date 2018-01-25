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
    let boardId = 1;
    const board1 = new Board(10, boardId++);
    const board2 = new Board(10, boardId);
    this.addBoardToGame(board1);
    this.addBoardToGame(board2);
    for (let board in this.boards) {
      let currentBoard = this.boards[board];
      currentBoard.createBoard();
      currentBoard.createDomBoard();
      currentBoard.generateShips();
      currentBoard.generateShipLocations();
    }
    this.turn === 'Player 1'
      ? this.addEventHandler('#board2', 'click', this.fireEvent)
      : this.addEventHandler('#board1', 'click', this.fireEvent);
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

  checkForWin(boardId) {
    let currentBoard = this.boards[boardId];
    if (currentBoard.shipsSunk === Object.keys(currentBoard.ships).length) {
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

  fire(x, y, boardId, cell) {
    let currentBoard = this.boards[boardId];

    if (currentBoard.board[x][y] === 'taken') {
      this.displayMessage('Already taken', 'game');
    } else if (currentBoard.board[x][y]) {
      let currentShip = currentBoard.board[x][y];
      currentBoard.board[x][y] = 'taken';
      cell.classList.add('hit');

      // check if hit or sink
      let ship = currentBoard.ships[currentShip];
      if (++ship.hits < ship.size) {
        this.switchTurns();
        this.displayMessage(`Hit ${this.turn}'s ${currentShip}`, 'game');
      } else {
        currentBoard.shipsSunk++;
        this.checkForWin(boardId);
        this.switchTurns();
        this.displayMessage(`Sink ${this.turn}'s ${currentShip}`, 'game');
      }
    } else {
      currentBoard.board[x][y] = 'taken';
      cell.classList.add('miss');
      this.switchTurns();
      this.displayMessage('Miss', 'game');
    }
  }

  fireEvent(e) {
    if (e.target.matches('td')) {
      console.log(
        e.target.dataset.board,
        'x: ' + e.target.dataset.x,
        'y: ' + e.target.dataset.y
      );
      this.fire(
        +e.target.dataset.x,
        +e.target.dataset.y,
        e.target.dataset.board,
        e.target
      );
      e.stopPropagation();
    }
  }

  reset(e) {
    document.querySelector('.messages').classList.remove('hidden');
    this.removeChildren('#game');
    this.removeChildren('#player-labels');
    e.target.innerText = 'Reset';
    this.displayMessage('', 'game');
    this.init();
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

  displayMessage(message, type) {
    document.querySelector(`#${type}-message`).innerText = message;
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

  removeChildren(selector) {
    let element = document.querySelector(`${selector}`);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}
