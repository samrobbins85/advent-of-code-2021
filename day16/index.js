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
    console.log("Literal value:");
    console.log(parseInt(thisSection, 2));
    const nextSection = chunks.slice(endOfString + 1);
    const trimmedRemainder = nextSection.join("");
    return { nextSection: trimmedRemainder, value: parseInt(thisSection, 2) };
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
            const { nextSection } = typeIdFour(chunks);
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

function part2Fresh(array) {
    const input = Array.from(array[0])
        .map((character) =>
            Array.from(
                parseInt(character, 16).toString(2).padStart(4, "0")
            ).map((item) => parseInt(item, 10))
        )
        .flat();
    let position = 0;
    function parseArray(array) {
        return parseInt(array.join(""), 2);
    }
    function nextNCharacters(length) {
        const characters = input.slice(position, position + length);
        position += length;
        return characters;
    }
    function readPacket() {
        position += 3;
        const typeID = parseArray(nextNCharacters(3));
        if (typeID === 4) {
            const numbers = [];
            while (true) {
                const [prefix, ...remaining] = nextNCharacters(5);
                numbers.push(...remaining);
                if (prefix === 0) break;
            }
            return parseArray(numbers);
        } else {
            const lengthTypeID = parseArray(nextNCharacters(1));
            let subValues = [];
            let morePackets;
            if (lengthTypeID === 0) {
                const subLengthMax = parseArray(nextNCharacters(15));
                const startPointer = position;
                morePackets = () => position - startPointer < subLengthMax;
            } else {
                const subCountMax = parseArray(nextNCharacters(11));
                morePackets = () => subValues.length < subCountMax;
            }
            while (morePackets()) subValues.push(readPacket());
            switch (typeID) {
                case 0:
                    return subValues.reduce((p, c) => p + c, 0);
                case 1:
                    return subValues.reduce((p, c) => p * c, 1);
                case 2:
                    return Math.min(...subValues);
                case 3:
                    return Math.max(...subValues);
                case 5:
                    return subValues[0] > subValues[1] ? 1 : 0;
                case 6:
                    return subValues[0] < subValues[1] ? 1 : 0;
                case 7:
                    return subValues[0] === subValues[1] ? 1 : 0;
            }
        }
    }
    return readPacket();
}

console.log(part2Fresh(fileToArray("day16/input.txt")));
