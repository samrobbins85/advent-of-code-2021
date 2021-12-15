import { fileToArray } from "../common/utils.js";

function dijkstra(input) {
    let weights = input.map((row) => row.map((_) => Infinity));
    weights[0][0] = 0;
    let visited = new Set();
    while (visited.size !== input.length * input[0].length) {
        let smallest_value = Infinity;
        let coordinate = undefined;
        weights.forEach((row, y) =>
            row.forEach((cell, x) => {
                if (cell < smallest_value && !visited.has(`${y},${x}`)) {
                    smallest_value = cell;
                    coordinate = [y, x];
                }
            })
        );
        visited.add(`${coordinate[0]},${coordinate[1]}`);
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
    }
    return weights[weights.length - 1][weights[0].length - 1];
}

export function part1(array) {
    const input = array.map((item) =>
        Array.from(item).map((risk) => parseInt(risk, 10))
    );
    return dijkstra(input);
}

export function part2(array) {
    let input = array.map((item) =>
        Array.from(item).map((risk) => parseInt(risk, 10))
    );
    function increaseArray(arr, i) {
        return arr.map((item) => (item + i > 9 ? item + i - 9 : item + i));
    }
    input = input.map((row) => {
        const original = [...row];
        for (let i = 1; i < 5; i++) {
            const increased = increaseArray(original, i);
            row = row.concat(increased);
        }
        return row;
    });
    const originalMatrix = JSON.parse(JSON.stringify(input));
    for (let i = 1; i < 5; i++) {
        const increasedMatrix = originalMatrix.map((row) =>
            increaseArray(row, i)
        );
        input = [...input, ...increasedMatrix];
    }
    return dijkstra(input);
}

console.log(part1(fileToArray("day15/input_short.txt")));
console.log(part2(fileToArray("day15/input_short.txt")));
