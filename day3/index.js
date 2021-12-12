import { fileToArray } from '../common/utils.js';

const mode = (array) => +(array.reduce((p, c) => p + c) >= array.length / 2);
const fromBinary = (value) => parseInt(value, 2);

export function part1(data) {
    const binary = [...Array(data[0].length).keys()].map((item) =>
        mode(data.map((line) => parseInt(line[item], 10)))
    );
    return (
        fromBinary(binary.join('')) *
        fromBinary(binary.map((item) => +!item).join(''))
    );
}

export function part2(data) {
    function getResult(data, flip) {
        let myPosition = 0;
        while (data.length > 1) {
            const atIndex = data.map((item) => parseInt(item[myPosition]), 10);
            let mostCommon = flip ? mode(atIndex) : +!mode(atIndex);
            data = data.filter((_, index) => atIndex[index] === mostCommon);
            myPosition += 1;
        }
        return fromBinary(data[0]);
    }
    return getResult(data, true) * getResult(data, false);
}

console.log(part1(fileToArray('day3/input.txt')));
console.log(part2(fileToArray('day3/input.txt')));
