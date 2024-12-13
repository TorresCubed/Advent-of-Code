import {readTextFile, readTextSample} from "../ReadInput";

const day = __filename.substring(__filename.length - 5,__filename.length - 3)

export const Part1 = async () => {
    // const input = await readTextFile(day)
    const input = await readTextSample()

    const parsedInput = input.trim().split(" ");
    
    let total = 0;
    parsedInput.forEach(stone => {
        total += performRules(parseInt(stone), 25)
    })
    
    return total
}

export const Part2 = async () => {
    // const input = await readTextFile(day)
    const input = await readTextSample()

    const parsedInput = input.trim().split(" ");

    let total = 0;
    parsedInput.forEach(stone => {
        total += memoizePerformRules(parseInt(stone), 75)
    })

    return total
}

export const Tests = async () => {

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


const addsBig = () => {
    let bigNum = 0;
    return function(...args) {
        bigNum++;
        return bigNum + args[0];
    };
}

const addBigBigger = addsBig()

const performRules = (stone, count) => {
    let total = 0;

    for (let i = count-1; i >= 0; i--) {
        if(stone === 0) {
            stone = 1;
        } else if ((Math.floor(Math.log10(stone))+1) % 2 == 0) {
            const count = (Math.floor(Math.log10(stone)))+1;
            const splitVal = Math.pow(10, count / 2)
            total += memoizePerformRules(stone % splitVal, i)
            stone = Math.floor(stone / splitVal)
        } else {
            stone *= 2024
        }
    }

    return total + 1;
}

const add = (fn) => {
    let bigNum = 0;
    return function(...args) {
        bigNum++;
        return bigNum + args[0];
    };
}

const memoizePerformRules = memoize(performRules)
