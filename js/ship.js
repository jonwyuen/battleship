const CARRIER = 'Carrier';
const BATTLESHIP = 'Battleship';
const CRUISER = 'Cruiser';
const SUBMARINE = 'Submarine';
const DESTROYER = 'Destroyer';
let count = 0;

// class Ship {
//   constructor(size) {
//     this.size = size;
//     this.id = null;
//     this.generateId(size);
//   }

//   generateId(size) {
//     switch (size) {
//       case 5:
//         this.id = `${CARRIER}${count++}`;
//         break;
//       case 4:
//         this.id = `${BATTLESHIP}${count++}`;
//         break;
//       case 3:
//         this.id = `${CRUISER}${count++}`;
//         break;
//       case 2:
//         this.id = `${DESTROYER}${count++}`;
//         break;
//     }
//   }
// }

class Ship {
  constructor(type) {
    this.type = type
    this.size = null;
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
