import { fileToArray } from "../common/utils.js";
function range(arr) {
  let [start, end] = arr;
  if (start > end) {
    [start, end] = [end, start];
  }
  return Array(end - start + 1)
    .fill()
    .map((_, i) => start + i);
}

function changingCoord(item) {
  if (item[0][0] === item[1][0]) {
    return [item[0][1], item[1][1]];
  } else {
    return [item[0][0], item[1][0]];
  }
}

function constantCoord(item) {
  if (item[0][0] === item[1][0]) {
    return item[0][0];
  } else {
    return item[0][1];
  }
}

function constantIdex(item) {
  if (item[0][0] === item[1][0]) {
    return 0;
  } else {
    return 1;
  }
}

function problem1(array) {
  const splitArray = array.map((item) =>
    item
      .split(" -> ")
      .map((coordinate) =>
        coordinate.split(",").map((item) => parseInt(item, 10))
      )
  );
  const hOrV = splitArray.filter(
    (item) => item[0][0] === item[1][0] || item[0][1] === item[1][1]
  );
  return hOrV
    .map((item) =>
      range(changingCoord(item)).map((it) =>
        constantIdex(item)
          ? `${it},${constantCoord(item)}`
          : `${constantCoord(item)},${it}`
      )
    )
    .flat()
    .filter(
      (a, index, array) =>
        array.indexOf(a) === index && array.lastIndexOf(a) !== index
    ).length;
}

console.log(problem1(fileToArray("day5/input.txt")));
