import {
    ASSETS_DIR, ANIMAL_IMAGE_NAMES,
    IMAGE_TILE_WIDTH, IMAGE_TILE_HEIGHT,
    IMAGE_POSITION_X, IMAGE_POSITION_Y,
    TILE_HEIGHT, TILE_WIDTH,
} from "../constants.js";

export class Tile{
    constructor(imagePath = ASSETS_DIR + ANIMAL_IMAGE_NAMES[0], 
        id = -1, x = 0, y = 0, spriteWidth = TILE_WIDTH, 
        spriteHeight = TILE_HEIGHT, value = -1){
        this.x = x;
        this.y = y;
        this.id = id;
        this.pressedDown = false;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.image = new Image();
        this.image.src = imagePath;
        this.value = value;
    }

    //Update the position of the tile, called repeatedly
    update(mouse) {
        if (mouse.click) {
            this.pressedDown = this.checkClickBody(mouse);
            if (this.pressedDown && mouse.selectedTile == this.id) {
                this.x = mouse.x - this.spriteWidth / 2;
                this.y = mouse.y - this.spriteHeight / 2;
            }
        }
    }

    //Check if the click was within the tile's click area
    checkClickBody(mouse) {
        if ((mouse.x > this.x && mouse.x < this.x + this.spriteWidth &&
            mouse.y > this.y && mouse.y < this.y + this.spriteHeight &&
            mouse.selectedTile == -1) || mouse.selectedTile == this.id) {
            mouse.selectedTile = this.id
            return true;
        }
        else {
            return false;
        }
    }

    //Draw the tile on screen
    draw(ctx, posX = this.x, posY = this.y,
        sizeW = this.spriteWidth, sizeH = this.spriteHeight) {
        //Update tile position, and size
        this.x = posX;
        this.y = posY;
        this.spriteWidth = sizeW;
        this.spriteHeight = sizeH;

        //Draw tile object
        const color = Math.floor(this.value / 100);
        if (color == 4) {
            this.drawBigTiles(ctx);
        } else if (color == 5) {
            this.drawSpecialTiles(ctx);
        } else if (color == 6) {
            this.drawNormalTiles(ctx, color - 1);
        }
        
        //Draw plain red background for debugging
        ctx.fillStyle = 'red';
        ctx.fillRect(posX, posY, this.spriteWidth, this.spriteHeight)

        //For debugging, draw value of tile
        ctx.font = '13px serif';
        ctx.fillStyle = 'black';
        if (color == 4) {
            ctx.fillText(color + " " + Math.floor(this.value % 100 / 4), this.x, this.y);
        } else if (color == 5) {
            ctx.fillText(color + " " + this.value % 100, this.x, this.y);
        } else {
            ctx.fillText(color + " " + (this.value % 100 % 9), this.x, this.y);
        }
    }

    //Draw different type of tiles
    drawNormalTiles(ctx, color) {
        const val = this.value % 100 % 9;
        ctx.drawImage(this.image, IMAGE_POSITION_X[val], IMAGE_POSITION_Y[color],
            IMAGE_TILE_WIDTH, IMAGE_TILE_HEIGHT, this.x, this.y, this.spriteWidth, this.spriteHeight);
    }

    drawBigTiles(ctx) {
        const val = Math.floor(this.value % 100 / 4);
        ctx.drawImage(this.image, IMAGE_POSITION_X[val], IMAGE_POSITION_Y[3],
            IMAGE_TILE_WIDTH, IMAGE_TILE_HEIGHT, this.x, this.y, this.spriteWidth, this.spriteHeight);
    }

    drawSpecialTiles(ctx) {
        const val = Math.floor(this.value % 100);
        if(val >= 8){
            ctx.drawImage(this.image, this.x, this.y, this.spriteWidth, this.spriteHeight);
        }else{
            ctx.drawImage(this.image, IMAGE_POSITION_X[val], IMAGE_POSITION_Y[4],
                IMAGE_TILE_WIDTH, IMAGE_TILE_HEIGHT, this.x, this.y, this.spriteWidth, this.spriteHeight);
        }

    }
}