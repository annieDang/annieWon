var game = new Phaser.Game(480, 800, Phaser.AUTO, "gameDiv")
var score =0;
var score_bar;
game.state.add("boot", bootState);
game.state.add("load", loadState);
game.state.add("menu", menuState);
game.state.add("play", playState);
// game.state.add("win", winState);

game.state.start("boot");
