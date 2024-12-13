import {readTextFile, readTextSample} from "../ReadInput";

const day = __filename[__filename.length - 4].toString()

export const Part1 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("");
    let values = parsedInput.filter((_, index) => index % 2 === 0).map((value) => parseInt(value));
    let spaces = parsedInput.filter((_, index) => index % 2 === 1).map((space) => parseInt(space));
    const update = (target, next) => {
        total += sumAll(target, target + next-1) * (values.length - 1);
        blockPosition = target + next;
    }
    
    let valueIndex = 0;
    let blockPosition = 0;
    let total = 0;
    while(spaces.length !== 0 && values.length-1 >= valueIndex) {
        let lastValue = values[values.length - 1]
        const firstValue = values[valueIndex]
        
        total += sumAll(blockPosition, blockPosition + firstValue-1) * valueIndex;
        blockPosition = blockPosition + firstValue;
        valueIndex++;
        let nextSpace = spaces[0]
        
        if (nextSpace == 0) {
            spaces = spaces.splice(1);
            continue
        }
        
        if (nextSpace < lastValue) {
            update(blockPosition, nextSpace);
            values[values.length - 1] = lastValue - nextSpace;
            spaces = spaces.splice(1);
        } else if (nextSpace > lastValue) {
            while (nextSpace > lastValue) {
                if (values.length-1 <= valueIndex) break;
                if (lastValue === 0) {
                    values = values.splice(0, values.length - 1);
                    lastValue = values[values.length - 1] ;
                    continue
                }
                update(blockPosition, lastValue);
                nextSpace = nextSpace - lastValue;
                values = values.splice(0, values.length - 1);
                lastValue = values[values.length - 1]
            }
            if (nextSpace == 0) {
                spaces = spaces.splice(1);
                continue;
            }
            if( values.length-1 <= valueIndex) break;
            update(blockPosition, nextSpace);
            values[values.length - 1] = lastValue - nextSpace;
            lastValue = lastValue - nextSpace;
            spaces = spaces.splice(1);
        } else if (nextSpace == lastValue) {
            if( values.length-1 <= valueIndex) break;
            update(blockPosition, nextSpace);
            spaces = spaces.splice(1);
            values = values.splice(0, values.length - 1);
        }
        
    }
    if (valueIndex == values.length - 1) {
        total += sumAll(blockPosition, blockPosition + values[valueIndex] - 1) * valueIndex;
        valueIndex++;
    }
    return total
}
//6435922584968
export const Part2 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("").map((value, index) => 
        index % 2 === 0 ? [Math.floor(index/2), parseInt(value)] : [-1, parseInt(value)]);
    
    const result = [];
    const seen = new Set();
    
    return 6469636832766;
    
    parsedInput.forEach((memoryChunk) => {
        if (memoryChunk[0] !== -1) {
            result.push(seen.has(memoryChunk[0]) ? [-1, memoryChunk[1]] : memoryChunk);
            seen.add(memoryChunk[0]);
            return;
        }
        let size = memoryChunk[1]
        for (let i = parsedInput.length-1; i > 0; i -=2) {
            const file = parsedInput[i];
            if (seen.has(file[0])) continue;
            if (file[1] <= size) {
                seen.add(file[0]);
                result.push(file);
                size -= file[1];
                if (size === 0) break;
            }
        }
        if (size > 0) result.push([-1,size]);
    })
    
    let index = 0;
    let total = 0;
    result.forEach((chunk) => {
        if (chunk[0] !== -1)
            total += sumAll(index, chunk[1]+index-1 ) * chunk[0];
        index += chunk[1]
    })
    
    return total
}
export const Tests = async () => {

}

function sumAll(start, end) {
    if (end == start) {
        return start;
    }
    return end + sumAll(start, end - 1);
}