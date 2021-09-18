import { Hand } from "./Hand.js";

export class Player {
    constructor() {
        this.hand = new Hand();
        this.eatenArr = new Array();
        this.specialArr = new Array();
        this.choices = new Array();
    }

    //Add tile to hand
    addTile(tile) {
        this.hand.addTile(tile);
    }

    //Discard tile from hand
    discardTile(tileIndex) {
       return this.hand.discardTile(tileIndex);
    }

    //Get specific tile for hand
    getTile(tileIndex){
        return this.hand.tiles[tileIndex];
    }

    //Sort hand
    sortHand() {
        this.hand.sortHand();
    }

    //Get position of tile with value
    getPositionOfTile(tileValue){
        return this.hand.tilePositioning.indexOf(tileValue);
    }

    //Get possible choices to eat
    getChoices(discardedTile) {
        const sortedPosition = this.hand.getSorted();
        this.choices = this.getCombo(sortedPosition, discardedTile);
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
                            choices.push(choice);
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