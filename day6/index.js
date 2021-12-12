import { fileToArray } from '../common/utils.js';

export function part1(array) {
    function mutate(array) {
        array.forEach((item, index) => {
            if (item === 0) {
                array.push(8);
                array[index] = 6;
            } else {
                array[index] = item - 1;
            }
        });
        return array;
    }
    let input = array[0].split(',').map((item) => parseInt(item, 10));
    for (let day = 0; day < 80; day++) {
        input = mutate(input);
    }
    return input.length;
}

export function part2(array) {
    function mutate(array) {
        const child = array.shift();
        array[8] = 0;
        array[6] += child;
        array[8] += child;
        return array;
    }
    let ages = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    array[0]
        .split(',')
        .map((item) => parseInt(item, 10))
        .forEach((age) => (ages[age] += 1));
    for (let day = 0; day < 256; day++) {
        ages = mutate(ages);
    }
    return ages.reduce((prev, curr) => prev + curr);
}
console.log(part1(fileToArray('day6/input.txt')));
console.log(part2(fileToArray('day6/input.txt')));
