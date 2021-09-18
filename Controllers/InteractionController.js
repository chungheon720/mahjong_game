import { DISCARD_SIZE } from "../Constants.js";

export class InteractionController{
    constructor(gameController, mouse, player, canvas){
        this.gameController = gameController;
        this.mouse = mouse;
        this.player = player;
        this.canvas = canvas;
    }

    //Check for all hit boxes hit
    interaction(){
        //Draw hit box hit
        if(this.drawClicked()){
            this.player.addTile(this.gameController.deck.pop());
            this.gameController.drawn = true;
        }

        //Discard hitbox hit
        if(this.discardClicked()){
            const handPos = this.player.getPositionOfTile(this.mouse.sTileID);
            const discardedTile = this.player.discardTile(handPos);
            this.gameController.discardTile(discardedTile);
            this.mouse.sTileID = -1;
            this.mouse.click = false;
            this.gameController.drawn = false;
        }
    }

    //Check for discard hitbox hit
    discardClicked(){
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
    drawClicked(){
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