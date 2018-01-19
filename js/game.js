/*
Example Board

[ 
  [null, s2, s2, null, null, null, null, null, null, null], 
  [null, s4, null, null, null, null, null, null, null, null], 
  [null, s4, null, null, null, null, null, null, null, null], 
  [null, s4, null, null, null, null, null, null, null, null], 
  [null, s4, null, null, null, null, null, null, null, null], 
  [null, null, null, null, s5, s5, s5, s5, s5, null], 
  [null, null, null, null, null, null, null, null, null, null], 
  [null, null, null, null, null, null, null, null, null, null], 
  [null, null, null, s3, null, null, null, null, null, null], 
  [null, null, null, s3, null, null, null, null, null, null], 
  [null, null, null, s3, null, null, null, null, null, null] 
]

*/

class Game {
  constructor() {
  }

  init() {
    const board1 = new Board(10);
    board1.createBoard(10)
    const board2 = new Board(10);
    board2.createBoard(10)
  }
}

class Board {
  constructor(size) {
    this.board = [];
  }

  createBoard(size) {
    for (let i = 0; i < size; i++) {
      let subArray = new Array(size).fill(null);
      this.board.push(subArray);
    }

    let board = document.createElement('table');
    board.setAttribute('class', 'board');
    for (let i = 0; i < size; i++) {
      let row = document.createElement('tr');
      board.appendChild(row);
      for (let j = 0; j < size; j++) {
        let cell = document.createElement('td');
        row.appendChild(cell);
      }
    }
    document.querySelector('#game').appendChild(board);
  }

  fire(x, y) {
    // check if there is a ship at location
    if (this.board[x][y]) {
      let current = this.board[x][y];
      this.board[x][y] = null;
      // check if any of that ship is remaining
      for (let i = 0; i < this.board.length; i++) {
        let row = this.board[i];
        for (let j = 0; j < row.length; i++) {
          if (current === row[j]) {
            this.displayMessage('Hit');
            return;
          }
        }
        this.displayMessage(`Sink ${current}`);
      }
    } else {
      this.displayMessage('Miss');
    }
  }

  displayMessage(message) {
    document.querySelector('#message').innerHTML = message;
  }
}

class Ship {
  constructor(size) {
    this.size = size;
  }
}

const game = new Game();
game.init();
