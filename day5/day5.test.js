import { part1, part2 } from ".";
import { fileToArray } from "../common/utils.js";

test("Problem 1 works successfully", () => {
    expect(part1(fileToArray("day5/input_short.txt"))).toBe(5);
});

test("Problem 2 works successfully", () => {
    expect(part2(fileToArray("day5/input_short.txt"))).toBe(12);
});
