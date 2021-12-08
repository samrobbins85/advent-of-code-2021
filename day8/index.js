import { fileToArray } from "../common/utils.js";

function part1(array) {
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
  let mapping = Object.fromEntries(
    Object.entries(numbers).map(([k, v]) => [v.join(""), k])
  );
  const match = Object.keys(mapping).findIndex((string) => {
    const patternArray = Array.from(string);
    if (patternArray.sort().join(",") === Array.from(input).sort().join(",")) {
      return true;
    }
  });
  return Object.values(mapping)[match];
}

function part2(array) {
  return array
    .map((item) => {
      let charSet = item.split(" | ")[0].split(" ");
      let numbers = {};
      function removeValue(value, index) {
        numbers[index] = Array.from(value);
        charSet.splice(charSet.indexOf(value), 1);
      }
      const one = charSet.filter((item) => item.length === 2)[0];
      removeValue(one, 1);
      const four = charSet.filter((item) => item.length === 4)[0];
      removeValue(four, 4);
      const seven = charSet.filter((item) => item.length === 3)[0];
      removeValue(seven, 7);
      const eight = charSet.filter((item) => item.length === 7)[0];
      removeValue(eight, 8);
      const three = charSet
        .filter((item) => item.length === 5)
        .filter((arr) => numbers[1].every((item) => arr.includes(item)))[0];
      removeValue(three, 3);
      const six = charSet
        .filter((item) => item.length === 6)
        .filter((arr) => !numbers[1].every((item) => arr.includes(item)))[0];
      removeValue(six, 6);
      const nine = charSet
        .filter((item) => item.length === 6)
        .filter((arr) => numbers[4].every((item) => arr.includes(item)))[0];
      removeValue(nine, 9);
      const zero = charSet.filter((item) => item.length === 6)[0];
      removeValue(zero, 0);
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
