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
        this.drawDiscard();
    }

    //For display all player UI
    displayPlayer(player) {
        this.playerHandDisplay(player.hand);
        this.playerOptions(player);
        this.displayPlayerFlower(player);
        this.displayEaten(player);
    }

    //For display eaten tiles
    displayEaten(player) {
        let eatenX = 20;
        let eatenY = this.canvas.height - TILE_HEIGHT - TILE_HEIGHT / 2 - 50;
        let self = this;
        player.eatenArr.forEach((eatenCombo) => {
            eatenCombo.forEach(
                (tile) => {
                    tile.draw(self.ctx, eatenX, eatenY, TILE_WIDTH - 15, TILE_HEIGHT - 22);
                    eatenX += TILE_WIDTH - 15;
                });
            eatenX += 15;
        });
    }

    //For display flowers/animal tiles
    displayPlayerFlower(player) {
        let flowerX = 20;
        let flowerY = 10;
        let self = this;
        player.specialArr.forEach(function (tile, i) {
            tile.draw(self.ctx, flowerX, flowerY, TILE_WIDTH - 15, TILE_HEIGHT - 22);
            flowerX += TILE_WIDTH - 15;
            if (i % 6 == 5) {
                flowerY += TILE_HEIGHT - 22;
                flowerX = 20;
            }
        });
    }

    //Diplay a hand passed into the function
    playerHandDisplay(hand) {
        const self = this;
        let index = 0;
        for (let tileID of hand.tilePositioning) {
            //Draws the tiles in the hand at the base
            hand.tiles[tileID].draw(self.ctx, TILE_POSITION[index], self.canvas.height - TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT);
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
        let choiceX = this.canvas.width / 2 + DISCARD_SIZE / 2 + 10;
        let baseCX = choiceX;
        let choiceY = 10;
        if (player.choices.length != 0) {
            let index = 0;
            for (let choice of player.choices) {
                this.ctx.fillRect(choiceX - 1, choiceY - 1, choice.length * (TILE_WIDTH - 15) + 2, TILE_HEIGHT - 20);
                for (let c = 0; c < choice.length; c++) {
                    player.getTile(choice[c]).draw(this.ctx, choiceX, choiceY, TILE_WIDTH - 15, TILE_HEIGHT - 22);
                    choiceX += TILE_WIDTH - 15;
                }
                choiceY += TILE_HEIGHT - 22;
                choiceX = baseCX;
                index++;
                if (index % 4 == 3) {
                    baseCX += (TILE_WIDTH - 15) * 4 + 10
                    choiceX = baseCX
                    choiceY = 10
                }
            }
        }
    }

    //Draw discarded tiles
    drawDiscard() {
        let discardX = 20;
        let discardY = DISCARD_SIZE + 10;

        for (let i = 0; i < this.gameController.dPile.length; i++) {
            this.gameController.dPile[i].draw(this.ctx, discardX, discardY,
                TILE_WIDTH - 10, TILE_HEIGHT - 14);
            discardX += TILE_WIDTH - 10;
            if (i % 19 == 0) {
                discardY += TILE_HEIGHT - 14 + 10;
                discardX = 20;
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