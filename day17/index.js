import { fileToArray } from "../common/utils.js";

function part1(array) {
    const input = array[0].split("=");
    console.log(input);
    const x = input[1]
        .split(",")[0]
        .split("..")
        .map((x) => parseInt(x, 10));
    const y = input[2].split("..").map((x) => parseInt(x, 10));
    let largestY = 0;
    for (let xV = 0; xV < 9000; xV++) {
        for (let yV = -9000; yV < 9000; yV++) {
            let copiedyV = yV;
            let copiedxV = xV;
            let tempLargestY = 0;
            let xP = 0;
            let yP = 0;
            function step() {
                xP += copiedxV;
                yP += copiedyV;
                copiedyV -= 1;
                if (copiedxV > 0) {
                    copiedxV -= 1;
                }
            }
            for (let i = 0; i < 9000; i++) {
                step();
                if (yP > tempLargestY) {
                    tempLargestY = yP;
                }
                if (xP >= x[0] && xP <= x[1] && yP >= y[0] && yP <= y[1]) {
                    if (tempLargestY > largestY) {
                        largestY = tempLargestY;
                    }
                    break;
                }
                if (xP > x[1]) {
                    break;
                }
            }
        }
    }

    return largestY;
}

function part2(array) {
    const input = array[0].split("=");
    console.log(input);
    const x = input[1]
        .split(",")[0]
        .split("..")
        .map((x) => parseInt(x, 10));
    const y = input[2].split("..").map((x) => parseInt(x, 10));
    let countHit = 0;
    for (let xV = 0; xV < 9000; xV++) {
        for (let yV = -9000; yV < 9000; yV++) {
            let copiedyV = yV;
            let copiedxV = xV;
            let xP = 0;
            let yP = 0;
            function step() {
                xP += copiedxV;
                yP += copiedyV;
                copiedyV -= 1;
                if (copiedxV > 0) {
                    copiedxV -= 1;
                }
            }
            for (let i = 0; i < 9000; i++) {
                step();

                if (xP >= x[0] && xP <= x[1] && yP >= y[0] && yP <= y[1]) {
                    countHit += 1;
                    break;
                }
                if (xP > x[1]) {
                    break;
                }
            }
        }
    }

    return countHit;
}

console.log(part2(fileToArray("day17/input.txt")));

// X velocity must be less than the end of the target. Bounded by 0
// Y velocity must be less than the bottom of the target (in the negative).
