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

function part1(array) {
  let { draws, splitArray } = preProcess(array);
  let winningBoard, result;
  draws.some((element) => {
    //   Remove called elements
    splitArray = splitArray.map((board) =>
      board.map((row) => row.map((item) => (item === element ? "" : item)))
    );
    // Do the checks
    let isBingoRow = splitArray.findIndex((board) =>
      board.some((row) => row.every((element) => element === ""))
    );
    let isBingoColumn = splitArray.findIndex((board) =>
      board.some((row, x) => row.every((_, y) => board[y][x] === ""))
    );
    if (isBingoRow !== -1 || isBingoColumn !== -1) {
      result =
        splitArray[isBingoColumn || isBingoRow]
          .map((row) =>
            row
              .filter(Boolean)
              .reduce((prev, curr) => prev + parseInt(curr, 10), 0)
          )
          .reduce((prev, curr) => prev + curr) * element;
      return true;
    }
  });
  return result;
}

function part2(array) {
  let { draws, splitArray } = preProcess(array);
  let winningBoard, result;
  let remainingBoards = [...Array(splitArray.length).keys()];
  draws.some((element) => {
    splitArray = splitArray.map((board) =>
      board.map((row) => row.map((item) => (item === element ? "" : item)))
    );
    splitArray.map((board, boardIndex) =>
      board.some((row, x) => {
        const rowCheck = row.every((element) => element === "");
        const columnCheck = row.every((_, y) => board[y][x] === "");
        if (rowCheck || columnCheck) {
          if (
            remainingBoards.length === 1 &&
            remainingBoards[0] === boardIndex
          ) {
            winningBoard = boardIndex;
          }
          remainingBoards = remainingBoards.filter(
            (item) => item !== boardIndex
          );
          return true;
        }
      })
    );

    if (winningBoard) {
      result =
        splitArray[winningBoard]
          .map((row) =>
            row
              .filter(Boolean)
              .reduce((prev, curr) => prev + parseInt(curr, 10), 0)
          )
          .reduce((prev, curr) => prev + curr) * element;
      return true;
    }
  });

  return result;
}

console.log(part1(fileToArray("day4/input.txt")));
console.log(part2(fileToArray("day4/input.txt")));
