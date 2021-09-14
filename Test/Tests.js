import { GameController } from '../Controllers/GameController.js';
import { Hand } from '../Models/Hand.js'
import { TILE_POSITION, TILE_HEIGHT, TILE_WIDTH, CANVAS_WIDTH, CANVAS_HEIGHT } from '../Constants.js';
import { Mouse } from '../Models/Mouse.js';

//Canvas setup
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const wWidth = window.innerWidth;
const wHeight = window.innerHeight;


canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.font = '50px Georgia';
// let debugOut = document.getElementById("debug_output");

//Window resizing
let canvasPosition = canvas.getBoundingClientRect();

function reportWindowResize() {
    canvasPosition = canvas.getBoundingClientRect();
    mouse.canvasPosition = canvasPosition;
}

window.onresize = reportWindowResize;
var hand;
var gameController;
var mouse = new Mouse(canvas);
function main() {
    gameController = new GameController();
    hand = new Hand();
    hand.addTile(gameController.deck.pop());
    hand.addTile(gameController.deck.pop());
    animate();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    animateHand();
    requestAnimationFrame(animate);
}

function animateHand() {
    hand.tilePositioning.forEach(function (tileID, index) {
        if (tileID != -1) {
            //Draws the tiles in the hand at the base
            hand.tiles[tileID].draw(ctx, TILE_POSITION[index], canvas.height - TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT);
            hand.tiles[tileID].update(mouse);
        }
    });

     //Check if mouse has clicked on a tile
     if (mouse.sTileID != -1) {
        //Draw the tile on the mouse position
        hand.tiles[mouse.sTileID].draw(ctx, mouse.x - TILE_WIDTH/2, mouse.y - TILE_HEIGHT / 2);
     }
}

main();
