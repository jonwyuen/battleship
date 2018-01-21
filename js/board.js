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

class Board {
  constructor(size) {
    this.board = [];
  }

  createBoard(size) {
    for (let i = 0; i < size; i++) {
      let subArray = new Array(size).fill(null);
      this.board.push(subArray);
    }
    this.createDomBoard(size);
  }

  createDomBoard(size) {
    let board = document.createElement('table');
    board.setAttribute('class', 'board');
    for (let i = 0; i < size; i++) {
      let row = document.createElement('tr');
      board.appendChild(row);
      for (let j = 0; j < size; j++) {
        let cell = document.createElement('td');
        cell.setAttribute('data-x', i);
        cell.setAttribute('data-y', j);
        row.appendChild(cell);
      }
    }
    document.querySelector('#game').appendChild(board);
  }

  generateShips() {
    this.ships = [];
    for (let i = 2; i < 6; i++) {
      this.ships.push(new Ship(i));
    }
  }

  generateCoordinate(size) {
    return Math.floor(Math.random() * size + 1);
  }

  // generateLocation(size) {
  //   let randomX = this.generateCoordinate(size);
  //   let randomY = this.generateCoordinate(size);
  //   return this.board[randomX][randomY];
  // }

  checkBounds() {
    
  }

  generateShipLocations(size) {
    // random x,y in bounds and direction (right or down)
    this.bounds = {};
    /*
      {
        x: [all the y's]
      }
    */

    this.ships.forEach(ship => {
      let direction = Math.random() < 0.5 ? 'right' : 'down';
      // ship.id; ship.size
      // cannot go out of bounds

      let xCoord = this.generateCoordinate(size);
      let yCoord = this.generateCoordinate(size);
      let location = this.board[xCoord][yCoord];

      while (location) {
        // generate random location until find one thats null
        xCoord = this.generateCoordinate(size);
        yCoord = this.generateCoordinate(size);
        location = this.board[xCoord][yCoord];
      }
      // check if it intersects with another ship
      // make sure all ship locations are null

      this.board[xCoord][yCoord] = ship.id;

      for (let i = 0; i < ship.size; i++) {
        if (direction === 'right') {
          
          this.board[xCoord][++yCoord] = ship.id;
        } else {
          this.board[++xCoord][yCoord] = ship.id;
        }
      }
    });
  }

  handleFireEvent() {
    let board = document.querySelectorAll('.board');
    board.forEach(board => {
      board.addEventListener('click', e => {
        if (e.target.matches('td')) {
          this.fire(+e.target.dataset.x, +e.target.dataset.y);
          e.stopPropagation();
        }
      });
    });
  }

  fire(x, y) {
    let checkForWin = this.checkForWin();
    if (checkForWin) return;
    // check if there is a ship at location
    if (this.board[x][y] === 'taken') {
      this.displayMessage('Already taken');
      return;
    } else if (this.board[x][y]) {
      let current = this.board[x][y];
      this.board[x][y] = 'taken';
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

  checkForWin() {
    let flag = true;
    for (let i = 0; i < this.board.length; i++) {
      if (!flag) break;
      let row = this.board[i];
      for (let j = 0; j < row.length; i++) {
        if (row[j] !== null || row[j] !== 'taken' ) {
          flag = false;
          break;
        }
      }
    }
    if (flag) this.displayMessage('Win');
    return flag;
  }

  displayMessage(message) {
    document.querySelector('#game-message').innerHTML = message;
  }
}
