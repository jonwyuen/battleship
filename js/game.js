class Game {
  constructor() {
    this.turn = Math.random() < .5 ? "Player1" : "Player2"
  }

  init() {
    const board1 = new Board(10);
    board1.createBoard(10);
    const board2 = new Board(10);
    board2.createBoard(10);
  }

  switchTurns() {

  }

  reset() {}
}
