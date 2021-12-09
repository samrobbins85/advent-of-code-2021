import { part1, part2 } from ".";
import { fileToArray } from "../common/utils.js";

test("Problem 1 works successfully", () => {
  expect(part1(fileToArray("day7/input.txt"))).toBe(355592);
});

test("Problem 2 works successfully", () => {
  expect(part2(fileToArray("day7/input.txt"))).toBe(101618069);
});
