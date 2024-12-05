import {readTextFile} from "../ReadInput";

const day = __filename[__filename.length - 4].toString()
export const Part1 = async () => {
    const input = await readTextFile(day)
    // const sample = await readTextSample()
    
    const arrayOne = [];
    const arrayTwo = [];
    
    const unorderedPairs = input.trim().split(/\r?\n/);
    
    unorderedPairs.forEach(pair => {
        const arrayedPair = pair.split(/\s+/);
        arrayOne.push(parseInt(arrayedPair[0]));
        arrayTwo.push(parseInt(arrayedPair[1]));
    })
    
    arrayOne.sort((a, b) => a - b);
    arrayTwo.sort((a, b) => a - b);
    
    let total = 0;
    
    for (let i = 0; i < arrayOne.length; i++) {
        total += Math.abs(arrayOne[i] - arrayTwo[i]);
    }

    return total
}

export const Part2 = async () => {
    const input = await readTextFile(day)

    const set: Set<number> = new Set();
    const dictionary = new Map();

    const unorderedPairs = input.trim().split(/\r?\n/);

    unorderedPairs.forEach(pair => {
        const arrayedPair = pair.split(/\s+/);
        set.add(parseInt(arrayedPair[0]));
        dictionary.set(parseInt(arrayedPair[1]), (dictionary.get(parseInt(arrayedPair[1])) ?? 0) + 1);
    })

    let total = 0;

    set.forEach(value => {
        total += value * (dictionary.get(value) ?? 0);
    })
    
    return total
}

export const Tests = async () => {
    
}