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
  // Split each string into an array
  const split = data.map((item) => Array.from(item));
  // Build an empty matrix
  const newArr = Array.from({ length: data[0].length }, () =>
    Array.from({ length: data.length })
  );
  // Rotate the matrix
  split.forEach((item, line) => {
    item.forEach((char, index) => {
      newArr[index][line] = char;
    });
  });
  let gamma = newArr
    .map((row) => row.map((item) => parseInt(item, 10)))
    .map((row) => row.reduce((curr, prev) => curr + prev))
    .map((item) => +(item > data.length / 2));
  let epsilon = [...gamma];
  gamma = parseInt(gamma.join(""), 2);
  epsilon = parseInt(epsilon.map((item) => +!item).join(""), 2);
  return gamma * epsilon;
}

function part2(data) {
  // Oxygen
  let oxygenData = [...data];
  let oxygenPosition = 0;
  while (oxygenData.length > 1) {
    const atIndex = oxygenData.map(
      (item) => parseInt(item[oxygenPosition]),
      10
    );
    let sum = atIndex.reduce((prev, curr) => prev + curr);
    let mostCommon = +(sum >= atIndex.length / 2);
    oxygenData = oxygenData.filter((_, index) => atIndex[index] === mostCommon);
    oxygenPosition += 1;
  }
  // CO2
  let co2Data = [...data];
  let co2Position = 0;
  while (co2Data.length > 1) {
    const atIndex = co2Data.map((item) => parseInt(item[co2Position]), 10);
    let sum = atIndex.reduce((prev, curr) => prev + curr);
    let mostCommon = +(sum < atIndex.length / 2);
    co2Data = co2Data.filter((_, index) => atIndex[index] === mostCommon);
    co2Position += 1;
  }
  return parseInt(co2Data[0], 2) * parseInt(oxygenData[0], 2);
}

console.log(part1(fileToArray("day3/input.txt")));
console.log(part2(fileToArray("day3/input.txt")));
