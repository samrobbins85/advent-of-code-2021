import { fileToArray } from "../common/utils.js";

export function part1(array) {
  return array
    .map((item) =>
      item
        .split(" | ")[1]
        .split(" ")
        .filter((item) => [2, 3, 4, 7].includes(item.length))
    )
    .flat().length;
}

function decode(input, numbers) {
  return Object.values(numbers).findIndex(
    (item) => item.sort().join(",") === Array.from(input).sort().join(",")
  );
}

export function part2(array) {
  return array
    .map((item) => {
      let charSet = item.split(" | ")[0].split(" ");
      let numbers = {};
      function removeValue(value, index) {
        numbers[index] = Array.from(value);
        charSet.splice(charSet.indexOf(value), 1);
      }
      function ofLength(length) {
        return charSet.filter((item) => item.length === length);
      }
      removeValue(ofLength(2)[0], 1);
      removeValue(ofLength(4)[0], 4);
      removeValue(ofLength(3)[0], 7);
      removeValue(ofLength(7)[0], 8);
      const three = ofLength(5).filter((arr) =>
        numbers[1].every((item) => arr.includes(item))
      )[0];
      removeValue(three, 3);
      const six = ofLength(6).filter(
        (arr) => !numbers[1].every((item) => arr.includes(item))
      )[0];
      removeValue(six, 6);
      const nine = ofLength(6).filter((arr) =>
        numbers[4].every((item) => arr.includes(item))
      )[0];
      removeValue(nine, 9);
      removeValue(ofLength(6)[0], 0);
      const c = numbers[8].filter((x) => !numbers[6].includes(x))[0];
      const two = charSet.filter((item) => Array.from(item).includes(c))[0];
      removeValue(two, 2);
      numbers[5] = Array.from(charSet[0]);
      let output = item.split(" | ")[1].split(" ");
      return parseInt(output.map((item) => decode(item, numbers)).join(""), 10);
    })
    .reduce((prev, curr) => prev + curr);
}

console.log(part1(fileToArray("day8/input.txt")));
console.log(part2(fileToArray("day8/input.txt")));
