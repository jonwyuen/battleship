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
    this.board = [];
    this.createBoard(10);
  }

  createBoard(size) {
    for (let i = 0; i < size; i++) {
      let subArray = new Array(size).fill(null);
      this.board.push(subArray);
    }
  }

  fire(x, y) {
    // check if there is a ship at location
    if (this.board[x][y]) {
      let current = this.board[x][y];
      this.board[x][y] = null;
      // check if any of that ship is remaining
    }
  }

  displayMessage(message) {
    document.querySelector('#message').innerHTML = message;
  }
}
