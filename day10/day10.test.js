import { part1, part2 } from '.';
import { fileToArray } from '../common/utils.js';

test('Problem 1 works successfully', () => {
    expect(part1(fileToArray('day10/input.txt'))).toBe(389589);
});

test('Problem 2 works successfully', () => {
    expect(part2(fileToArray('day10/input.txt'))).toBe(1190420163);
});
