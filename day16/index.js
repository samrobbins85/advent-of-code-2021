import { fileToArray } from "../common/utils.js";

function getHeader(string) {
    const version = parseInt(string.substring(0, 3), 2);
    const typeID = parseInt(string.substring(3, 6), 2);
    return { version, typeID };
}

function typeIdFour(chunks) {
    return parseInt(
        chunks
            .map((item) => item.substring(1))
            .filter((item) => !/^0*$/.test(item))
            .join(""),
        2
    );
}

function lengthTypeIdZero(remainder, length) {
    const trimmedRemainder = remainder.substring(0, length);
    let versionNumberSum = 0;
    while (trimmedRemainder !== "") {
        const { version, typeID } = getHeader(trimmedRemainder);
        versionNumberSum += version;
        if (typeID === 4) {
            const chunks = trimmedRemainder.substring(6).match(/.{1,5}/g);
            const endOfString = chunks.findIndex((item) => item[0] === "0");
            const thisSection = chunks.slice(0, endOfString + 1);
            // Don't need to do anything with thisSection yet
            const nextSection = chunks.slice(endOfString + 1);
            trimmedRemainder = nextSection.join("");
        }
    }
}

function ProcessString(input) {
    const { version, typeID } = getHeader(input);
    if (typeID === 4) {
        console.log("Found a 4 type");
        const remaining = input.substring(6);
        const chunks = remaining.match(/.{1,5}/g);
        const final = typeIdFour(chunks);
        return final;
    } else {
        // Operator packet
        console.log("Found an other type");
        const lengthTypeID = input.substring(6, 7);
        console.log(lengthTypeID);
        if (lengthTypeID === "0") {
            console.log("Length Type ID is 0");
            const lengthSubPacket = parseInt(input.substring(7, 22), 2);
            lengthTypeIdZero(input.substring(22), lengthSubPacket);
        } else {
            console.log("Length type ID is 1");
        }
    }
}

export function part1(array) {
    const input = Array.from(array[0])
        .map((character) =>
            parseInt(character, 16).toString(2).padStart(4, "0")
        )
        .join("");
    // const version = parseInt(input.substring(0, 3), 2);
    // const typeID = parseInt(input.substring(3, 6), 2);
    console.log(ProcessString(input));
    // const { version, typeID } = getHeader(input);
    // if (typeID === 4) {
    //     const remaining = input.substring(6);
    //     const chunks = remaining.match(/.{1,5}/g);
    //     const final = typeIdFour(chunks);

    //     return final;
    // } else {
    //     // Operator packet
    //     const lengthTypeID = input.substring(6, 7);
    //     console.log(lengthTypeID);
    //     if (lengthTypeID === "0") {
    //         const lengthSubPacket = parseInt(input.substring(7, 22), 2);
    //         console.log("Remainder:");
    //         lengthTypeIdZero(input.substring(22), lengthSubPacket);
    //         console.log(lengthSubPacket);
    //     }
    // }
    return array;
}

console.log(part1(fileToArray("day16/input_short.txt")));
