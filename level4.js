    var level4 = function (game) {

        this.map = null;
        this.layer = null;
        
        //we will move boxes
        this.box2 = null;  
        
        //arrow keys
        this.cursors = null;
    };

    level4.prototype = {

        init: function () {
        },

        preload: function () {

            //this.load.tilemap('map', 'maze.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap('map', 'assets/level4.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('tiles', 'assets/map.png');
            this.load.spritesheet('box', 'assets/box.png', tileSize, tileSize);
            
        },

        create: function () {
	        
	        timerlevel4 = game.time.events;
			timerlevel4.add(Phaser.Timer.SECOND * 10, countDownTimerLevel4, this);

            this.map = this.add.tilemap('map');  
            this.map.addTilesetImage('tiles', 'tiles');
            this.layer = this.map.createLayer('layer1');
            

            this.cursors = game.input.keyboard.createCursorKeys();
            this.cursors.up.onDown.add(this.pressedUp, this);
            this.cursors.right.onDown.add(this.pressedRight, this);
            this.cursors.down.onDown.add(this.pressedDown, this);
            this.cursors.left.onDown.add(this.pressedLeft, this);

            //starting position of the boxes 
            this.box1 = this.game.add.sprite(tileSize * 2, tileSize * 3, 'box');
            this.box2 = this.game.add.sprite(tileSize * 3, tileSize * 2, 'box');

            //  Text
            moveTextlevel4 = "Moves: 0";		
		    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '60px Arial', fill: '#FF0000' });
		    stateText.anchor.setTo(0.5, 0.5);
		    stateText.visible = false;
            
            this.marker = game.add.graphics();
            this.marker.lineStyle(2, 0x00ff00, 1);
            this.marker.drawRect(0, 0, tileSize, tileSize);
            this.marker.x = this.box1.x;
            this.marker.y = this.box1.y;
            
        },

        pressedUp: function() {
            this.moveTo(0, -tileSize);
        },
        pressedRight: function() {
            this.moveTo(tileSize, 0);
        },
        pressedDown: function() {
            this.moveTo(0, tileSize);
        },
        pressedLeft: function() {
            this.moveTo(-tileSize, 0);
        },
        
        moveTo: function (dx, dy) {
            if (!this.map.hasTile((this.box1.x + dx) / tileSize, (this.box1.y + dy ) / tileSize, this.layer.index)) {
                return;
            }
            var index = this.map.getTile((this.box1.x + dx) / tileSize, (this.box1.y + dy ) / tileSize, this.layer.index, false).index;
            if (index == -1 || index == 2) {
                return;
            }
            this.box1.x += dx;
            this.box1.y += dy;
            this.marker.x = this.box1.x;
            this.marker.y = this.box1.y;
            if (!this.map.hasTile((this.box2.x - dx) / tileSize, (this.box2.y - dy ) / tileSize, this.layer.index)) {
                return;
            }
            var index2 = this.map.getTile((this.box2.x - dx) / tileSize, (this.box2.y - dy ) / tileSize, this.layer.index, false).index;
            if (index2 == -1 || index2 == 2) {
                return;
            }
            this.box2.x -= dx;
            this.box2.y -= dy;
            if (index == 3 && index2 == 3) {
                console.log("you won!");
                //alert("You Won!\n Are you ready for next level?");
                game.state.start("level5")
            }
            
            listenerlevel4 ();
            
            if (timerlevel4.duration == 0) {
	            game.state.start("level4");
	            //location.reload();
            }
        },

        update: function () {
           if (counterlevel4 >= 2) {
		        
		        countDownTimerLevel4();
	        }
        },

        render: function () {
			// Position and content for:
	        // 1. number of Levels
	        game.debug.text('Level 4', 420, 25, '#FFFF00');

	        // 2. Moves    
	        game.debug.text(moveTextlevel4, 420, 125, 'rgb(0,255,0)');
	        
	        // 3. Time		    
		    game.debug.text("Time new " + Math.round(timerlevel4.duration) / 1000, 420, 75, 'rgb(0,255,0)');
        },
        
    };

var counterlevel4 = 1;
var moveTextlevel4;
var stateText;
var timerlevel4;

// This function counts down the time - based on the levels difficulty
function countDownTimerLevel4() {
    
    if (timerlevel4.duration <= 1) {
        
        stateText.text = "GAME OVER\nPress UP to Restart"
        stateText.visible = true;
    }
};

// Counts the player's movemnet 
function listenerlevel4 () {

    var moved4 = counterlevel4++;
    moveTextlevel4 = "Moves: " + moved4;
}
