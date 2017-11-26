var menuState ={
  create: function(){
    game.add.sprite(0, 0, 'menu_bg');

    var button1 = game.add.sprite(20,game.world.centerY,"start_btn");
    button1.scale.setTo(0.3, 0.3);

    button2 = game.add.sprite(20,game.world.centerY + 120,"rank_btn");
    button2.scale.setTo(0.3, 0.3);

    button3 = game.add.sprite(20,game.world.centerY + 240,"help_btn");
    button3.scale.setTo(0.3, 0.3);

    button1.inputEnabled = true;
    button1.events.onInputDown.add(this.start, this);

  },
  start: function(){
    game.state.start('play');
  }
};
