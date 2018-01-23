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
const shipTypes = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];

class Board {
  constructor(size) {
    this.board = [];
    this.id = `board${idCount++}`;
    this.ships = [];
    this.shipBounds = {};
    this.shipsSunk = 0;
    this.createBoard(size);
    this.generateShips();
    this.generateShipLocations(size);
    console.log(this.board, this.shipBounds);
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
        cell.style.backgroundColor = 'lightblue';
        cell.setAttribute('data-x', i);
        cell.setAttribute('data-y', j);
        cell.setAttribute('data-board', this.id);
        row.appendChild(cell);
      }
    }
    document.querySelector('#game').appendChild(board);
    // this.addFireEventHandler(boardId);
  }

  generateShips() {
    shipTypes.forEach(shipType => {
      this.ships.push(new Ship(shipType));
    });
  }

  generateCoordinate(size) {
    return Math.floor(Math.random() * size);
  }

  checkBounds(xCoord, yCoord, direction, shipSize, boardSize) {
    if (direction === 'right') {
      if (yCoord + shipSize - 1 >= boardSize) return false;
      if (!this.shipBounds[xCoord]) return true;
      for (let i = 0; i < shipSize; i++) {
        if (this.shipBounds[xCoord].includes(yCoord++)) {
          return false;
        }
      }
    } else if (direction === 'down') {
      if (xCoord + shipSize - 1 >= boardSize) return false;
      for (let i = 0; i < shipSize; i++) {
        if (!this.shipBounds[xCoord]) { 
          xCoord++;
          continue;
        }
        if (this.shipBounds[xCoord++].includes(yCoord)) {
          return false;
        }
      }
    }
    return true;
  }

  generateDirection() {
    return Math.random() < 0.5 ? 'right' : 'down';
  }

  generateShipLocations(boardSize) {
    // random x,y in bounds and direction (right or down)
    /*
        this.shipBounds = {};

      {
        x: [all the y's]
      }
    */

    this.ships.forEach(ship => {
      // // ship.id; ship.size
      // // cannot go out of bounds
      let check = null;

      while (!check) {
        var direction = this.generateDirection();
        var xCoord = this.generateCoordinate(boardSize);
        var yCoord = this.generateCoordinate(boardSize);
        check = this.checkBounds(xCoord, yCoord, direction, ship.size, boardSize);
      }

      for (let i = 0; i < ship.size; i++) {
        if (!this.shipBounds[xCoord]) this.shipBounds[xCoord] = [];
        this.shipBounds[xCoord].push(yCoord);
        if (direction === 'right') {
          this.board[xCoord][yCoord++] = ship.type;
        } else if (direction === 'down') {
          this.board[xCoord++][yCoord] = ship.type;
        }
      }
    });
  }
}
