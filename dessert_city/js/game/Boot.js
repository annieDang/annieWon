//Loading screen
var CakeCity = {}
CakeCity.BootState = function(game){};
CakeCity.BootState.prototype = {
    create: function(){
      game.physics.startSystem(Phaser.Physics.ARCADE);

      game.state.start("load");
    }
};
