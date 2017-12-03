//Menu screen
CakeCity.WinState = function(game){};
CakeCity.WinState.prototype ={
  create: function(){
    game.add.sprite(0, 0, 'playing_bg');
    game.add.text(game.world.centerX, game.world.centerY, 'You win :)!', {font: '30px Courier', fill: '#000000'});
    var menuButton = game.add.text(game.world.centerX, game.world.centerY - 100, 'Menu', {font: '30px Courier', fill: '#000000'});
    var playButton = game.add.text(game.world.centerX, game.world.centerY - 200, 'Play Again', {font: '30px Courier', fill: '#000000'});
    menuButton.inputEnabled = true;
    menuButton.events.onInputDown.add(this.gotoMenu, this);
    playButton.inputEnabled = true;
    playButton.events.onInputDown.add(this.playeAgain, this);
  },
  gotoMenu: function(){
    game.state.start('menu');
  },
  playeAgain: function(){
    game.state.start('play');
  }
};
