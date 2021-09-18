import { GameController } from '../Controllers/GameController.js';
import { Hand } from '../Models/Hand.js'
import { TILE_POSITION, TILE_HEIGHT, TILE_WIDTH, CANVAS_WIDTH, CANVAS_HEIGHT, DISCARD_SIZE } from '../Constants.js';
import { Mouse } from '../Models/Mouse.js';
import { ViewController } from '../Controllers/ViewController.js';
import { InteractionController } from '../Controllers/InteractionController.js';
import { Player } from '../Models/Player.js';

//Canvas setup
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

window.onresize = reportWindowResize;

function reportWindowResize(){
    mouse.canvasPosition = canvas.getBoundingClientRect();
}

var player;
var gameController, viewController, interactionController;
const mouse = new Mouse(canvas);
function main() {
    gameController = new GameController();
    gameController.testSetup();
    player = new Player();
    viewController = new ViewController(gameController, mouse, canvas, ctx);
    interactionController = new InteractionController(gameController, mouse, player, canvas);
    for(let i = 0; i < 13; i++){
        player.addTile(gameController.deck.pop());
    }
    player.sortHand();
    animate();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    viewController.displayPlayer(player)
    viewController.displayTable();
    interactionController.interaction();
    if(gameController.dPile.length >= 1){
        gameController.checkCombo(player);
    }
    requestAnimationFrame(animate);
}



main();
