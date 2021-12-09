import { fileToArray } from "../common/utils.js";

export const preProcess = (fileName) =>
  fileToArray(fileName).map((item) => parseInt(item, 10));

export function problem1(array) {
  return array.reduce(
    (previousValue, currentValue, currentIndex, array) =>
      previousValue + +(currentValue > array[currentIndex - 1]),
    0
  );
}

export function problem2(array) {
  return problem1(
    array
      .map((curr, index, arr) =>
        index + 2 < arr.length ? curr + arr[index + 1] + arr[index + 2] : null
      )
      .filter(Boolean)
  );
}
console.log(problem1(preProcess("day1/input.txt")));
console.log(problem2(preProcess("day1/input.txt")));
