const CARRIER = 'Carrier';
const BATTLESHIP = 'Battleship';
const CRUISER = 'Cruiser';
const SUBMARINE = 'Submarine';
const DESTROYER = 'Destroyer';

class Ship {
  constructor(type) {
    this.type = type
    this.size = null;
    this.hits = 0;
    this.generateShipSize(type);
  }

  generateShipSize(type) {
    switch (type) {
      case CARRIER:
        this.size = 5;
        break;
      case BATTLESHIP:
        this.size = 4;
        break;
      case CRUISER:
        this.size = 3;
        break;
      case SUBMARINE:
        this.size = 3;
        break;
      case DESTROYER:
        this.size = 2;
        break;
    }
  }
}
