import { fileToArray } from "../common/utils.js";

function adjacentNodes(paths, node) {
    return paths
        .filter((path) => path[0] === node || path[1] === node)
        .map((item) => (item[0] === node ? item[1] : item[0]));
}

export function part1(array) {
    const paths = array.map((path) => path.split("-"));
    const startingNodes = adjacentNodes(paths, "start");
    let all_paths = [];
    function visitAdjacentNodes(current_path) {
        const next_nodes = adjacentNodes(paths, current_path.at(-1));
        next_nodes.forEach((cave) => {
            let tpath = [...current_path];
            tpath.push(cave);
            if (cave === "end") {
                all_paths.push(tpath);
            } else if (
                cave !== "start" &&
                (cave === cave.toUpperCase() || !current_path.includes(cave))
            ) {
                visitAdjacentNodes(tpath);
            }
        });
    }
    startingNodes.forEach((node) => visitAdjacentNodes(["start", node]));
    return all_paths.length;
}

export function part2(array) {
    const paths = array.map((path) => path.split("-"));
    const startingNodes = adjacentNodes(paths, "start");
    let all_paths = [];
    function visitAdjacentNodes(current_path, doubleCave) {
        const next_nodes = adjacentNodes(paths, current_path.at(-1));
        next_nodes.forEach((cave) => {
            let tpath = [...current_path];
            tpath.push(cave);
            if (cave === "start") {
                return;
            } else if (cave === "end") {
                all_paths.push(tpath);
            } else if (
                cave === cave.toUpperCase() ||
                !current_path.includes(cave)
            ) {
                visitAdjacentNodes(tpath, doubleCave);
            } else if (cave === cave.toLowerCase() && doubleCave === "") {
                visitAdjacentNodes(tpath, cave);
            }
        });
    }
    startingNodes.forEach((node) => visitAdjacentNodes(["start", node], ""));
    return all_paths.length;
}

console.log(part1(fileToArray("day12/input.txt")));
console.log(part2(fileToArray("day12/input.txt")));
