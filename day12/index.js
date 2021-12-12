import { fileToArray } from "../common/utils.js";

function adjacentNodes(paths, node) {
    return paths
        .filter((path) => path[0] === node || path[1] === node)
        .map((item) => (item[0] === node ? item[1] : item[0]));
}

function part1(array) {
    const paths = array.map((path) => path.split("-"));
    const startingNodes = adjacentNodes(paths, "start");
    let all_paths = [];
    function visitAdjacentNodes(current_path) {
        const next_nodes = adjacentNodes(paths, current_path.at(-1));
        next_nodes.forEach((node) => {
            let tpath = [...current_path];
            tpath.push(node);
            if (node === "end") {
                all_paths.push(tpath);
            } else if (
                node !== "start" &&
                (node === node.toUpperCase() || !current_path.includes(node))
            ) {
                visitAdjacentNodes(tpath);
            }
        });
    }
    startingNodes.forEach((node) => visitAdjacentNodes(["start", node]));
    return all_paths.length;
}

function part2(array) {
    const paths = array.map((path) => path.split("-"));
    const startingNodes = adjacentNodes(paths, "start");
    let all_paths = [];
    function visitAdjacentNodes(current_path, doubleCave) {
        const next_nodes = adjacentNodes(paths, current_path.at(-1));
        next_nodes.forEach((node) => {
            let tpath = [...current_path];
            tpath.push(node);
            if (node === "end") {
                all_paths.push(tpath);
            } else if (
                node !== "start" &&
                (node === node.toUpperCase() || !current_path.includes(node))
            ) {
                visitAdjacentNodes(tpath, doubleCave);
            } else if (
                node !== "start" &&
                node === node.toLowerCase() &&
                doubleCave === ""
            ) {
                visitAdjacentNodes(tpath, node);
            }
        });
    }
    startingNodes.forEach((node) => visitAdjacentNodes(["start", node], ""));
    console.log(all_paths);
    return all_paths.length;
}

console.log(part1(fileToArray("day12/input.txt")));
console.log(part2(fileToArray("day12/input.txt")));
