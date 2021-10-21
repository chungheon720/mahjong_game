import { TILE_POSITION, TILE_WIDTH } from "../Constants.js";
import { quickSort, swapPosition } from "../Helpers/SortingHelper.js";
import { Hand } from "./Hand.js";

export class Player {
    constructor() {
        this.hand = new Hand();
        this.eatenArr = new Array();
        this.specialArr = new Array();
        this.choices = new Array();
        this.flowerCount = 0;
    }

    //Eat tile
    eatTile(discardedTile, comboTiles) {
        const comboArr = [discardedTile];
        for (let tileVal of comboTiles) {
            comboArr.push(this.discardTile(tileVal));
        }
        quickSort(comboArr, 0, comboArr.length - 1, this.sortTileFunc)
        this.eatenArr.push(comboArr);
        this.choices.splice(0, this.choices.length);
    }

    //sort tile func for eating tiles
    sortTileFunc(compareTile, tile) {
        const pVal = tile.value % 100 % 9;
        const tVal = compareTile.value % 100 % 9;
        if (tVal < pVal) {
            return true;
        }else{
            return false;
        }
    }

    //Add tile to hand
    addTile(tileArr) {
        this.flowerCount = 0;
        for (const tile of tileArr) {
            if (Math.floor(tile.value / 100) == 5) {
                this.flowerCount++;
                this.specialArr.push(tile);
            } else {
                this.hand.addTile(tile);
            }

        }
    }

    //Discard tile from hand
    discardTile(tileValue) {
        const tileIndex = this.hand.tilePositioning.indexOf(tileValue);
        return this.hand.discardTile(tileIndex);
    }

    //Get specific tile for hand
    getTile(tileVal) {
        return this.hand.tiles[tileVal];
    }

    //Sort hand
    sortHand() {
        this.hand.sortHand();
    }

    shiftTile(mouse) {
        const holdTile = this.hand.tilePositioning.indexOf(mouse.sTileID);
        //Allow moving on tile position till halve the height of the screen
        //Swap only till the end of the last available tile on right side
        if (this.getTile(this.hand.tilePositioning[holdTile + 1])
            && mouse.x > (TILE_POSITION[holdTile + 1] + TILE_WIDTH)) {
            swapPosition(this.hand.tilePositioning, holdTile, holdTile + 1)
        } else if (mouse.x < (TILE_POSITION[holdTile - 1] + TILE_WIDTH)) {
            swapPosition(this.hand.tilePositioning, holdTile, holdTile - 1)
        }
        return 0;
    }

    //Get possible choices to eat
    getChoices(discardedTile) {
        const sortedPosition = this.hand.getSorted();
        this.choices = this.getCombo(sortedPosition, discardedTile);
        // for(let choice of this.choices){
        //     let choiceStr = "";
        //     for(let c of choice){
        //         let tVal = c % 100 % 9;
        //         choiceStr += tVal + " ";
        //     }
        // }
    }

    //Get all sequences or same tiles
    getCombo(sortedPosition, discardedTile) {
        let choices = new Array();
        const dCol = Math.floor(discardedTile.value / 100);
        let sameCount = 0;
        let state = 0;
        const dVal = discardedTile.value;
        const stateArray = new Array;
        for (let i = 0; i < sortedPosition.length; i++) {
            const tileValue = sortedPosition[i];
            const tCol = Math.floor(tileValue / 100);
            if (dCol == tCol) {
                if (tCol == 4) {
                    const tShape = Math.floor((tileValue % 100) / 4 % 7);
                    const dShape = Math.floor((dVal % 100) / 4 % 7);
                    if (tShape == dShape) {
                        sameCount++;
                        if (sameCount >= 2) {
                            const start = (i - sameCount + 1);
                            const end = (i - sameCount + 1) + sameCount;
                            const choice = sortedPosition.slice(start, end);
                            choices.push(choice);
                        }
                    }
                } else {
                    if (dCol >= 4) {
                        break;
                    }
                    const tVal = tileValue % 100 % 9;
                    const diff = tVal - (dVal % 100 % 9);
                    if (diff == 0) {
                        sameCount++;
                        if (sameCount >= 2) {
                            const start = (i - sameCount + 1);
                            const end = (i - sameCount + 1) + sameCount;
                            const choice = sortedPosition.slice(start, end);
                            choices.unshift(choice);
                        }
                    } else if (diff >= -2 && diff <= 2) {
                        if (state == 0 ||
                            (state == -2 && diff == -1) ||
                            (state == -1 && diff == 1) ||
                            (state == 1 && diff == 2)) {
                            stateArray.push(sortedPosition[i]);
                            if (stateArray.length >= 2) {
                                const choice = stateArray.slice(0)
                                choices.push(choice);
                                stateArray.splice(0, 1);
                            }
                        } else {
                            if (stateArray.length > 0 && state != diff) {
                                stateArray.splice(0, 1);
                            }
                        }
                        state = diff;
                    }
                }
            }

        }

        return choices;
    }
}