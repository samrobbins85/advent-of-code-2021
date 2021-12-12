import { fileToArray } from '../common/utils.js';

const triangle = (n) => (n * (n + 1)) / 2;

function core(array, comparison) {
    const input = array[0].split(',').map((item) => parseInt(item, 10));
    return Math.min(
        ...[...Array(Math.max(...input) + 1).keys()].map((index) =>
            input
                .map((item) => comparison(index, item))
                .reduce((prev, curr) => prev + curr)
        )
    );
}
export function part1(array) {
    return core(array, (index, item) => Math.abs(index - item));
}
export function part2(array) {
    return core(array, (index, item) => triangle(Math.abs(index - item)));
}

console.log(part1(fileToArray('day7/input.txt')));
console.log(part2(fileToArray('day7/input.txt')));
