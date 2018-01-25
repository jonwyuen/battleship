const expect = chai.expect;

describe('Board', () => {
  let size = 10;
  let id = 1;
  const testBoard = new Board(size, id);
  describe('generates a board instance', () => {
    it('returns an instance of a board as an object', () => {
      expect(testBoard).to.be.an('object');
      expect(testBoard).to.be.instanceOf(Board);
    });
    it('has an id property that is a string', () => {
      expect(testBoard.id).to.be.a('string');
      expect(testBoard.id).to.equal(`board${id}`);
    });
    it('has a board property initialized as an empty array', () => {
      expect(testBoard.board).to.be.an('array');
      expect(testBoard.board).to.deep.equal([]);
    });
    it('has a ships property initialized as an empty object', () => {
      expect(testBoard.ships).to.be.an('object');
      expect(testBoard.ships).to.deep.equal({});
    });
    it('has a shipBounds property initialized as an empty object', () => {
      expect(testBoard.shipBounds).to.be.an('object');
      expect(testBoard.shipBounds).to.deep.equal({});
    });
    it('has a shipsSunk property initialzed to 0', () => {
      expect(testBoard.shipsSunk).to.be.a('number');
      expect(testBoard.shipsSunk).to.equal(0);
    });
  });
  describe('#createBoard()', () => {
    it('sets board property as an array of arrays according to size property with values of null', () => {
      testBoard.createBoard();
      testBoard.board.forEach(row => {
        expect(row).to.be.an('array');
        expect(row.length).to.equal(size);
        row.forEach(value => {
          expect(value).to.equal(null);
        });
      });
    });
  });
  describe('#generateShip()', () => {
    it('sets ships property with key as ship type and value as ship instance', () => {
      let shipType = 'Battleship';
      testBoard.generateShip(shipType);
      expect(testBoard.ships).to.have.key(['Battleship']);
      expect(testBoard.ships['Battleship']).to.be.instanceOf(Ship);
    });
  });
  describe('#generateShips()', () => {
    it('sets all ships property as an object with keys as each ship type and values as ship instance', () => {
      testBoard.generateShips();
      let expectedShips = {
        Carrier: new Ship('Carrier'),
        Battleship: new Ship('Battleship'),
        Cruiser: new Ship('Cruiser'),
        Submarine: new Ship('Submarine'),
        Destroyer: new Ship('Destroyer')
      };
      expect(Object.keys(testBoard.ships).length).to.equal(5);
      expect(testBoard.ships).to.deep.equal(expectedShips);
    });
  });
  describe('#generateShipLocations()', () => {
    it('sets each ship on the board property', () => {
      testBoard.generateShipLocations();
      let carrierCount = 0,
        battleshipCount = 0,
        cruiserCount = 0,
        submarineCount = 0,
        destroyerCount = 0;
      testBoard.board.forEach(row => {
        row.forEach(value => {
          switch (value) {
            case CARRIER:
              carrierCount++;
              break;
            case BATTLESHIP:
              battleshipCount++;
              break;
            case CRUISER:
              cruiserCount++;
              break;
            case SUBMARINE:
              submarineCount++;
              break;
            case DESTROYER:
              destroyerCount++;
              break;
          }
        })
      })
      expect(carrierCount).to.equal(5);
      expect(battleshipCount).to.equal(4);
      expect(cruiserCount).to.equal(3);
      expect(submarineCount).to.equal(3);
      expect(destroyerCount).to.equal(2);
    });
  });
  describe('#addShipCoordinatesToBoard()', () => {
    it('sets ships property as an object with keys as each ship type and values as ship instance', () => {
      testBoard.addShipCoordinatesToBoard(2, 3, 'right', 3, 'Submarine');
      expect(testBoard.board[2][3], testBoard.board[2][4], testBoard.board[2][5]).to.equal('Submarine');
    });
  });
  describe('#generateValidShipLocation()', () => {
    it('returns an array with random valid starting coordinates and direction of ship', () => {
      expect(testBoard.generateValidShipLocation(4)).to.be.an('array');
      expect(testBoard.generateValidShipLocation(4).length).to.equal(3);
    });
  });
  describe('#checkShipBounds()', () => {
    it('returns a boolean', () => {
      expect(testBoard.checkShipBounds(1, 1, 'down', 2, testBoard.size)).to.be.a('boolean');
    });
    it('checks shipBounds property to see if coordinates entered generates a valid ship location', () => {
      const testBoard2 = new Board(10, 2);
      expect(testBoard2.checkShipBounds(0, 0, 'right', 3, testBoard2.size)).to.be.true;
      testBoard2.shipBounds[0] = [];
      testBoard2.shipBounds[0].push(0,1,2);
      expect(testBoard2.checkShipBounds(0, 0, 'right', 3, testBoard2.size)).to.be.false;
    });
  });
});

describe('Ship', () => {
  const testShipType = 'Carrier';
  const testShip = new Ship(testShipType);
  describe('generates a ship instance as an object', () => {
    it('returns an instance of a ship', () => {
      expect(testShip).to.be.an('object');
      expect(testShip).to.be.instanceOf(Ship);
    });
    it('has a type property equal to type parameter', () => {
      expect(testShip.type).to.be.a('string');
      expect(testShip.type).to.equal(testShipType);
    });
    it('has a hits property initialized to 0', () => {
      expect(testShip.hits).to.be.a('number');
      expect(testShip.hits).to.equal(0);
    });
  });
  describe('#generateShipSize()', () => {
    it('sets size property of a ship as a number according to ship type', () => {
      expect(testShip.size).to.be.a('number');
      expect(testShip.size).to.equal(5);
    });
  });
});
