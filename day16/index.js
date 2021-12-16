import { fileToArray } from "../common/utils.js";

export function part1(array) {
    const input = Array.from(array[0])
        .map((character) =>
            parseInt(character, 16).toString(2).padStart(4, "0")
        )
        .join("");
    const version = parseInt(input.substring(0, 3), 2);
    const typeID = parseInt(input.substring(3, 6), 2);
    if (typeID === 4) {
        const remaining = input.substring(6);
        const chunks = remaining.match(/.{1,5}/g);
        const final = parseInt(
            chunks
                .map((item) => item.substring(1))
                .filter((item) => !/^0*$/.test(item))
                .join(""),
            2
        );

        return final;
    } else {
        // Operator packet
        const lengthTypeID = input.substring(6, 7);
        console.log(lengthTypeID);
        if (lengthTypeID === "0") {
            const lengthSubPacket = parseInt(input.substring(7, 22), 2);
            console.log(lengthSubPacket);
        }
    }
    console.log({ version, typeID });
    console.log(input);
    return array;
}

console.log(part1(fileToArray("day16/input_short.txt")));
