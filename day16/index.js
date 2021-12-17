import { fileToArray } from "../common/utils.js";

function getHeader(string) {
    const version = parseInt(string.substring(0, 3), 2);
    const typeID = parseInt(string.substring(3, 6), 2);
    return { version, typeID };
}

function typeIdFour(chunks) {
    console.log(chunks);
    const endOfString = chunks.findIndex((item) => item[0] === "0");
    // Nothing to do here yet
    const thisSection = chunks.slice(0, endOfString + 1);
    const nextSection = chunks.slice(endOfString + 1);
    const trimmedRemainder = nextSection.join("");
    return trimmedRemainder;
}

export function part1(array) {
    const input = Array.from(array[0])
        .map((character) =>
            parseInt(character, 16).toString(2).padStart(4, "0")
        )
        .join("");
    let score = 0;
    function processString(input, remainingSubPackets) {
        if (/^0*$/.test(input) || input.length === 0) {
            // The remainder of the string is 0, so just padding
            return;
        }
        console.log(`input: ${input}`);
        const { version, typeID } = getHeader(input);
        score += version;
        console.log(`Adding ${version} to score`);
        if (typeID === 4) {
            console.log("Found a Literal Packet");
            const remaining = input.substring(6);
            const chunks = remaining.match(/.{1,5}/g);
            const nextSection = typeIdFour(chunks);
            processString(nextSection);
        } else {
            // Operator packet
            console.log(
                `Found an Operator Packet: typeID:${typeID}, version:${version}`
            );
            const lengthTypeID = input.substring(6, 7);
            if (lengthTypeID === "0") {
                console.log("Length Type ID is 0");
                const lengthSubPacket = parseInt(input.substring(7, 22), 2);
                processString(input.substring(22, 22 + lengthSubPacket));
                processString(input.substring(22 + lengthSubPacket));
            } else {
                // Being lazy with this one, will likely need more work
                console.log("Length type ID is 1");
                const numberSubPacket = parseInt(input.substring(7, 18), 2);
                console.log(`Number of subpackets is ${numberSubPacket}`);
                processString(input.substring(18));
            }
        }
    }
    console.log(processString(input));
    return score;
}
console.log(part1(fileToArray("day16/input.txt")));
