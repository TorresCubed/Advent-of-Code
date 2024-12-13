import {readTextFile, readTextSample} from "../ReadInput";

const day = __filename[__filename.length - 4].toString()

export const Part1 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n").map(line => {
        const split = line.split(": ");
        const numbers = split[1].split(" ").map(n => parseInt(n));
        return [parseInt(split[0]), numbers];
    })
    
    const answer = parsedInput.filter(line => {
        return solveForVal(line[0], line[1].slice(1), line[1][0])
    }).map(result => {return result[0]})

    return answer.reduce((acc, val) => acc + val);
}

export const Part2 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n").map(line => {
        const split = line.split(": ");
        const numbers = split[1].split(" ").map(n => parseInt(n));
        return [parseInt(split[0]), numbers];
    })

    const answer = parsedInput.filter(line => {
        return solveForVal2(line[0], line[1].slice(1), line[1][0])
    }).map(result => {return result[0]})

    return answer.reduce((acc, val) => acc + val);
}

export const Tests = async () => {

}


const solveForVal = (targetNumber, availableNumbers, currentVal) => {
    if (availableNumbers.length == 0) return currentVal == targetNumber;

    const rest = availableNumbers.slice(1)

    return solveForVal(targetNumber, rest, currentVal + availableNumbers[0]) ||
        solveForVal(targetNumber, rest, currentVal * availableNumbers[0])
}

const solveForVal2 = (targetNumber, availableNumbers, currentVal) => {
    if (currentVal > targetNumber) return currentVal == targetNumber;
    if (availableNumbers.length == 1) {
        return currentVal + availableNumbers[0] == targetNumber ||
            currentVal * availableNumbers[0] == targetNumber ||
            parseInt(`${currentVal}${availableNumbers[0]}`) == targetNumber
    }

    const rest = availableNumbers.slice(1)

    return solveForVal2(targetNumber, rest, currentVal + availableNumbers[0]) ||
        solveForVal2(targetNumber, rest, currentVal * availableNumbers[0]) ||
        solveForVal2(targetNumber, rest, parseInt(`${currentVal}${availableNumbers[0]}`))
}

//622.05