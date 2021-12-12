import { fileToArray } from "../common/utils.js";

const opening = ["(", "[", "{", "<"];
const closing = [")", "]", "}", ">"];
const penalties = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
};
const completion = {
    "(": 1,
    "[": 2,
    "{": 3,
    "<": 4,
};
function processEntry(array) {
    let stack = [];
    let score = 0;
    array.forEach((character) => {
        if (opening.includes(character)) {
            stack.push(character);
        } else if (
            !(opening.indexOf(stack.pop()) === closing.indexOf(character))
        ) {
            score += penalties[character];
        }
    });
    return { score, stack };
}

export function part1(array) {
    return array
        .map((item) => processEntry(Array.from(item)).score)
        .reduce((prev, curr) => prev + curr);
}

export function part2(array) {
    const out = array
        .flatMap((row) => {
            const { score, stack } = processEntry(Array.from(row));
            if (score === 0 && stack.length > 0) {
                return [
                    stack
                        .map((item) => completion[item])
                        .reduceRight((prev, curr) => prev * 5 + curr, 0),
                ];
            }

            return [];
        })
        .sort((a, b) => a - b);
    return out[Math.floor(out.length / 2)];
}

console.log(part1(fileToArray("day10/input.txt")));
console.log(part2(fileToArray("day10/input.txt")));
