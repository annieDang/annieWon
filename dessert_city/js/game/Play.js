var playState ={
  create: function(){
    //bg
    game.add.sprite(0, 0, 'playing_bg');

    //score
    var score_bar = game.add.sprite(0, 0, 'score_bar');
    score_bar.scale.setTo(0.25, 0.25);
    var _fontStyle = { font: "30px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
    var score_text = game.add.text(130, 60, "X " + score, _fontStyle);

    //fake
    game.add.sprite(10, 10, 'cake1');

    var fork = game.add.sprite(game.world.width/2 - 20, 800 -100, 'fork');

    //  Finally some cake to collect
    var cakes = game.add.group();
    cakes.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 10; i++)
    {
        var cake_type = Math.floor((Math.random() * 7) + 1)
        var cake = cakes.create(game.world.randomX, Math.random() * 500, 'cake' +cake_type);
        cake.body.collideWorldBounds = true;
        cake.body.bounce.setTo(0.8, 0.8);
        cake.body.velocity.setTo(10 + Math.random() * 300, 10 + Math.random() * 200);


        cake.inputEnabled = true;
        cake.input.useHandCursor = true;
        cake.events.onInputDown.add(this.collectCake, this);
    }
  },
  update: function(){

  },
  spawnCandy : function(){

  },
  collectCake: function(cake) {

      // Removes the star from the screen
      cake.kill();

      //  Add and update the score
      score += 1;
      score_text.text = 'X ' + score;

  }
};
