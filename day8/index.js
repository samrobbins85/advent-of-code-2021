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
      const one = charSet.filter((item) => item.length === 2)[0];
      charSet.splice(charSet.indexOf(one), 1);
      const four = charSet.filter((item) => item.length === 4)[0];
      charSet.splice(charSet.indexOf(four), 1);
      const seven = charSet.filter((item) => item.length === 3)[0];
      charSet.splice(charSet.indexOf(seven), 1);
      const eight = charSet.filter((item) => item.length === 7)[0];
      charSet.splice(charSet.indexOf(eight), 1);
      let numbers = {
        0: null,
        1: Array.from(one),
        2: null,
        3: null,
        4: Array.from(four),
        5: null,
        6: null,
        7: Array.from(seven),
        8: Array.from(eight),
        9: null,
      };
      const a = numbers[7].filter((x) => !numbers[1].includes(x))[0];
      const three = charSet
        .filter((item) => item.length === 5)
        .filter((arr) => numbers[1].every((item) => arr.includes(item)))[0];
      charSet.splice(charSet.indexOf(three), 1);
      numbers[3] = Array.from(three);
      const six = charSet
        .filter((item) => item.length === 6)
        .filter((arr) => !numbers[1].every((item) => arr.includes(item)))[0];
      charSet.splice(charSet.indexOf(six), 1);
      numbers[6] = Array.from(six);
      const nine = charSet
        .filter((item) => item.length === 6)
        .filter((arr) => numbers[4].every((item) => arr.includes(item)))[0];
      charSet.splice(charSet.indexOf(nine), 1);
      numbers[9] = Array.from(nine);
      const zero = charSet.filter((item) => item.length === 6)[0];
      numbers[0] = Array.from(zero);
      charSet.splice(charSet.indexOf(zero), 1);
      const c = numbers[8].filter((x) => !numbers[6].includes(x))[0];
      const two = charSet.filter((item) => Array.from(item).includes(c))[0];
      numbers[2] = Array.from(two);
      charSet.splice(charSet.indexOf(two), 1);
      numbers[5] = Array.from(charSet[0]);

      let output = item.split(" | ")[1].split(" ");
      return parseInt(output.map((item) => decode(item, numbers)).join(""), 10);
    })
    .reduce((prev, curr) => prev + curr);
}

console.log(part1(fileToArray("day8/input.txt")));
console.log(part2(fileToArray("day8/input.txt")));
