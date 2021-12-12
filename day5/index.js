import { fileToArray } from "../common/utils.js";
function range(arr) {
    let [start, end] = arr;
    if (start > end) {
        [start, end] = [end, start];
        return Array(end - start + 1)
            .fill()
            .map((_, i) => start + i)
            .reverse();
    }
    return Array(end - start + 1)
        .fill()
        .map((_, i) => start + i);
}

function changingCoord(item) {
    if (item[0][0] === item[1][0]) {
        return [item[0][1], item[1][1]];
    } else {
        return [item[0][0], item[1][0]];
    }
}

function constantCoord(item) {
    if (item[0][0] === item[1][0]) {
        return item[0][0];
    } else {
        return item[0][1];
    }
}

function constantIndex(item) {
    if (item[0][0] === item[1][0]) {
        return 0;
    } else {
        return 1;
    }
}

function preProcess(array) {
    return array.map((item) =>
        item
            .split(" -> ")
            .map((coordinate) =>
                coordinate.split(",").map((item) => parseInt(item, 10))
            )
    );
}

function processStraight(array) {
    return array
        .map((item) =>
            range(changingCoord(item)).map((it) =>
                constantIndex(item)
                    ? `${it},${constantCoord(item)}`
                    : `${constantCoord(item)},${it}`
            )
        )
        .flat();
}

export function part1(array) {
    const splitArray = preProcess(array);
    const hOrV = splitArray.filter(
        (item) => item[0][0] === item[1][0] || item[0][1] === item[1][1]
    );
    return processStraight(hOrV).filter(
        (a, index, array) =>
            array.indexOf(a) === index && array.lastIndexOf(a) !== index
    ).length;
}

function processDiagonal(entry) {
    let xRange = range([entry[0][0], entry[1][0]]);
    let yRange = range([entry[0][1], entry[1][1]]);
    return xRange.map((item, index) => `${item},${yRange[index]}`);
}

export function part2(array) {
    const splitArray = preProcess(array);
    const hOrV = splitArray.filter(
        (item) => item[0][0] === item[1][0] || item[0][1] === item[1][1]
    );
    const diagonal = splitArray
        .filter((x) => !hOrV.includes(x))
        .map((item) => processDiagonal(item))
        .flat();
    const straight = processStraight(hOrV);

    const all = straight
        .concat(diagonal)
        .filter(
            (a, index, array) =>
                array.indexOf(a) === index && array.lastIndexOf(a) !== index
        ).length;
    return all;
}
console.log(part1(fileToArray("day5/input_short.txt")));
console.log(part2(fileToArray("day5/input_short.txt")));
