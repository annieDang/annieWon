//Menu screen
CakeCity.LostState = function(game){};
CakeCity.LostState.prototype ={
  create: function(){
    game.add.sprite(0, 0, 'playing_bg');
    game.add.text(game.world.centerX, game.world.centerY, 'You lost :( !', {font: '30px Courier', fill: '#ffffff'});
    var playButton = game.add.text(game.world.centerX, game.world.centerY - 100, 'Play Again', {font: '30px Courier', fill: '#ffffff'});
    playButton.inputEnabled = true;
    playButton.events.onInputDown.add(this.playeAgain, this);
  },
  playeAgain: function(){
    game.state.start('play');
  }
};
