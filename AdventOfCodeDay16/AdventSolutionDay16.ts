import {readTextFile, readTextSample} from "../ReadInput";
import {Dir} from "node:fs";

const day = __filename.substring(__filename.length - 5,__filename.length - 3)

export const Part1 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n").map(line => line.split(''));

    const ending = [1, parsedInput[0].length-2];
    
    const map = new Map();

    const quantumReindeers = [{
        direction: [0,1],
        position: [parsedInput.length-2, 1],
        weight: 0
    }]
    
    // return 109496
    
    while (quantumReindeers.length > 0) {
        let min = Number.MAX_VALUE;
        let target = 0;
        quantumReindeers.forEach((reindeer, index) => {
            if (reindeer.weight < min) {
                min = reindeer.weight;
                target = index
            }
        })

        const temp = quantumReindeers[target]
        quantumReindeers[target] = quantumReindeers[quantumReindeers.length - 1];
        quantumReindeers[quantumReindeers.length - 1] = temp
        
        const currentReindeer = quantumReindeers.pop();
        if (currentReindeer === undefined) break
        const passable = {
            position: currentReindeer.position,
            direction: currentReindeer.direction
        }
        if (map.has(JSON.stringify(passable))) continue;
        
        map.set(JSON.stringify(passable), currentReindeer.weight)
        
        if (ending[0] === currentReindeer.position[0] && ending[1] === currentReindeer.position[1]) return currentReindeer.weight;
        const left = turnLeft(currentReindeer.direction);
        const right = turnRight(currentReindeer.direction);
        const newPos = [currentReindeer.position[0] + currentReindeer.direction[0], currentReindeer.position[1] + currentReindeer.direction[1]];
        const leftPos = [currentReindeer.position[0] + left[0], currentReindeer.position[1] + left[1]];
        const rightPos = [currentReindeer.position[0] + right[0], currentReindeer.position[1] + right[1]];
        
        [
            {
                direction: left,
                position: leftPos,
                weight: currentReindeer.weight + 1001
            },
            {
                direction: right,
                position: rightPos,
                weight: currentReindeer.weight + 1001
            },
            {
                direction: currentReindeer.direction,
                position: newPos,
                weight: currentReindeer.weight + 1
            }
        ].filter(future =>
            future.position[0] > 0 &&
            future.position[0] < parsedInput.length -1 &&
            future.position[1] > 0 &&
            future.position[1] < parsedInput[0].length -1 &&
            parsedInput[future.position[0]][future.position[1]] !== '#')
            .forEach(future => {
                quantumReindeers.push(future)
            });
        
        // quantumReindeers.sort((a, b) => b.weight - a.weight);
    }    
    
    return "Pending..."
}

export const Part2 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n").map(line => line.split(''));

    const ending = [parsedInput.length-2, 1];

    const map = new Map();

    const quantumReindeers = [{
        direction: [0,1],
        path: [],
        position: [1, parsedInput[0].length-2],
        weight: 0
    }]

    // return 551
    
    let breakingPoint = Number.MAX_VALUE;
    const total = new Set();
    total.add(JSON.stringify(ending));
    total.add(JSON.stringify([1, parsedInput[0].length-2]));
    
    while (quantumReindeers.length > 0) {
        let min = Number.MAX_VALUE;
        let target = 0;
        quantumReindeers.forEach((reindeer, index) => {
            if (reindeer.weight < min) {
                min = reindeer.weight;
                target = index
            }
        })

        const temp = quantumReindeers[target]
        quantumReindeers[target] = quantumReindeers[quantumReindeers.length - 1];
        quantumReindeers[quantumReindeers.length - 1] = temp
        
        const currentReindeer = quantumReindeers.pop();
        if (currentReindeer === undefined) break

        const passable = {
            position: currentReindeer.position,
            direction: currentReindeer.direction
        }
        if (map.has(JSON.stringify(passable))) continue;


        if (quantumReindeers.some(spot => {
            if (spot.direction[0] === currentReindeer.direction[0] &&
                spot.direction[1] === currentReindeer.direction[1] &&
                spot.position[0] === currentReindeer.position[0] &&
                spot.position[1] === currentReindeer.position[1] &&
                spot.weight === currentReindeer.weight) {
                currentReindeer.path.forEach(path => spot.path.push(path));
                return true;
            }
            return false
        })) continue;

        map.set(JSON.stringify(passable), currentReindeer.weight)

        if (currentReindeer.weight > breakingPoint) break
        if (ending[0] === currentReindeer.position[0] && ending[1] === currentReindeer.position[1]) {
            breakingPoint =  currentReindeer.weight;
            currentReindeer.path.forEach((path) => total.add(JSON.stringify(path)));
        }
        const left = turnLeft(currentReindeer.direction);
        const right = turnRight(currentReindeer.direction);
        const newPos = [currentReindeer.position[0] + currentReindeer.direction[0], currentReindeer.position[1] + currentReindeer.direction[1]];
        const leftPos = [currentReindeer.position[0] + left[0], currentReindeer.position[1] + left[1]];
        const rightPos = [currentReindeer.position[0] + right[0], currentReindeer.position[1] + right[1]];
        const thisPath =  [...currentReindeer.path, currentReindeer.position];
            
        [
            {
                direction: left,
                position: leftPos,
                path: thisPath,
                weight: currentReindeer.weight + 1001
            },
            {
                direction: right,
                position: rightPos,
                path: thisPath,
                weight: currentReindeer.weight + 1001
            },
            {
                direction: currentReindeer.direction,
                position: newPos,
                path: thisPath,
                weight: currentReindeer.weight + 1
            }
        ].filter(future =>
            future.position[0] > 0 &&
            future.position[0] < parsedInput.length -1 &&
            future.position[1] > 0 &&
            future.position[1] < parsedInput[0].length -1 &&
            parsedInput[future.position[0]][future.position[1]] !== '#')
            .forEach(future => {
                quantumReindeers.push(future)
            });
        
        
        // quantumReindeers.sort((a, b) => b.weight - a.weight);
    }

    // console.log(total)
    return total.size
}

export const Tests = async () => {

}

const turnLeft = (direction) => {
    return  [0 - direction[1], direction[0]];
}

const turnRight = (direction) => {
    return  [direction[1], 0-direction[0]];
}

