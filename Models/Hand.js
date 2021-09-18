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
    }

    //Add tile to hand
    addTile(tile) {
        //Set position in hand
        tile.x = TILE_POSITION[this.emptyIndex];
        tile.y = CANVAS_HEIGHT - TILE_HEIGHT;

        //assign index as tile id
        this.tiles[tile.value] = tile

        //Assign tile to empty hand position
        this.tilePositioning.push(tile.value);
    }

    //Discard tile using index from hand position
    discardTile(discardIndex) {
        //Get tile from hand position
        let tileIndex = this.tilePositioning[discardIndex];

        //Store discarded tile to return
        let discardedTile = this.tiles[tileIndex];

        //Remove the key pair from dictionary tiles
        delete this.tiles[tileIndex];

        //Delete tile from hand
        this.tilePositioning.splice(discardIndex, 1);

        return discardedTile;
    }

    //Sort the tiles in hand
    sortHand() {
        const sortedPosition = this.getSorted();
        this.tilePositioning = sortedPosition;
    }

    getSorted() {
        //Create a separate array to contain the sorted position
        let sortedPosition = [];
        for (let count = 0; count < this.tilePositioning.length; count++) {
            //Store the value & position for comparison when sorting
            const val = this.tilePositioning[count];
            sortedPosition.push(val);
        }
        //quick sort the separate array
        quickSort(sortedPosition, 0, sortedPosition.length - 1, this.compareFunc);

        return sortedPosition;
    }

    //for sorting by tile color, and value and special tiles
    compareFunc(tileValue, pivotValue) {
        const pivotColor = Math.floor(pivotValue / 100);
        const tileColor = Math.floor(tileValue / 100);

        //if tile == -1 means its bigger as empty tiles go to right
        //else pivot is bigger
        if (tileValue == -1) {
            return false;
        } else if (pivotValue == -1) {
            return true;
        }

        //Sort by the multiple of 100
        if (tileColor < pivotColor) {
            return true;
        } else if (tileColor == pivotColor) {
            //if same multiple sort by the tile value
            if (tileColor == 4) {
                //for 4 these tiles are the big tiles
                //sort by multiples of 4
                const pVal = Math.floor(pivotValue % 100 / 4 % 7);
                const tVal = Math.floor(tileValue % 100 / 4 % 7);
                if (tVal < pVal) {
                    return true;
                }
            } else {
                //for any other sort by their value mod 9
                //since 1-9 for each type
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