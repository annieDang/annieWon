var loadState ={
  preload: function(){
    var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
    //background of views
    game.load.image('menu_bg', 'assets/background/mainbg.png');
    game.load.image('playing_bg', 'assets/background/ G_BG_blur.png');


    //Main menu buttons
    game.load.image('start_btn','assets/UI/st-01.png');
    game.load.image('rank_btn','assets/UI/btn2-01.png');
    game.load.image('help_btn','assets/UI/btn3-01-01.png');


    //for playing views
    game.load.image('score_bar','assets/UI/1-01.png');
    game.load.image('fork','assets/fork/fork1.png');
    game.load.image('cake1','assets/cakes/cake1_1.png');
    game.load.image('cake2','assets/cakes/cake1_2.png');
    game.load.image('cake3','assets/cakes/cheese1.png');
    game.load.image('cake4','assets/cakes/cheese2.png');
    game.load.image('cake5','assets/cakes/cheese2.png');
    game.load.image('cake6','assets/cakes/와플.png');
    game.load.image('cake7','assets/cakes/와플2 copy.png');
  },
  create: function(){

    game.state.start('menu');
  }

};
