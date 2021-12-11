import { fileToArray } from "../common/utils.js";

function part1(array) {
  let input = array.map((item) =>
    Array.from(item).map((char) => parseInt(char, 10))
  );
  let total_flashes = 0;
  for (let step = 0; step < 100; step++) {
    // First the energy level of each octopus increases by 1
    input = input.map((rows) =>
      rows.map((cell) => {
        return cell + 1;
      })
    );
    // Any octopus with an energy level greater than 9 flashes
    let all_flashed = [];
    function increaseSingle(position) {
      if (!all_flashed.includes(`${position[0]},${position[1]}`)) {
        if (input?.[position[0]]?.[position[1]]) {
          input[position[0]][position[1]] += 1;
        }
        if (input?.[position[0]]?.[position[1]] > 9) {
          all_flashed.push(`${position[0]},${position[1]}`);
          increaseAdjacent(position);
        }
      }
    }
    function increaseAdjacent(position) {
      increaseSingle([position[0] + 1, position[1]]);
      increaseSingle([position[0] + -1, position[1]]);
      increaseSingle([position[0], position[1] + 1]);
      increaseSingle([position[0], position[1] - 1]);
      increaseSingle([position[0] + 1, position[1] + 1]);
      increaseSingle([position[0] + 1, position[1] - 1]);
      increaseSingle([position[0] - 1, position[1] + 1]);
      increaseSingle([position[0] - 1, position[1] - 1]);
    }
    input.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell > 9) {
          all_flashed.push(`${y},${x}`);
        }
      })
    );
    all_flashed.forEach((item) =>
      increaseAdjacent(item.split(",").map((item) => parseInt(item, 10)))
    );
    // This is the last step
    input.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell > 9) {
          input[y][x] = 0;
          total_flashes += 1;
        }
      })
    );
  }
  return total_flashes;
}

function part2(array) {
  let input = array.map((item) =>
    Array.from(item).map((char) => parseInt(char, 10))
  );
  let result = null;
  let step = 0;
  while (result === null) {
    // First the energy level of each octopus increases by 1
    input = input.map((rows) =>
      rows.map((cell) => {
        return cell + 1;
      })
    );
    // Any octopus with an energy level greater than 9 flashes
    let all_flashed = [];
    function increaseSingle(position) {
      if (!all_flashed.includes(`${position[0]},${position[1]}`)) {
        if (input?.[position[0]]?.[position[1]]) {
          input[position[0]][position[1]] += 1;
        }
        if (input?.[position[0]]?.[position[1]] > 9) {
          all_flashed.push(`${position[0]},${position[1]}`);
          increaseAdjacent(position);
        }
      }
    }
    function increaseAdjacent(position) {
      increaseSingle([position[0] + 1, position[1]]);
      increaseSingle([position[0] + -1, position[1]]);
      increaseSingle([position[0], position[1] + 1]);
      increaseSingle([position[0], position[1] - 1]);
      increaseSingle([position[0] + 1, position[1] + 1]);
      increaseSingle([position[0] + 1, position[1] - 1]);
      increaseSingle([position[0] - 1, position[1] + 1]);
      increaseSingle([position[0] - 1, position[1] - 1]);
    }
    input.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell > 9) {
          all_flashed.push(`${y},${x}`);
        }
      })
    );
    all_flashed.forEach((item) =>
      increaseAdjacent(item.split(",").map((item) => parseInt(item, 10)))
    );
    // This is the last step
    input.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell > 9) {
          input[y][x] = 0;
        }
      })
    );

    const allFlash = input.every((row) => row.every((cell) => cell === 0));
    if (allFlash) {
      result = step + 1;
    }
    step++;
  }
  return result;
}
console.log(part1(fileToArray("day11/input.txt")));
console.log(part2(fileToArray("day11/input.txt")));
