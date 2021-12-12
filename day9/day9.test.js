import { part1, part2 } from ".";
import { fileToArray } from "../common/utils.js";

test("Problem 1 works successfully", () => {
    expect(part1(fileToArray("day9/input.txt"))).toBe(588);
});

test("Problem 2 works successfully", () => {
    expect(part2(fileToArray("day9/input.txt"))).toBe(964712);
});
