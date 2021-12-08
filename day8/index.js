import { fileToArray } from "../common/utils.js";

function part1(array) {
  return array
    .map((item) =>
      item
        .split(" | ")[1]
        .split(" ")
        .filter((item) => [2, 3, 4, 7].includes(item.length))
    )
    .flat().length;
}

console.log(part1(fileToArray("day8/input.txt")));
