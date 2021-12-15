import { fileToArray } from "../common/utils.js";

export function part1(array) {
    const template = array.shift();
    array.shift();
    array = array.map((item) => Array.from(item.replace(" -> ", "")));
    let result = Array.from(template);
    for (let i = 0; i < 10; i++) {
        let addedItems = 0;
        [...result].forEach((item, index, arr) => {
            const insert_elem = array.filter(
                (pair) => pair[0] === item && pair[1] === arr[index + 1]
            )[0];
            if (insert_elem) {
                result.splice(index + 1 + addedItems, 0, insert_elem[2]);
                addedItems += 1;
            }
        });
    }
    const counts = {};
    result.forEach((item) => {
        counts[item] = counts[item] ? counts[item] + 1 : 1;
    });
    const sorted = Object.values(counts).sort((a, b) => a - b);
    return sorted.at(-1) - sorted[0];
}

export function part2(array) {
    const template = array.shift();
    array.shift();
    const pairs = array
        .map((item) => item.split(" -> ")[0])
        .reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {});
    array = array.map((item) => Array.from(item.replace(" -> ", "")));
    let result = Array.from(template);
    result.forEach((item, index) => {
        index < result.length - 1 &&
            (pairs[`${item}${result[index + 1]}`] += 1);
    });
    let all_counts = {};
    Array.from(template).forEach(
        (char) =>
            (all_counts[char] = all_counts[char] ? all_counts[char] + 1 : 1)
    );
    for (let i = 0; i < 40; i++) {
        let temp = JSON.parse(JSON.stringify(pairs));
        Object.keys(temp).forEach((item) => (temp[item] = 0));
        Object.keys(pairs).forEach((key) => {
            if (pairs[key] > 0) {
                const selected = array.filter(
                    (item) => item[0] === key[0] && item[1] === key[1]
                );
                if (selected) {
                    temp[`${selected[0][0]}${selected[0][1]}`] -= pairs[key];
                    temp[`${selected[0][0]}${selected[0][2]}`] += pairs[key];
                    temp[`${selected[0][2]}${selected[0][1]}`] += pairs[key];
                    all_counts[selected[0][2]] = all_counts[selected[0][2]]
                        ? all_counts[selected[0][2]] + pairs[key]
                        : pairs[key];
                }
            }
        });
        Object.keys(temp).forEach((key) => {
            pairs[key] += temp[key];
        });
    }
    const sorted = Object.values(all_counts).sort((a, b) => a - b);
    return sorted.at(-1) - sorted[0];
}
console.log(part1(fileToArray("day14/input.txt")));
console.log(part2(fileToArray("day14/input.txt")));
