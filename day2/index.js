import { fileToArray } from "../common/utils.js";

function stringToElements(string) {
    const split = string.split(" ");
    const direction = split[0];
    const amount = parseInt(split[1], 10);
    return { direction, amount };
}

export function problem1(input) {
    let horizontal = 0;
    let depth = 0;
    input.forEach((line) => {
        const { direction, amount } = stringToElements(line);
        switch (direction) {
            case "forward":
                horizontal += amount;
                break;
            case "down":
                depth += amount;
                break;
            case "up":
                depth -= amount;
                break;
            default:
                console.log("An error has occurred");
        }
    });
    return horizontal * depth;
}

function oneLineProblem1(input) {
    return input
        .map((item) => item.split(" "))
        .map((item) => [item[0], parseInt(item[1], 10)])
        .reduce(
            (prev, curr) => [
                prev[0] + (curr[0] === "forward" ? curr[1] : 0),
                prev[1] +
                    (curr[0] === "down"
                        ? curr[1]
                        : curr[0] === "up"
                        ? -curr[1]
                        : 0),
            ],
            [0, 0]
        )
        .reduce((prev, curr) => prev * curr);
}

export function problem2(input) {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;
    input.forEach((line) => {
        const { direction, amount } = stringToElements(line);
        switch (direction) {
            case "forward":
                horizontal += amount;
                depth += aim * amount;
                break;
            case "down":
                aim += amount;
                break;
            case "up":
                aim -= amount;
                break;
            default:
                console.log("An error has occurred");
        }
    });
    return horizontal * depth;
}

console.log(problem1(fileToArray("day2/input.txt")));
console.log(problem2(fileToArray("day2/input.txt")));
