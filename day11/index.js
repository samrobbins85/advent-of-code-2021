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
  return input.map((rows) =>
    rows.map((cell) => {
      return cell + 1;
    })
  );
}

function preProcess(array) {
  return array.map((item) =>
    Array.from(item).map((char) => parseInt(char, 10))
  );
}

function part1(array) {
  let input = preProcess(array);
  let total_flashes = 0;
  for (let step = 0; step < 100; step++) {
    input = increaseAll(input);
    let all_flashed = [];
    function increaseSingle(position) {
      if (!all_flashed.includes(`${position[0]},${position[1]}`)) {
        if (input?.[position[0]]?.[position[1]]) {
          input[position[0]][position[1]] += 1;
        }
        if (input?.[position[0]]?.[position[1]] > 9) {
          all_flashed.push(`${position[0]},${position[1]}`);
          increaseAdjacent(position, increaseSingle);
        }
      }
    }
    input.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell > 9) {
          all_flashed.push(`${y},${x}`);
        }
      })
    );
    all_flashed.forEach((item) =>
      increaseAdjacent(
        item.split(",").map((item) => parseInt(item, 10)),
        increaseSingle
      )
    );
    input = input.map((row) =>
      row.map((cell) => {
        if (cell > 9) {
          total_flashes += 1;
          return 0;
        } else {
          return cell;
        }
      })
    );
  }
  return total_flashes;
}

function part2(array) {
  let input = preProcess(array);
  let result = null;
  let step = 0;
  while (result === null) {
    input = increaseAll(input);
    let all_flashed = [];
    function increaseSingle(position) {
      if (!all_flashed.includes(`${position[0]},${position[1]}`)) {
        if (input?.[position[0]]?.[position[1]]) {
          input[position[0]][position[1]] += 1;
        }
        if (input?.[position[0]]?.[position[1]] > 9) {
          all_flashed.push(`${position[0]},${position[1]}`);
          increaseAdjacent(position, increaseSingle);
        }
      }
    }
    input.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell > 9) {
          all_flashed.push(`${y},${x}`);
        }
      })
    );
    all_flashed.forEach((item) =>
      increaseAdjacent(
        item.split(",").map((item) => parseInt(item, 10)),
        increaseSingle
      )
    );

    input = input.map((row) => row.map((cell) => (cell > 9 ? 0 : cell)));

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
