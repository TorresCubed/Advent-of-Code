import {readTextFile, readTextSample} from "../ReadInput";

const day = __filename.substring(__filename.length - 5,__filename.length - 3)

export const Part1 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n\n");
    
    const letterMap = new Map();
    parsedInput[0].split(", ").forEach(towel => {
        const res = letterMap.get(towel[0]);
        letterMap.set(towel[0], res  === undefined ? [towel] : [...res, towel])
    });
    
    let count = 0;
    parsedInput[1].split("\n").forEach((p) => {
        if(memoizeStringMatches(p, letterMap) > 0 ) {
            count++;
        }
    })

    return count;
}



const  memoize = (fn) =>  {
    const cache = new Map();
    return function(...args) {
        // Create a key from the arguments by converting them to a string
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key); // Return the cached result if available
        }
        const result = fn(...args); // Otherwise, compute the result
        cache.set(key, result); // Store the result in the cache
        return result;
    };
}

const stringMatches = (targetString:string , map) => {
    if (targetString.length === 0) return 1
    
    const res = map.get(targetString[0])
    if (res === undefined) return 0
    let count = 0;
    res.forEach((newSet: string) => {
        if (targetString.substring(0,newSet.length) !== newSet) {
            return;
        }
        count += memoizeStringMatches(targetString.substring(newSet.length), map)
    })
    return count;
}


const memoizeStringMatches = memoize(stringMatches);


export const Part2 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n\n");

    const letterMap = new Map();
    parsedInput[0].split(", ").forEach(towel => {
        const res = letterMap.get(towel[0]);
        letterMap.set(towel[0], res  === undefined ? [towel] : [...res, towel])
    });

    let count = 0;
    parsedInput[1].split("\n").forEach((p) => {
        count += memoizeStringMatches(p, letterMap)
    })
    
    return count
}

export const Tests = async () => {

}
