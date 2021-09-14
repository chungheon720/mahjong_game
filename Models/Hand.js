import { Tile } from './Tile.js'
import {
    ASSETS_DIR,
    ANIMAL_IMAGE_NAMES,
    TILE_POSITION,
    CANVAS_HEIGHT,
    TILE_HEIGHT,
} from '../Constants.js';
import { quickSort } from '../Helpers/SortingHelper.js';
const spare = new Tile(ASSETS_DIR + ANIMAL_IMAGE_NAMES[0], -1, 0, 0, 0, 0);
export class Hand {
    constructor() {
        this.tiles = {};
        this.tilePositioning = new Array();
        this.emptyIndex = 0;
    }

    //Add tile to hand
    addTile(tile) {
        //Set position in hand
        tile.x = TILE_POSITION[this.emptyIndex];
        tile.y = CANVAS_HEIGHT - TILE_HEIGHT;
        
        //assign index as tile id
        this.tiles[tile.value] = tile

        //Assign tile to empty hand position
        this.tilePositioning[this.emptyIndex] = tile.value;

        //increment emptyIndex
        this.emptyIndex++;
    }

    //Discard tile using index from hand position
    discardTile(discardIndex) {
        //Get tile from hand position
        let tileIndex = this.tilePositioning[discardIndex];
        
        //Store discarded tile to return
        let discardedTile = this.tiles[tileIndex];

        //Remove the key pair from dictionary tiles
        delete this.tiles[tileIndex];

        //Delete tile from hand and add empty to tail of positioning
        this.tilePositioning.splice(tileIndex, 1);
        this.tilePositioning.push(-1);

        //Decrement last know empty index
        this.emptyIndex--;

        return discardedTile;
    }

    //Sort the tiles in hand
    sortHand() {
        let sortedPosition = [];
        for (let count = 0; count < this.tilePositioning.length; count++) {
            const val = {};
            if (this.tilePositioning[count] != -1) {
                val["value"] = this.tiles[this.tilePositioning[count]].value;
            } else {
                val["value"] = -1;
            }
            val["position"] = this.tilePositioning[count];
            sortedPosition.push(val);
        }

        quickSort(sortedPosition, 0, sortedPosition.length - 1, this.compareFunc);
        this.tilePositioning = sortedPosition.map((value) => {
            if (this.tiles[value] == -1) {
                return -1;
            }
            return value['position'];
        });
    }

    //for sorting by tile color, and value and special tiles
    compareFunc(tile, pivot) {
        const pivotValue = pivot['value'];
        const tileValue = tile['value'];
        const pivotColor = Math.floor(pivotValue / 100);
        const tileColor = Math.floor(tileValue / 100);
        if (tileValue == -1) {
            return false;
        } else if (pivotValue == -1) {
            return true;
        }
        if (tileColor < pivotColor) {
            return true;
        } else if (tileColor == pivotColor) {
            if (tileColor == 4) {
                const pVal = Math.floor(pivotValue % 100 / 4);
                const tVal = Math.floor(tileValue % 100 / 4);
                if (tVal < pVal) {
                    return true;
                }
            } else {
                const pVal = pivotValue % 100 % 9;
                const tVal = tileValue % 100 % 9;
                if (tVal < pVal) {
                    return true;
                }
            }
        }
        return false;
    }
}