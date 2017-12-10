//Game play screen
CakeCity.PlayState = function(game){
  CakeCity.fork = null;
  CakeCity.cakes = null;
  CakeCity.bullets = null;
  CakeCity.explosions = null;
  CakeCity.fireRate = 100;
  CakeCity.nextFire = 0;

  CakeCity.score_bar = null;
  CakeCity.score_text = null;
  CakeCity.score = 10;


  CakeCity.timer;
  CakeCity.timerEvent;
  CakeCity.timer_text;
};
CakeCity.PlayState.prototype ={
  create: function(){
    //bg
    var bg = game.add.sprite(0, 0, 'playing_bg');
    bg.width = game.width;
    bg.height = game.height;

    //score
    var score_bar = game.add.sprite(0, 0, 'score_bar');
    score_bar.scale.setTo(0.4, 0.4);
    var _fontStyle = { font: "30px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
    CakeCity.score_text = game.add.text(130, 60, "Fork X " + CakeCity.score, _fontStyle);


    CakeCity.timer = game.time.create();
    CakeCity.timerEvent = CakeCity.timer.add(/*Phaser.Timer.MINUTE * 1 + */Phaser.Timer.SECOND * 30, this.endTimer, this);
    CakeCity.timer.start();

    CakeCity.timer_text = game.add.text(game.world.width - 200, 10, "0", _fontStyle);
    //fake
    game.add.sprite(10, 10, 'cake1');


    CakeCity.fork = game.add.sprite(game.width/2 - 20, game.height -50, 'fork');
    CakeCity.fork.anchor.setTo(0.5, 0.5)
    game.physics.enable(CakeCity.fork, Phaser.Physics.ARCADE);
    CakeCity.fork.body.allowRotation = false;

    CakeCity.bullets = game.add.group();
    CakeCity.bullets.enableBody = true;
    CakeCity.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    CakeCity.bullets.createMultiple(10, 'bullet', 0, false);
    CakeCity.bullets.setAll('anchor.x', 0.5);
    CakeCity.bullets.setAll('anchor.y', 0.5);
    CakeCity.bullets.setAll('outOfBoundsKill', true);
    CakeCity.bullets.setAll('checkWorldBounds', true);

    //  Explosion pool
    CakeCity.explosions = game.add.group();

    for (var i = 0; i < 10; i++)
    {
      var explosionAnimation = CakeCity.explosions.create(0, 0, 'kaboom', [0], false);
      explosionAnimation.anchor.setTo(0.5, 0.5);
      explosionAnimation.animations.add('kaboom');
    }

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
    game.physics.arcade.overlap(CakeCity.bullets, CakeCity.cakes, CakeCity.InGame.removeCake, null, this);
    if (game.input.activePointer.isDown)
    {
      //  Boom!
      CakeCity.InGame.fire();
    }
  },
  render: function(){
    if (CakeCity.timer.running) {
      CakeCity.timer_text.text = this.formatTime(Math.round((CakeCity.timerEvent.delay - CakeCity.timer.ms) / 1000));
    }
    else {
      game.state.start('lost');
    }
  },
  endTimer: function() {
    // Stop the timer when the delayed event triggers
    CakeCity.timer.stop();
  },
  formatTime: function(s) {
    // Convert seconds (s) to a nicely formatted and padded time string
    var minutes = "0" + Math.floor(s / 60);
    var seconds = "0" + (s - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
  }
};

CakeCity.InGame = {
  fire: function(){
    if (game.time.now > CakeCity.nextFire && CakeCity.bullets.countDead() > 0)
    {
      CakeCity.nextFire = game.time.now + CakeCity.fireRate;

      var bullet = CakeCity.bullets.getFirstExists(false);

      bullet.reset(CakeCity.fork.x, CakeCity.fork.y);

      bullet.rotation = game.physics.arcade.moveToPointer(bullet, 1000, game.input.activePointer, 500);
    }
  },
  spawnCake: function(){

  },
  removeCake: function(bullet, cake){
    // Removes the cake from the screen
    cake.kill();
    bullet.kill();
    var explosionAnimation = CakeCity.explosions.getFirstExists(false);
    explosionAnimation.reset(cake.x, cake.y);
    explosionAnimation.play('kaboom', 30, false, true);
    CakeCity.InGame.updateGameState();

  },
  updateGameState: function(folk){
    // folk.kill();
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
  }
};
