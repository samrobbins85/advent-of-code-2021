import { part1, part2 } from ".";
import { fileToArray } from "../common/utils.js";

test("Problem 1 works successfully", () => {
  expect(part1(fileToArray("day6/input.txt"))).toBe(345793);
});

test("Problem 2 works successfully", () => {
  expect(part2(fileToArray("day6/input.txt"))).toBe(1572643095893);
});
