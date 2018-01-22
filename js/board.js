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
let idCount = 1;

class Board {
  constructor(size) {
    this.board = [];
    this.id = `board${idCount++}`;
    this.ships = [];
    this.shipBounds = { x: {}, y: {} };
    this.shipsSunk = 0;
    this.createBoard(size);
    this.generateShips()
    this.generateShipLocations(size);
    console.log(this.board, this.shipBounds)
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
    board.setAttribute('id', this.id);
    // board.setAttribute('class', 'board');
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
    // this.addFireEventHandler(boardId);
  }

  generateShips() {
    for (let i = 2; i < 6; i++) {
      let ship = new Ship(i)
      this.ships.push(ship);
    }
  }

  generateCoordinate(size) {
    return Math.floor(Math.random() * size);
  }

  // generateLocation(size) {
  //   let randomX = this.generateCoordinate(size);
  //   let randomY = this.generateCoordinate(size);
  //   return this.board[randomX][randomY];
  // }

  checkBounds(xCoord, yCoord, direction, shipSize, boardSize) {
    if (direction === 'right') {
      if (yCoord + shipSize - 1 >= boardSize) return false;
      if (!this.shipBounds.x[xCoord]) return true;
      for (let i = 0; i < shipSize; i++) {
        if (this.shipBounds.x[xCoord].includes(yCoord++)) {
          return false;
        }
      }
    } else if (direction === 'down') {
      if (xCoord + shipSize - 1 >= boardSize) return false;
      if (!this.shipBounds.y[yCoord]) return true;
      for (let i = 0; i < shipSize; i++) {
        if (this.shipBounds.y[yCoord].includes(xCoord++)) {
          return false;
        }
      }
    }
    return true;
  }

  generateShipLocations(size) {
    // random x,y in bounds and direction (right or down)
    /*
        this.shipBounds = {};

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

      let check = this.checkBounds(xCoord, yCoord, direction, ship.size, size);

      while (!check) {
        direction = Math.random() < 0.5 ? 'right' : 'down';
        xCoord = this.generateCoordinate(size);
        yCoord = this.generateCoordinate(size);
        check = this.checkBounds(xCoord, yCoord, direction, ship.size, size);
      }

      for (let i = 0; i < ship.size; i++) {
        if (direction === 'right') {
          if (!this.shipBounds.x[xCoord]) this.shipBounds.x[xCoord] = [];
          if (!this.shipBounds.y[yCoord]) this.shipBounds.y[yCoord] = [];
          this.shipBounds.x[xCoord].push(yCoord);
          this.shipBounds.y[yCoord].push(xCoord);
          console.log(xCoord, yCoord);
          this.board[xCoord][yCoord++] = ship.id;
        } else if (direction === 'down') {
          if (!this.shipBounds.y[yCoord]) this.shipBounds.y[yCoord] = [];
          if (!this.shipBounds.x[xCoord]) this.shipBounds.x[xCoord] = [];
          this.shipBounds.y[yCoord].push(xCoord);
          this.shipBounds.x[xCoord].push(yCoord);
          console.log(xCoord, yCoord)
          this.board[xCoord++][yCoord] = ship.id;
        }
      }
    });
  }

  // addFireEventHandler(boardId) {
  //   let board = document.querySelector(`#${boardId}`);
  //   board.addEventListener('click', e => {
  //     if (e.target.matches('td')) {
  //       console.log(+e.target.dataset.x, +e.target.dataset.y);
  //       this.fire(+e.target.dataset.x, +e.target.dataset.y, e.target);
  //       e.stopPropagation();
  //     }
  //   });
  // }

  // fire(x, y, cell) {
  //   // let checkForWin = this.checkForWin();
  //   // if (checkForWin) return;
  //   // check if there is a ship at location
  //   if (this.board[x][y] === 'taken') {
  //     this.displayMessage('Already taken');
  //     console.log(this.board)
  //     return;
  //   } else if (this.board[x][y]) {
  //     let current = this.board[x][y];
  //     this.board[x][y] = 'taken';
  //     cell.style.backgroundColor = 'green';
  //     // check if any of that ship is remaining
  //     for (let i = 0; i < this.board.length; i++) {
  //       let row = this.board[i];
  //       for (let j = 0; j < row.length; j++) {
  //         if (current === row[j]) {
  //           this.displayMessage('Hit');
  //           return;
  //         }
  //       }
  //       this.displayMessage(`Sink ${current}`);
  //       this.shipsSunk++;
  //     }
  //   } else {
  //     cell.style.backgroundColor = 'red'
  //     this.displayMessage('Miss');
  //   }
  // }

  // checkForWin() {
  //   let flag = true;
  //   for (let i = 0; i < this.board.length; i++) {
  //     if (!flag) break;
  //     let row = this.board[i];
  //     for (let j = 0; j < row.length; j++) {
  //       if (row[j] !== null && row[j] !== 'taken') {
  //         flag = false;
  //         break;
  //       }
  //     }
  //   }
  //   console.log(flag)
  //   if (flag) this.displayMessage('Win');
  //   return flag;
  // }

  // displayMessage(message) {
  //   document.querySelector('#game-message').innerHTML = message;
  // }
}
