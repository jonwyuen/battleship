window.onload = function() {
  const game = new Game();
  game.addEventHandler('#reset', 'click', game.reset);
}
