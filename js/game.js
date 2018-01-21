class Game {
  constructor() {
    this.boards = [];
    this.turn = Math.random() < 0.5 ? 'player1' : 'player2';
  }

  init() {
    const board1 = new Board(10);
    const board2 = new Board(10);
    this.boards.push(board1, board2);
  }

  switchTurns() {}

  reset() {}
}
