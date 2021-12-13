import { fileToArray } from "../common/utils.js";

function processFolds(folds, array) {
    folds.forEach((fold) => {
        const foldPosition = parseInt(fold[1]);
        array = array
            .map((item) => item.split(",").map((item) => parseInt(item, 10)))
            .map((item) => {
                if (fold[0] === "y" && item[1] > foldPosition) {
                    return [item[0], foldPosition - (item[1] - foldPosition)];
                } else if (fold[0] === "x" && item[0] > foldPosition) {
                    return [foldPosition - (item[0] - foldPosition), item[1]];
                }
                return item;
            })
            .map((item) => `${item[0]},${item[1]}`)
            .filter((item, index, arr) => arr.indexOf(item) === index);
    });
    return array;
}

export function part1(array) {
    const folds = array
        .splice(array.findIndex((item) => item === ""))
        .filter(Boolean)
        .map((item) => item.split("fold along ")[1].split("="));
    array = processFolds([folds[0]], array);
    return array.length;
}

export function part2(array) {
    const folds = array
        .splice(array.findIndex((item) => item === ""))
        .filter(Boolean)
        .map((item) => item.split("fold along ")[1].split("="));
    array = processFolds(folds, array).map((item) =>
        item.split(",").map((item) => parseInt(item, 10))
    );

    const largestX = Math.max(...array.map((item) => item[0]));
    const largestY = Math.max(...array.map((item) => item[1]));
    let display = Array.from(Array(largestY + 1), () =>
        new Array(largestX + 1).fill(".")
    );
    array.forEach((coordinate) => {
        display[coordinate[1]][coordinate[0]] = "*";
    });

    return display;
}

console.log(part1(fileToArray("day13/input.txt")));
console.table(part2(fileToArray("day13/input.txt")));
