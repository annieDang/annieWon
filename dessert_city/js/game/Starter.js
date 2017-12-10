//Started point
// Math.max(window.innerWidth, document.documentElement.clientWidth)
// Math.max(window.innerHeight, document.documentElement.clientHeight)
var game = new Phaser.Game(Math.max(window.innerWidth, document.documentElement.clientWidth),window.innerHeight, document.documentElement.clientHeight, Phaser.AUTO, "gameDiv");
game.state.add("boot", CakeCity.BootState);
game.state.add("load", CakeCity.LoadState);
game.state.add("win", CakeCity.WinState);
game.state.add("lost", CakeCity.LostState);
game.state.add("menu", CakeCity.MenuState);
game.state.add("play", CakeCity.PlayState);


game.state.start("boot");
