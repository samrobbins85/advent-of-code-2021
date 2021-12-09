import { fileToArray } from "../common/utils.js";

function preProcess(array) {
  const draws = array.shift().split(",");
  let newArr = [];
  let index = -1;
  array.forEach((element) => {
    if (!element) {
      index += 1;
      newArr[index] = [];
    } else {
      newArr[index].push(element);
    }
  });
  let splitArray = newArr
    .map((board) => board.map((row) => row.split(" ").filter(Boolean)))
    .filter((item) => item.length);
  return { draws, splitArray };
}

const removeElement = (array, element) =>
  array.map((board) =>
    board.map((row) => row.map((item) => (item === element ? "" : item)))
  );

const bingoSum = (array) =>
  array
    .map((row) =>
      row.filter(Boolean).reduce((prev, curr) => prev + parseInt(curr, 10), 0)
    )
    .reduce((prev, curr) => prev + curr);

export function part1(array) {
  let { draws, splitArray } = preProcess(array);
  let result;
  draws.some((element) => {
    splitArray = removeElement(splitArray, element);
    let bingoRow = splitArray.findIndex((board) =>
      board.some((row) => row.every((element) => element === ""))
    );
    let bingoColumn = splitArray.findIndex((board) =>
      board.some((row, x) => row.every((_, y) => board[y][x] === ""))
    );
    if (bingoRow !== -1 || bingoColumn !== -1) {
      result = bingoSum(splitArray[bingoColumn || bingoRow]) * element;
      return true;
    }
  });
  return result;
}

export function part2(array) {
  let { draws, splitArray } = preProcess(array);
  let result;
  let remainingBoards = [...Array(splitArray.length).keys()];
  draws.some((element) => {
    splitArray = removeElement(splitArray, element);
    const index = splitArray.findIndex((board, boardIndex) =>
      board.some((row, x) => {
        const check =
          row.every((element) => element === "") ||
          row.every((_, y) => board[y][x] === "");
        if (check) {
          if (
            remainingBoards.length === 1 &&
            remainingBoards[0] === boardIndex
          ) {
            return true;
          }
          remainingBoards = remainingBoards.filter(
            (item) => item !== boardIndex
          );
        }
      })
    );

    if (index != -1) {
      result = bingoSum(splitArray[index]) * element;
      return true;
    }
  });

  return result;
}

console.log(part1(fileToArray("day4/input.txt")));
console.log(part2(fileToArray("day4/input.txt")));
