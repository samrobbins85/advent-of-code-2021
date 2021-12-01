const fs = require("fs");

const preProcess = (fileName) =>
  fs
    .readFileSync(fileName)
    .toString()
    .split("\n")
    .map((item) => parseInt(item, 10));

function problem1(array) {
  return array.reduce(
    (previousValue, currentValue, currentIndex, array) =>
      (currentIndex === 1 ? 0 : previousValue) +
      (currentValue > array[currentIndex - 1] ? 1 : 0)
  );
}

function problem2(array) {
  return array
    .map((curr, index, arr) =>
      index + 2 < arr.length ? curr + arr[index + 1] + arr[index + 2] : null
    )
    .filter(Boolean)
    .reduce(
      (previousValue, currentValue, currentIndex, array) =>
        (currentIndex === 1 ? 0 : previousValue) +
        (currentValue > array[currentIndex - 1] ? 1 : 0)
    );
}
console.log(problem1(preProcess("1.1-input.txt")));
console.log(problem2(preProcess("1.1-input.txt")));
