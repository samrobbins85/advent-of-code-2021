import { fileToArray } from "../common/utils.js";

function increaseAdjacent(position, increaseSingle) {
  increaseSingle([position[0] + 1, position[1]]);
  increaseSingle([position[0] + -1, position[1]]);
  increaseSingle([position[0], position[1] + 1]);
  increaseSingle([position[0], position[1] - 1]);
  increaseSingle([position[0] + 1, position[1] + 1]);
  increaseSingle([position[0] + 1, position[1] - 1]);
  increaseSingle([position[0] - 1, position[1] + 1]);
  increaseSingle([position[0] - 1, position[1] - 1]);
}

function increaseAll(input) {
  return input.map((rows) => rows.map((cell) => cell + 1));
}

function preProcess(array) {
  return array.map((item) =>
    Array.from(item).map((char) => parseInt(char, 10))
  );
}

export function part1(array) {
  let input = preProcess(array);
  let total_flashes = 0;
  for (let step = 0; step < 100; step++) {
    input = increaseAll(input);
    let flashTemplate = input.map((row) =>
      row.map((cell) => (cell > 9 ? 1 : 0))
    );
    function increaseSingle(position) {
      if (flashTemplate?.[position[0]]?.[position[1]] === 0) {
        input[position[0]][position[1]] += 1;
        if (input?.[position[0]]?.[position[1]] > 9) {
          flashTemplate[position[0]][position[1]] = 2;
          increaseAdjacent(position, increaseSingle);
        }
      }
    }
    flashTemplate.forEach((row, y) =>
      row.forEach(
        (cell, x) => cell === 1 && increaseAdjacent([y, x], increaseSingle)
      )
    );
    input = input.map((row) =>
      row.map((cell) => {
        if (cell > 9) {
          total_flashes += 1;
          return 0;
        }
        return cell;
      })
    );
  }
  return total_flashes;
}

export function part2(array) {
  let input = preProcess(array);
  for (let step = 1; ; step++) {
    input = increaseAll(input);
    let flashTemplate = input.map((row) =>
      row.map((cell) => (cell > 9 ? 1 : 0))
    );
    function increaseSingle(position) {
      if (flashTemplate?.[position[0]]?.[position[1]] === 0) {
        input[position[0]][position[1]] += 1;
        if (input?.[position[0]]?.[position[1]] > 9) {
          flashTemplate[position[0]][position[1]] = 2;
          increaseAdjacent(position, increaseSingle);
        }
      }
    }
    flashTemplate.forEach((row, y) =>
      row.forEach(
        (cell, x) => cell === 1 && increaseAdjacent([y, x], increaseSingle)
      )
    );
    input = input.map((row) => row.map((cell) => (cell > 9 ? 0 : cell)));
    const allFlash = input.every((row) => row.every((cell) => cell === 0));
    if (allFlash) {
      return step;
    }
  }
}
console.log(part1(fileToArray("day11/input.txt")));
console.log(part2(fileToArray("day11/input.txt")));
