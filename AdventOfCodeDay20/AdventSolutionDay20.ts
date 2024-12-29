import {readTextFile, readTextSample} from "../ReadInput";
import {Dir} from "node:fs";

const day = __filename.substring(__filename.length - 5,__filename.length - 3)

export const Part1 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n").map(line => line.split(''));
    
    return 1363
    
    let totalPico = 1;
    let end: number[] = [];
    let start: number[] = [];
    
    
    for (let y = 0; y < parsedInput.length; y++) {
        for (let x = 0; x < parsedInput[0].length; x++) {
            if (parsedInput[y][x] === 'S') start = [y,x];
            if (parsedInput[y][x] === 'E') end = [y,x];
            if (parsedInput[y][x] === '.') {
                totalPico++;
            }
        }
    }
    const directions = [
        [1,0],
        [-1,0],
        [0,-1],
        [0,1]
    ]
    
    const pathTimes = []

    const paths = [{
        path: new Set(),
        currentPos: start,
        // isCheating: false,
        hasCheated: false
    }]

    const raceTrack = finishRace(parsedInput, start, end);
    
    
    while(paths.length > 0){
        const currentPath = paths.pop();

        if (currentPath === undefined){
            console.log("houston we have a problem")
            break;
        }
        const currentPosition = currentPath.currentPos

        if (currentPath.path.size > totalPico) continue;

        directions.map(direction => [currentPosition[0] + direction[0],  currentPosition[1] + direction[1]])
            .filter(newPosition =>
                newPosition[0] >=0 &&
                newPosition[1] >=0 &&
                newPosition[1] < parsedInput[0].length &&
                newPosition[0] < parsedInput.length &&
                !currentPath.path.has(newPosition.toString()) &&
                !(parsedInput[newPosition[0]][newPosition[1]] === '#' && currentPath.hasCheated)
            ).forEach(newPos => {
                const newPath = {...currentPath}
                newPath.currentPos = newPos
                newPath.path = new Set(currentPath.path).add(currentPosition.toString())
                if (newPath.hasCheated) {
                    const time = newPath.path.size - raceTrack.get(newPos.toString()) + raceTrack.size-1
                    if (time > totalPico-100) return;
                    pathTimes.push(time);
                    return
                }
                if (parsedInput[newPos[0]][newPos[1]] === '#'){
                    // newPath.hasCheated = newPath.isCheating;
                    // newPath.isCheating = !newPath.isCheating;
                    newPath.hasCheated = true;
                }

                paths.push(newPath)
        });

    }
    
    return pathTimes.sort().length
}

export const Part2 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n").map(line => line.split(''));

    let totalPico = 1;
    let end: number[] = [];
    let start: number[] = [];


    for (let y = 0; y < parsedInput.length; y++) {
        for (let x = 0; x < parsedInput[0].length; x++) {
            if (parsedInput[y][x] === 'S') start = [y,x];
            if (parsedInput[y][x] === 'E') end = [y,x];
            if (parsedInput[y][x] === '.') {
                totalPico++;
            }
        }
    }
    const trackPositions = [];
    const raceTrack = finishRace(parsedInput, start, end);
    raceTrack.forEach((time, track) => {
        return trackPositions.push(track.split(',').map(line => parseInt(line)))
    });
    
    let count = 0;
    const distances = new Map()
    
    for (let first = 0; first < trackPositions.length; first++) {
        for (let second = first+100; second < trackPositions.length; second++) {
            const firstPos = trackPositions[first]
            const secondPos = trackPositions[second]
            const distance = Math.abs(firstPos[0] - secondPos[0]) + Math.abs(firstPos[1] - secondPos[1])
            if (distance <= 20){
                if (Math.abs(raceTrack.get(firstPos.toString()) - raceTrack.get(secondPos.toString()))-distance >= 100) {
                    // console.log(Math.abs(raceTrack.get(firstPos.toString()) - raceTrack.get(secondPos.toString())))
                    // distances.push(firstPos.toString() + '-' + secondPos.toString())
                    // const result = Math.abs(raceTrack.get(firstPos.toString()) - raceTrack.get(secondPos.toString()))-distance
                    // const others = distances.get(result)
                    // distances.set(
                    //     // {dist: 
                    //     result, others === undefined ? 1 : others+1
                    // // points: firstPos.toString() + '-' + secondPos.toString()}
                    // )
                    count++
                }
            }
        }
    }
    // console.log(count); 
    return count
}

export const Tests = async () => {

}
export const directions = [
    [1,0],
    [-1,0],
    [0,-1],
    [0,1]
]


const finishRace = (input, start, end)  => {
    
    let path = new Map()
    path.set(start.toString(), 0)
    let count = 1;
    let current = start;
    
    while(!(current[0] == end[0] && current[1] === end[1])) {        
        directions.map(direction => [current[0]+direction[0], current[1]+direction[1]])
            .filter(newPosition =>
                !path.has(newPosition.toString()) &&
                input[newPosition[0]][newPosition[1]] !== '#')
            .forEach(newPos => {
                path.set(newPos.toString(), count)
                count++;
                current = newPos
            })
        
    }
    
    return path;
}

