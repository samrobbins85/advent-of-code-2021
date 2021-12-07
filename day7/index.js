import { fileToArray } from "../common/utils.js";

function part1(array) {
  const input = array[0].split(",").map((item) => parseInt(item, 10));
  return Math.min(
    ...[...Array(Math.max(...input) + 1).keys()].map((index) =>
      input
        .map((item) => Math.abs(index - item))
        .reduce((prev, curr) => prev + curr)
    )
  );
}

function triangularNumber(n) {
  return (n * (n + 1)) / 2;
}

function part2(array) {
  const input = array[0].split(",").map((item) => parseInt(item, 10));
  return Math.min(
    ...[...Array(Math.max(...input) + 1).keys()].map((index) =>
      input
        .map((item) => triangularNumber(Math.abs(index - item)))
        .reduce((prev, curr) => prev + curr)
    )
  );
}

console.log(part1(fileToArray("day7/input.txt")));
console.log(part2(fileToArray("day7/input.txt")));
