const CARRIER = 'carrier';
const BATTLESHIP = 'battleship';
const CRUISER = 'cruiser';
const DESTROYER = 'destroyer';
let count = 0;

class Ship {
  constructor(size) {
    this.size = size;
    this.id = null;
    this.generateId(size);
  }

  generateId(size) {
    switch (size) {
      case 5:
        this.id = `${CARRIER}${count++}`;
        break;
      case 4:
        this.id = `${BATTLESHIP}${count++}`;
        break;
      case 3:
        this.id = `${CRUISER}${count++}`;
        break;
      case 2:
        this.id = `${DESTROYER}${count++}`;
        break;
    }
  }
}
