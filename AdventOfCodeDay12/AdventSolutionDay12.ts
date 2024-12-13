import {readTextFile, readTextSample} from "../ReadInput";
import {Dir} from "node:fs";

const day = __filename.substring(__filename.length - 5,__filename.length - 3)

export const Part1 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()
    const isValid = (newPoint) => {
        return newPoint[0] >= 0 && newPoint[0] < parsedInput.length && newPoint[1] >= 0 && newPoint[1] < parsedInput[0].length;
    }
    
    const parsedInput = input.trim().split("\n").map(line => line.split(""));

    let fenceCost = 0;
    const seen = [];
    const newRegions = [[0,0]];
    
    while(newRegions.length > 0) {
        const seed = newRegions.pop();
        
        if (seen.some(point => checkSeen(point, seed))) continue;
        seen.push(seed);
        
        const regionVal = parsedInput[seed[0]][seed[1]];
        const region = [seed];
        const investigations = [seed];
        
        let size = 1;
        let perimeter = 0;
        
        while (investigations.length > 0){
            const target = investigations.pop();
            const neighbors = getNeighbors(target);
            
            neighbors.forEach((neighbor) => {
                if(!isValid(neighbor)) {
                    perimeter++;
                    return;
                }
                if (!region.some(point => checkSeen(point, neighbor))) {
                    if (parsedInput[neighbor[0]][neighbor[1]] === regionVal) {
                        investigations.push(neighbor);
                        region.push(neighbor);
                        seen.push(neighbor);
                        size++;
                    } else {
                        newRegions.push(neighbor);
                        perimeter++;
                    }
                }
            })
        }
        fenceCost += size*perimeter;
    }
    
    
    return fenceCost
}

export const Part2 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const isValid = (newPoint) => {
        return newPoint[0] >= 0 && newPoint[0] < parsedInput.length && newPoint[1] >= 0 && newPoint[1] < parsedInput[0].length;
    }

    const parsedInput = input.trim().split("\n").map(line => line.split(""));

    let fenceCost = 0;
    const seen = [];
    const newRegions = [[0,0]];

    while(newRegions.length > 0) {
        const seed = newRegions.pop();

        if (seen.some(point => checkSeen(point, seed))) continue;
        seen.push(seed);

        const regionVal = parsedInput[seed[0]][seed[1]];
        const region = [seed];
        const investigations = [seed];

        let size = 1;
        const perimeter = new Map();

        while (investigations.length > 0){
            const target = investigations.pop();
            const neighbors = getNeighbors(target);

            neighbors.forEach((neighbor) => {
                if(!isValid(neighbor)) {
                    const {location, definition} = getPerimeterResults(target, neighbor);
                    perimeter.has(definition) ? 
                        perimeter.set(definition, [...perimeter.get(definition), location]) : 
                        perimeter.set(definition, [location]);
                    return;
                }
                if (!region.some(point => checkSeen(point, neighbor))) {
                    if (parsedInput[neighbor[0]][neighbor[1]] === regionVal) {
                        investigations.push(neighbor);
                        region.push(neighbor);
                        seen.push(neighbor);
                        size++;
                    } else {
                        newRegions.push(neighbor);
                        const {location, definition} = getPerimeterResults(target, neighbor);
                        perimeter.has(definition) ?
                            perimeter.set(definition, [...perimeter.get(definition), location]) :
                            perimeter.set(definition, [location]);
                    }
                }
            })
        }
        
        let perimSize = 0;
        Array.from(perimeter.values()).forEach(separations =>  {
            separations.sort((a, b) => a - b);
            let target = separations.pop();
            let count = 1;
            while(separations.length > 0){
                const next = separations.pop()
                if (target-next !== 1) {
                    count++ 
                }
                target = next;
            }
            perimSize += count
        })
        
        fenceCost += size*perimSize;
    }


    return fenceCost;
}

export const Tests = async () => {

}

const getNeighbors = (point) => {
    const directions =  [[0, 1], [0, -1], [1, 0], [-1, 0]]
    return directions.map(direction => [point[0] + direction[0], point[1] + direction[1]])
}

const checkSeen = (arr1, arr2) => {
    return arr1[0] == arr2[0] && arr1[1] == arr2[1];
}

const getPerimeterResults = (start, end) => {
    const direction = [Math.sign(end[0]-start[0]), Math.sign(end[1]-start[1])];
    if (direction[0] == 0) {
        return {
            location: start[0],
            definition: `${direction}${start[1]}`
        }
    } else {
        return {
            location: start[1],
            definition: `${direction}${start[0]}`
        }
    }
    
}