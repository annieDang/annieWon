//Game play screen
CakeCity.PlayState = function(game){
  CakeCity.forks = null;
  CakeCity.cakes = null;

  CakeCity.score_bar = null;
  CakeCity.score_text = null;
  CakeCity.score = 10;
};
CakeCity.PlayState.prototype ={
  create: function(){
    //bg
    game.add.sprite(0, 0, 'playing_bg');

    //score
    var score_bar = game.add.sprite(0, 0, 'score_bar');
    score_bar.scale.setTo(0.25, 0.25);
    var _fontStyle = { font: "30px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
    CakeCity.score_text = game.add.text(130, 60, "Fork X " + CakeCity.score, _fontStyle);

    //fake
    game.add.sprite(10, 10, 'cake1');

    CakeCity.InGame.addFork();

    CakeCity.cakes = game.add.group();
    CakeCity.cakes.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 10; i++)
    {
      var cake_type = Math.floor((Math.random() * 7) + 1)
      var cake = CakeCity.cakes.create(game.world.randomX, Math.random() * 500, 'cake' +cake_type);
      cake.body.collideWorldBounds = true;
      cake.body.bounce.setTo(0.8, 0.8);
      cake.body.velocity.setTo(10 + Math.random() * 300, 10 + Math.random() * 200);
      // cake.inputEnabled = true;
      // cake.input.useHandCursor = true;
      // cake.events.onInputDown.add(this.collectCake, this)
    }
  },
  update: function(){
    CakeCity.fork.rotation = game.physics.arcade.angleToPointer(CakeCity.fork);
    game.physics.arcade.overlap(CakeCity.fork, CakeCity.cakes, CakeCity.InGame.removeCake, null, this);
    if (game.input.activePointer.isDown)
    {
      //  Boom!
      CakeCity.InGame.fire();
    }
  }
};

CakeCity.InGame = {
  fire: function(){
      CakeCity.fork.rotation = game.physics.arcade.moveToPointer(CakeCity.fork, 300, game.input.activePointer, 300);
  },
  spawnCake: function(){

  },
  removeCake: function(folk, cake){
    if(CakeCity.fork.x == game.world.width/2 - 20 && CakeCity.fork.y == 800 -50){
      return;
    }
    // Removes the cake from the screen
    cake.kill();
    folk.kill();
    //  Add and update the score
    CakeCity.score -= 1;
    CakeCity.score_text.text = 'Fork X ' + CakeCity.score;

    if(CakeCity.score == 0){
      CakeCity.score = 10;
      if(CakeCity.cakes.countLiving() == 0){
        game.state.start('win');
      }else{
        game.state.start('lost');
      }

    }
    CakeCity.InGame.addFork();
  },
  addFork: function(){
    CakeCity.fork = game.add.sprite(game.world.width/2 - 20, 800 -50, 'fork');
    CakeCity.fork.anchor.setTo(0.5, 0.5)
    game.physics.enable(CakeCity.fork, Phaser.Physics.ARCADE);
    CakeCity.fork.body.allowRotation = false;
  }
};
