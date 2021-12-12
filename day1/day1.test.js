import { problem1, problem2, preProcess } from '.';

test('Problem 1 works successfully', () => {
    expect(problem1(preProcess('day1/input.txt'))).toBe(1462);
});

test('Problem 2 works successfully', () => {
    expect(problem2(preProcess('day1/input.txt'))).toBe(1497);
});
