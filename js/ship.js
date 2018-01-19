const CARRIER = 'carrier';
const BATTLESHIP = 'battleship';
const CRUISER = 'cruiser';
const DESTROYER = 'destroyer';
const count = 0;

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
      case 4:
        this.id = `${BATTLESHIP}${count++}`;
      case 3:
        this.id = `${CRUISER}${count++}`;
      case 2:
        this.id = `${DESTROYER}${count++}`;
    }
  }
}
