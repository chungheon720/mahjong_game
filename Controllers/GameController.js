import { ANIMAL_IMAGE_NAMES, ASSETS_DIR, IMAGE_NAME, TILE_HEIGHT, TILE_WIDTH } from "../Constants.js";
import { swapPosition } from "../Helpers/SortingHelper.js";
import { Tile } from "../Models/Tile.js";


export class GameController {
    constructor() {
        this.deck = new Array();
        this.setup();
    }

    setup() {
        const imagePath = ASSETS_DIR + IMAGE_NAME;
        for (let i = 1; i <= 3; i++) {
            let base = 100 * i;
            for (let j = 0; j < 36; j++) {
            const tile = new Tile(imagePath,
                    0, 0, TILE_WIDTH,
                    TILE_HEIGHT, base + j);
                this.deck.push(tile);
            }
        }
        for (let i = 0; i < 28; i++) {
            const tile = new Tile(imagePath,
                0, 0, TILE_WIDTH,
                TILE_HEIGHT, 400 + i);
            this.deck.push(tile);

        }
        for (let i = 0; i < 12; i++) {
            let tileValue = 500 + i;
            let spPath = imagePath;
            if (tileValue % 100 > 7) {
                spPath = ASSETS_DIR + ANIMAL_IMAGE_NAMES[tileValue % 100 % 8];
            }
            const tile = new Tile(spPath,
                0, 0, TILE_WIDTH,
                TILE_HEIGHT, tileValue);
            this.deck.push(tile);
        }
        for (let i = 0; i < this.deck.length; i++) {
            const tCol = Math.floor(this.deck[i].value / 100);
            if (tCol == 4) {
                console.log(tCol + " " + Math.floor(this.deck[i].value % 100 / 4));
            } else {
                console.log(tCol);
            }
        }
        for (let i = 0; i < this.deck.length; i++) {
            let r = Math.floor(Math.random() * 1000) % this.deck.length;
            swapPosition(this.deck, i, r);
        }
    }

}