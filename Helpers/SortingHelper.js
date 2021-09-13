//ES6
export function swapPosition(arr, currPos, newPos) {
    [arr[currPos], arr[newPos]] = [arr[newPos], arr[currPos]];
}

export function quickSort(dataArr, low, high, compareFunc) {
    if (low < high) {
        let pivotIndex = partition(dataArr, low, high, compareFunc);
        quickSort(dataArr, low, pivotIndex - 1, compareFunc);
        quickSort(dataArr, pivotIndex + 1, high, compareFunc);
    }
}

function partition(dataArr, low, high, compareFunc) {
    const pivot = dataArr[high];
    let index = low - 1;
    for (let i = low; i < high; i++) {
        const s = compareFunc(dataArr[i], pivot);
        if (s) {
            index++;
            swapPosition(dataArr, index, i);
        }

    }
    index++;
    swapPosition(dataArr, index, high);
    return index;
}