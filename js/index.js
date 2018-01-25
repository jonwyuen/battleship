window.onload = () => {
  const game = new Game();
  game.addEventHandler('#reset', 'click', game.reset);
}
