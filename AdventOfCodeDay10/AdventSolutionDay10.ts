import {readTextFile, readTextSample} from "../ReadInput";

const day = __filename.substring(__filename.length - 5,__filename.length - 3)

export const Part1 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const isValid = (newPoint, current) => {
        return newPoint[0] >= 0 && newPoint[0] < parsedInput.length && newPoint[1] >= 0 && newPoint[1] < parsedInput[0].length &&
            parsedInput[newPoint[0]][newPoint[1]] ===  parsedInput[current[0]][current[1]] + 1;
    }

    const parsedInput = input.trim().split("\n").map(line => line.split("").map(num => parseInt(num)));
    
    const trailHeads = [];
    
    for (let i = 0; i < parsedInput.length; i++) {
        for (let j = 0; j < parsedInput[0].length; j++) {
            if (parsedInput[i][j] === 0) {
                trailHeads.push({
                    location: [i, j],
                    score: 0
                });
            }
        }
    }
    
    const results = trailHeads.map(trailhead => {
        let score = trailhead.score;
        
        let steps = [trailhead.location];
        const seen = [];
        
        while(steps.length > 0) {
            const current = steps.pop();
            if (seen.some(point => checkSeen(point, current))) continue;
            if (parsedInput[current[0]][current[1]] === 9) {
                score++
                seen.push(current);
                continue;
            }
            const validSteps = getSteps(current).filter(step => isValid(step, current));
            seen.push(current);
            steps = steps.concat(validSteps);
        }
        trailhead.score = score;
        return trailhead;
    })
    
    let total = 0;
    trailHeads.forEach(trail => total += trail.score);

    return total;
}

export const Part2 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const isValid = (newPoint, current) => {
        return newPoint[0] >= 0 && newPoint[0] < parsedInput.length && newPoint[1] >= 0 && newPoint[1] < parsedInput[0].length &&
            parsedInput[newPoint[0]][newPoint[1]] ===  parsedInput[current[0]][current[1]] + 1;
    }

    const parsedInput = input.trim().split("\n").map(line => line.split("").map(num => parseInt(num)));

    const trailHeads = [];

    for (let i = 0; i < parsedInput.length; i++) {
        for (let j = 0; j < parsedInput[0].length; j++) {
            if (parsedInput[i][j] === 0) {
                trailHeads.push({
                    location: [i, j],
                    score: 0
                });
            }
        }
    }

    const results = trailHeads.map(trailhead => {
        let score = trailhead.score;

        let paths = [[trailhead.location]];
        
        while(paths.length > 0) {
            const current = paths.pop();
            const pathHead = current[current.length - 1];
            
            if (parsedInput[pathHead[0]][pathHead[1]] === 9) {
                score++
                continue;
            }
            const validSteps = getSteps(pathHead).filter(step => isValid(step, pathHead));
            validSteps.forEach(step => {
                paths.push([...current, step])
            })
        }
        trailhead.score = score;
        return trailhead;
    })

    let total = 0;
    trailHeads.forEach(trail => total += trail.score);
    
    return total
}

export const Tests = async () => {

}

const checkSeen = (arr1, arr2) => {
    return arr1[0] == arr2[0] && arr1[1] == arr2[1];
}

const getSteps = (point) => {
    const directions =  [[0, 1], [0, -1], [1, 0], [-1, 0]]
    return directions.map(direction => [point[0] + direction[0], point[1] + direction[1]])
}

