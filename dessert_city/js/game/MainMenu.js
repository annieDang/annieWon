//Menu screen
CakeCity.MenuState = function(game){};
CakeCity.MenuState.prototype ={
  create: function(){
    var mainBg = game.add.sprite(0, 0, 'menu_bg');
    mainBg.width = game.width;
    mainBg.height = game.height;

    var button1 = game.add.sprite(10,game.world.centerY,"start_btn");
    button1.scale.setTo(0.5, 0.5);

    button2 = game.add.sprite(10,game.world.centerY + 150,"rank_btn");
    button2.scale.setTo(0.5, 0.5);

    button3 = game.add.sprite(10,game.world.centerY + 300,"help_btn");
    button3.scale.setTo(0.5, 0.5);

    button1.inputEnabled = true;
    button1.events.onInputDown.add(this.start, this);

  },
  start: function(){
    game.state.start('play');
  }
};
