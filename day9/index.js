import { fileToArray } from "../common/utils.js";

function part1(array) {
  const input = array.map((item) =>
    Array.from(item).map((char) => parseInt(char, 10))
  );
  let output = [];
  input.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (
        cell < (input?.[y]?.[x - 1] ?? 10) &&
        cell < (input?.[y]?.[x + 1] ?? 10) &&
        cell < (input?.[y + 1]?.[x] ?? 10) &&
        cell < (input?.[y - 1]?.[x] ?? 10)
      ) {
        output.push(cell + 1);
      }
    })
  );

  return output.reduce((prev, curr) => prev + curr);
}

console.log(part1(fileToArray("day9/input.txt")));
