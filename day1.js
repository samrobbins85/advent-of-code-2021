const fs = require("fs");

function problem1(fileName) {
  return fs
    .readFileSync(fileName)
    .toString()
    .split("\n")
    .map((item) => parseInt(item, 10))
    .reduce(
      (previousValue, currentValue, currentIndex, array) =>
        (currentIndex === 1 ? 0 : previousValue) +
        (currentValue > array[currentIndex - 1] ? 1 : 0)
    );
}

console.log(problem1("1.1-input.txt"));
