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
