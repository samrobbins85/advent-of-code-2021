import { fileToArray } from "../common/utils.js";
import util from "util";
export function part1(array) {
    const input = array.map((item) =>
        Array.from(item).map((risk) => parseInt(risk, 10))
    );
    let weights = input.map((row) => row.map((_) => Infinity));
    weights[0][0] = 0;
    let visited = [];
    while (visited.length !== input.length * input[0].length) {
        // Find the smallest node
        let smallest_value = Infinity;
        let coordinate = undefined;
        weights.forEach((row, y) =>
            row.forEach((cell, x) => {
                if (cell < smallest_value && !visited.includes(`${y},${x}`)) {
                    smallest_value = cell;
                    coordinate = [y, x];
                }
            })
        );
        visited.push(`${coordinate[0]},${coordinate[1]}`);
        function updateDistance(source, target) {
            if (
                weights?.[target[0]]?.[target[1]] &&
                weights[target[0]][target[1]] >
                    weights[source[0]][source[1]] + input[target[0]][target[1]]
            ) {
                weights[target[0]][target[1]] =
                    weights[source[0]][source[1]] + input[target[0]][target[1]];
            }
        }
        updateDistance(coordinate, [coordinate[0] + 1, coordinate[1]]);
        updateDistance(coordinate, [coordinate[0] - 1, coordinate[1]]);
        updateDistance(coordinate, [coordinate[0], coordinate[1] + 1]);
        updateDistance(coordinate, [coordinate[0], coordinate[1] - 1]);
        console.log(visited.length);
    }
    return weights[weights.length - 1][weights[0].length - 1];
}

console.log(part1(fileToArray("day15/input.txt")));
