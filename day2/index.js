const fs = require("fs");

const preProcess = (fileName) =>
  fs.readFileSync(fileName).toString().split("\n");

function problem1(input) {
  let horizontal = 0;
  let depth = 0;
  input.forEach((element) => {
    const split = element.split(" ");
    const direction = split[0];
    const amount = parseInt(split[1], 10);
    switch (direction) {
      case "forward":
        horizontal += amount;
        break;
      case "down":
        depth += amount;
        break;
      case "up":
        depth -= amount;
        break;
      default:
        console.log("An error has occurred");
    }
  });
  return horizontal * depth;
}

function problem2(input) {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;
  input.forEach((element) => {
    const split = element.split(" ");
    const direction = split[0];
    const amount = parseInt(split[1], 10);
    switch (direction) {
      case "forward":
        horizontal += amount;
        depth += aim * amount;
        break;
      case "down":
        aim += amount;
        break;
      case "up":
        aim -= amount;
        break;
      default:
        console.log("An error has occurred");
    }
  });
  return horizontal * depth;
}

console.log(problem1(preProcess("day2/input.txt")));
console.log(problem2(preProcess("day2/input.txt")));
