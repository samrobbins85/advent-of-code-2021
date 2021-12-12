import { part1, part2 } from ".";
import { fileToArray } from "../common/utils.js";

test("Problem 1 works successfully", () => {
    expect(part1(fileToArray("day12/input.txt"))).toBe(4378);
});

test("Problem 2 works successfully", () => {
    expect(part2(fileToArray("day12/input.txt"))).toBe(133621);
});
