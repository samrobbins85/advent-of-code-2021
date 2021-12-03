import { fileToArray } from "../common/utils.js";

const data = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

function part1(data) {
  const binary = [...Array(data[0].length).keys()].map(
    (item) =>
      +(
        data
          .map((line) => parseInt(line[item], 10))
          .reduce((prev, curr) => prev + curr) >
        data.length / 2
      )
  );
  return (
    parseInt(binary.join(""), 2) *
    parseInt(binary.map((item) => +!item).join(""), 2)
  );
}

function part2(data) {
  function getResult(data, flip) {
    let myPosition = 0;
    while (data.length > 1) {
      const atIndex = data.map((item) => parseInt(item[myPosition]), 10);
      let sum = atIndex.reduce((prev, curr) => prev + curr);
      let mostCommon = flip
        ? +(sum >= atIndex.length / 2)
        : +(sum < atIndex.length / 2);
      data = data.filter((_, index) => atIndex[index] === mostCommon);
      myPosition += 1;
    }
    return parseInt(data[0], 2);
  }
  return getResult(data, true) * getResult(data, false);
}

console.log(part1(fileToArray("day3/input.txt")));
console.log(part2(fileToArray("day3/input.txt")));
