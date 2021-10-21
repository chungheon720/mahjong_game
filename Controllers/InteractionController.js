import { DISCARD_SIZE, TILE_HEIGHT, TILE_POSITION, TILE_WIDTH } from "../Constants.js";
import { swapPosition } from "../Helpers/SortingHelper.js";

export class InteractionController {
    constructor(gameController, mouse, player, canvas) {
        this.gameController = gameController;
        this.mouse = mouse;
        this.player = player;
        this.canvas = canvas;
    }

    //Check for all hit boxes hit
    interaction() {
        //Draw hit box hit
        if (this.drawClicked()) {
            this.player.addTile(this.gameController.drawTile());
            while(this.player.flowerCount != 0){
                this.player.addTile(this.gameController.drawSpecialTile(this.player.flowerCount));
            }
            this.gameController.drawn = true;
        }

        //Discard hitbox hit
        if (this.discardClicked()) {
            const discardedTile = this.player.discardTile(this.mouse.sTileID);
            this.gameController.discardTile(discardedTile);
            this.mouse.sTileID = -1;
            this.mouse.click = false;
            this.gameController.drawn = false;
        }

        if (this.mouse.sTileID != -1 && this.mouse.y > this.canvas.height / 2) {
            this.player.shiftTile(this.mouse);
        }

        if(this.mouse.click){
            this.choiceSelected();
        }
    }

    choiceSelected() {
        let choiceX = this.canvas.width / 2 + DISCARD_SIZE / 2 + 10;
        let baseCX = choiceX;
        let choiceY = 10;
        let index = 0;
        for (let choice of this.player.choices) {
            const endX = choiceX + Math.min(choice.length, 4) * (TILE_WIDTH - 15);
            if(this.mouse.x > choiceX 
                && this.mouse.x < endX
                && this.mouse.y > choiceY 
                && this.mouse.y < choiceY + TILE_HEIGHT - 22
                && this.player.choices.length > 0){
                    this.gameController.playerEatTile(this.player, choice);
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

    //Check for discard hitbox hit
    discardClicked() {
        if (this.mouse.sTileID != -1) {
            //Discard tile when this.mouse holding tile enters discard area
            if (this.mouse.x >= this.canvas.width / 2 - DISCARD_SIZE / 2 &&
                this.mouse.x < this.canvas.width / 2 + DISCARD_SIZE &&
                this.mouse.y < DISCARD_SIZE) {
                return true;
            }
        }
        return false;
    }

    //Check for draw hitbox hit
    drawClicked() {
        if (this.mouse.x >= this.canvas.width / 2 - DISCARD_SIZE / 2 - DISCARD_SIZE &&
            this.mouse.x <= this.canvas.width / 2 - DISCARD_SIZE / 2 &&
            this.mouse.y >= DISCARD_SIZE / 2 &&
            this.mouse.y <= DISCARD_SIZE &&
            this.mouse.sTileID == -1 &&
            this.mouse.click &&
            this.gameController.drawn == false) {
            return true;
        }

        return false;

    }

}