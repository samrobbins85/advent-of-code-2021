import { fileToArray } from '../common/utils.js';

function part1(array) {
    const paths = array.map((path) => path.split('-'));
    const startingNodes = paths
        .filter((path) => path[0] === 'start')
        .map((item) => item[1]);
    const startingNodes = paths
        .filter((path) => path[0] === 'start')
        .map((item) => item[1]);
    console.log(startingNodes);
    console.log(paths);
    return array;
}

console.log(part1(fileToArray('day12/input_short.txt')));
