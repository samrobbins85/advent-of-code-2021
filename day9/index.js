import { fileToArray } from "../common/utils.js";

export function part1(array) {
  const input = array.map((item) =>
    Array.from(item).map((char) => parseInt(char, 10))
  );
  let output = [];
  input.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (
        cell < (input?.[y]?.[x - 1] ?? 10) &&
        cell < (input?.[y]?.[x + 1] ?? 10) &&
        cell < (input?.[y + 1]?.[x] ?? 10) &&
        cell < (input?.[y - 1]?.[x] ?? 10)
      ) {
        output.push(cell + 1);
      }
    })
  );

  return output.reduce((prev, curr) => prev + curr);
}

export function part2(array) {
  const input = array.map((item) =>
    Array.from(item).map((char) => parseInt(char, 10))
  );
  let outArr = JSON.parse(JSON.stringify(input));
  let outCoords = [];
  input.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (
        cell < (input?.[y]?.[x - 1] ?? 10) &&
        cell < (input?.[y]?.[x + 1] ?? 10) &&
        cell < (input?.[y + 1]?.[x] ?? 10) &&
        cell < (input?.[y - 1]?.[x] ?? 10)
      ) {
        outCoords.push([y, x]);
        outArr[y][x] = cell + 1;
      } else {
        outArr[y][x] = 0;
      }
    })
  );
  function getAdditionalCoords(coord) {
    let coords = [];
    if (input?.[coord[0]]?.[coord[1] - 1] < 9) {
      coords.push([coord[0], coord[1] - 1]);
    }
    if (input?.[coord[0]]?.[coord[1] + 1] < 9) {
      coords.push([coord[0], coord[1] + 1]);
    }
    if (input?.[coord[0] + 1]?.[coord[1]] < 9) {
      coords.push([coord[0] + 1, coord[1]]);
    }
    if (input?.[coord[0] - 1]?.[coord[1]] < 9) {
      coords.push([coord[0] - 1, coord[1]]);
    }
    return coords;
  }
  const result = outCoords
    .map((item) => {
      let includedCells = input.map((row) => row.map(() => 0));
      includedCells[item[0]][item[1]] = 1;
      let newItems = [item];
      while (newItems.length > 0) {
        let tempNewItems = [];
        newItems.forEach((newItem) => {
          const addi = getAdditionalCoords(newItem);
          addi.forEach((entry) => {
            if (includedCells[entry[0]][entry[1]] === 0) {
              tempNewItems.push(entry);
            }
            includedCells[entry[0]][entry[1]] = 1;
          });
        });
        newItems = tempNewItems;
      }

      return includedCells.flat().reduce((prev, curr) => prev + curr);
    })
    .sort((first, second) => second - first);
  return result[0] * result[1] * result[2];
}

function part2Recurse(array) {
  const input = array.map((item) =>
    Array.from(item).map((char) => parseInt(char, 10))
  );
  let outArr = JSON.parse(JSON.stringify(input));
  let outCoords = [];
  input.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (
        cell < (input?.[y]?.[x - 1] ?? 10) &&
        cell < (input?.[y]?.[x + 1] ?? 10) &&
        cell < (input?.[y + 1]?.[x] ?? 10) &&
        cell < (input?.[y - 1]?.[x] ?? 10)
      ) {
        outCoords.push([y, x]);
        outArr[y][x] = 1;
      } else {
        outArr[y][x] = 0;
      }
    })
  );
  return outCoords
    .map((item) => {
      const filledCoords = [];
      function fill(node) {
        if (
          input?.[node[0]]?.[node[1]] === undefined ||
          filledCoords.includes(`${node[0]},${node[1]}`) ||
          input[node[0]][node[1]] === 9
        ) {
          return;
        } else {
          filledCoords.push(`${node[0]},${node[1]}`);
        }
        fill([node[0] + 1, node[1]]);
        fill([node[0] - 1, node[1]]);
        fill([node[0], node[1] + 1]);
        fill([node[0], node[1] - 1]);
      }
      fill(item);
      return filledCoords.length;
    })
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((prev, next) => prev * next);
}

console.log(part1(fileToArray("day9/input.txt")));
console.log(part2(fileToArray("day9/input.txt")));
