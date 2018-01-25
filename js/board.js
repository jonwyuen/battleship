/*
Example Board

[ 
  [null, Destroyer, Destroyer, null, null, null, null, null, null, null], 
  [null, Battleship, null, null, null, null, null, null, null, null], 
  [null, Battleship, null, null, null, null, null, null, null, null], 
  [null, Battleship, null, null, null, null, null, null, null, null], 
  [null, Battleship, null, null, null, null, null, null, null, null], 
  [null, Battleship, null, null, Cruiser, Cruiser, Cruiser, null, null, null], 
  [null, null, null, null, null, null, null, null, null, null], 
  [null, null, null, null, null, null, null, null, null, null], 
  [null, null, null, Submarine, null, null, null, null, null, null], 
  [null, null, null, Submarine, null, null, null, null, null, null], 
  [null, null, null, Submarine, null, Carrier, Carrier, Carrier, Carrier, Carrier] 
]

*/

const shipTypes = new Set([
  'Carrier',
  'Battleship',
  'Cruiser',
  'Submarine',
  'Destroyer'
]);

class Board {
  constructor(size, id) {
    this.board = [];
    this.size = size;
    this.id = `board${id}`;
    this.ships = {};
    // shipBounds keeps track of x and y coordinates already taken by a ship
    // keys are x coords and values are arrays of y coords 
    this.shipBounds = {};
    this.shipsSunk = 0;
    console.log(this.id, this.board);
  }

  createBoard() {
    for (let i = 0; i < this.size; i++) {
      let subArray = new Array(this.size).fill(null);
      this.board.push(subArray);
    }
  }

  createDomBoard() {
    let board = document.createElement('table');
    board.setAttribute('id', this.id);
    for (let i = 0; i < this.size; i++) {
      let row = document.createElement('tr');
      board.appendChild(row);
      for (let j = 0; j < this.size; j++) {
        let cell = document.createElement('td');
        cell.setAttribute('data-x', i);
        cell.setAttribute('data-y', j);
        cell.setAttribute('data-board', this.id);
        row.appendChild(cell);
      }
    }
    document.querySelector('#game').appendChild(board);
  }

  generateShip(shipType) {
    this.ships[shipType] = new Ship(shipType);
  }

  generateShips() {
    shipTypes.forEach(shipType => {
      this.generateShip(shipType);
    });
  }

  addShipsToBoard() {
    for (let key in this.ships) {
      let ship = this.ships[key];
      let shipLocation = this.generateValidShipLocation(ship.size);
      let [x, y, direction] = shipLocation;
      this.addShipCoordinatesToBoard(x, y, direction, ship.size, ship.type);
    }
  }

  generateValidShipLocation(shipSize) {
    let validShipLocation = null;

    while (!validShipLocation) {
      // use var instead of let to save a few lines
      var x = this.generateCoordinate(this.size);
      var y = this.generateCoordinate(this.size);
      var direction = this.generateDirection();
      validShipLocation = this.checkShipBounds(
        x,
        y,
        direction,
        shipSize,
        this.size
      );
    }
    return [x, y, direction];
  }

  addShipCoordinatesToBoard(x, y, direction, shipSize, shipType) {
    for (let i = 0; i < shipSize; i++) {
      if (!this.shipBounds[x]) this.shipBounds[x] = [];
      this.shipBounds[x].push(y);
      if (direction === 'right') {
        this.board[x][y++] = shipType;
      } else if (direction === 'down') {
        this.board[x++][y] = shipType;
      }
    }
  }

  // makes sure ship is placed in board bounds and does not intersect with exisiting ships
  checkShipBounds(x, y, direction, shipSize, boardSize) {
    if (direction === 'right') {
      if (y + shipSize - 1 >= boardSize) return false;
      if (!this.shipBounds[x]) return true;
      for (let i = 0; i < shipSize; i++) {
        if (this.shipBounds[x].includes(y++)) {
          return false;
        }
      }
    } else if (direction === 'down') {
      if (x + shipSize - 1 >= boardSize) return false;
      for (let i = 0; i < shipSize; i++) {
        if (!this.shipBounds[x]) {
          x++;
          continue;
        }
        if (this.shipBounds[x++].includes(y)) {
          return false;
        }
      }
    }
    return true;
  }

  generateDirection() {
    return Math.random() < 0.5 ? 'right' : 'down';
  }

  generateCoordinate(boardSize) {
    return Math.floor(Math.random() * boardSize);
  }
}
