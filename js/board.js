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
const shipTypes = [
  'Carrier',
  'Battleship',
  'Cruiser',
  'Submarine',
  'Destroyer'
];

class Board {
  constructor(size, id) {
    this.board = [];
    this.id = `board${id}`;
    this.ships = [];
    this.shipBounds = {};
    this.shipsSunk = 0;
    this.createBoard(size);
    this.generateShips(size);
    console.log(this.id, this.board);
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
    for (let i = 0; i < size; i++) {
      let row = document.createElement('tr');
      board.appendChild(row);
      for (let j = 0; j < size; j++) {
        let cell = document.createElement('td');
        cell.setAttribute('data-x', i);
        cell.setAttribute('data-y', j);
        cell.setAttribute('data-board', this.id);
        row.appendChild(cell);
      }
    }
    document.querySelector('#game').appendChild(board);
  }

  generateShips(boardSize) {
    shipTypes.forEach(shipType => {
      this.ships.push(new Ship(shipType));
    });
    this.generateShipLocations(boardSize);
  }

  generateCoordinate(boardSize) {
    return Math.floor(Math.random() * boardSize);
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
        this.shipBounds = {
          x: [all the y's]
        }
    */

    this.ships.forEach(ship => {
      // // cannot go out of bounds
      let check = null;

      while (!check) {
        var direction = this.generateDirection();
        var xCoord = this.generateCoordinate(boardSize);
        var yCoord = this.generateCoordinate(boardSize);
        check = this.checkBounds(
          xCoord,
          yCoord,
          direction,
          ship.size,
          boardSize
        );
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
