import { fileToArray } from "../common/utils.js";

function part1(array) {
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

  //   Splitting each array into individual elements
  let splitArray = newArr
    .map((board) => board.map((row) => row.split(" ").filter(Boolean)))
    .filter((item) => item.length);
  let winningBoard, result;
  draws.some((element) => {
    //   Remove called elements
    splitArray = splitArray.map((board) =>
      board.map((row) => row.map((item) => (item === element ? "" : item)))
    );
    // Do the checks
    let isBingoRow = splitArray.some((board, boardIndex) =>
      board.some((row) => {
        const check = row.every((element) => element === "");
        check && (winningBoard = boardIndex);
        return check;
      })
    );
    let isBingoColumn = splitArray.some((board, boardIndex) =>
      board.some((row, x) => {
        const check = row.every((_, y) => board[y][x] === "");
        check && (winningBoard = boardIndex);
        return check;
      })
    );
    if (isBingoRow || isBingoColumn) {
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

function part2(array) {
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

  //   Splitting each array into individual elements
  let splitArray = newArr
    .map((board) => board.map((row) => row.split(" ").filter(Boolean)))
    .filter((item) => item.length);
  let winningBoard, result;
  let remainingBoards = [...Array(splitArray.length).keys()];
  draws.some((element) => {
    //   Remove called elements
    splitArray = splitArray.map((board) =>
      board.map((row) => row.map((item) => (item === element ? "" : item)))
    );
    // Do the checks
    splitArray.map((board, boardIndex) =>
      board.map((row) => {
        const check = row.every((element) => element === "");
        if (check) {
          if (
            remainingBoards.length === 1 &&
            remainingBoards[0] === boardIndex
          ) {
            winningBoard = boardIndex;
          }
          remainingBoards = remainingBoards.filter(
            (item) => item !== boardIndex
          );
        }
      })
    );
    splitArray.map((board, boardIndex) =>
      board.map((row, x) => {
        const check = row.every((_, y) => board[y][x] === "");
        if (check) {
          if (
            remainingBoards.length === 1 &&
            remainingBoards[0] === boardIndex
          ) {
            winningBoard = boardIndex;
          }
          remainingBoards = remainingBoards.filter(
            (item) => item !== boardIndex
          );
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
