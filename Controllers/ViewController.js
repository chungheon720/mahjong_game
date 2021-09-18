import { DISCARD_SIZE, TILE_HEIGHT, TILE_POSITION, TILE_WIDTH } from "../Constants.js";

export class ViewController {
    constructor(gameController, mouse, canvas, ctx) {
        this.gameController = gameController;
        this.mouse = mouse;
        this.canvas = canvas;
        this.ctx = ctx;
    }

    //For display all on table UI
    displayTable() {
        this.discardDisplay();
        this.drawDisplay();
    }

    //For display all player UI
    displayPlayer(player) {
        this.playerHandDisplay(player.hand);
        this.playerOptions(player);
    }

    //Diplay a hand passed into the function
    playerHandDisplay(hand) {
        const pShift = Math.floor((14 - hand.tilePositioning.length) / 2);
        const self = this;
        let index = 0;
        for (let tileID of hand.tilePositioning) {
            //Draws the tiles in the hand at the base
            hand.tiles[tileID].draw(self.ctx, TILE_POSITION[index + pShift], self.canvas.height - TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT);
            hand.tiles[tileID].update(self.mouse);
            index++;
        }

        //Check if mouse has clicked on a tile
        if (this.mouse.sTileID != -1) {
            //Draw the tile on the mouse position
            hand.tiles[this.mouse.sTileID].draw(this.ctx, this.mouse.x - TILE_WIDTH / 2, this.mouse.y - TILE_HEIGHT / 2);
        }

    }

    //Display player choices
    playerOptions(player) {
        let choiceX = this.canvas.width / 2 + DISCARD_SIZE / 2 + DISCARD_SIZE + (TILE_WIDTH - 15) * 2;
        let baseCX = choiceX;
        let choiceY = 10;
        if (player.choices.length != 0) {
            for (let choice of player.choices) {
                this.ctx.fillRect(choiceX - 1, choiceY - 1, choice.length * (TILE_WIDTH - 15) + 2, TILE_HEIGHT - 20);
                for (let c = 0; c < choice.length; c++) {
                    player.getTile(choice[c]).draw(this.ctx, choiceX, choiceY, TILE_WIDTH - 15, TILE_HEIGHT - 22);
                    choiceX += TILE_WIDTH - 15;
                }
                choiceY += TILE_HEIGHT - 22;
                choiceX = baseCX;
            }
        }
    }

    //Display the draw hit area
    drawDisplay() {
        this.ctx.fillText('Draw',
            this.canvas.width / 2 - DISCARD_SIZE / 2 - DISCARD_SIZE + 20,
            DISCARD_SIZE - 20);
        this.ctx.strokeRect(
            this.canvas.width / 2 - DISCARD_SIZE / 2 - DISCARD_SIZE, DISCARD_SIZE / 2,
            DISCARD_SIZE, DISCARD_SIZE / 2);
    }

    //Display the discard hit area
    discardDisplay() {
        this.ctx.font = '25px serif';
        this.ctx.strokeRect(this.canvas.width / 2 - (DISCARD_SIZE / 2),
            0, DISCARD_SIZE, DISCARD_SIZE);

        this.ctx.fillText('Discard', this.canvas.width / 2 - DISCARD_SIZE / 2.4,
            DISCARD_SIZE / 1.75);
    }


}