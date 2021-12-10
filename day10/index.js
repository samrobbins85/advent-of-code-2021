import { fileToArray } from "../common/utils.js";

function processEntry(array) {
  const opening = ["(", "[", "{", "<"];
  const closing = [")", "]", "}", ">"];
  const penalties = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };
  let stack = [];
  let score = 0;
  array.forEach((character) => {
    if (opening.includes(character)) {
      stack.push(character);
    } else {
      const top = stack.pop();
      if (!(opening.indexOf(top) === closing.indexOf(character))) {
        score += penalties[character];
      }
    }
  });
  return { score, stack };
}

export function part1(array) {
  const input = array.map((item) => Array.from(item));
  const out = input.map((row) => {
    const { score } = processEntry(row);
    return score;
  });
  return out.reduce((prev, curr) => prev + curr);
}

export function part2(array) {
  const input = array.map((item) => Array.from(item));
  const completion = {
    "(": 1,
    "[": 2,
    "{": 3,
    "<": 4,
  };
  const out = input.map((row) => {
    const { score, stack } = processEntry(row);
    if (score === 0 && stack.length > 0) {
      return stack
        .map((item) => completion[item])
        .reduceRight((prev, curr) => prev * 5 + curr, 0);
    }

    return null;
  });
  const sorted = out.filter(Boolean).sort((a, b) => a - b);
  return sorted[Math.round(sorted.length / 2) - 1];
}

console.log(part1(fileToArray("day10/input.txt")));
console.log(part2(fileToArray("day10/input.txt")));
