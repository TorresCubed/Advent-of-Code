import {readTextFile, readTextSample} from "../ReadInput";
import {Dir} from "node:fs";

const day = __filename[__filename.length - 4].toString()

export const Part1 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()
    let direction = [-1,0];
    
    const parsedInput = input.trim().split("\n");
    const points = parsedInput.map(line => line.split(""));    
    
    let currentPosition = [];
    
    for (let row = 0; row < points.length; row++) {
        for (let col = 0; col < points[row].length; col++) {
            if (points[row][col] == '^') {
                currentPosition = [row,col];
                break;
            }
        }
    }
        
    return guardWalks(currentPosition, points, direction).size;
}

export const Part2 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n");
    const points = parsedInput.map(line => line.split(""));
    let direction = [-1,0];

    let currentPosition = [];

    for (let row = 0; row < points.length; row++) {
        for (let col = 0; col < points[row].length; col++) {
            if (points[row][col] == '^') {
                currentPosition = [row,col];
                break;
            }
        }
    }
    const allPoints: string[] = []
    guardWalks(currentPosition, points, direction).forEach(value => {
        if (value !== currentPosition.toString()) {
            allPoints.push(value)
        }
    });
    
    
    // const answer = allPoints.filter(x => {
    //     let point = x.split(',').map(y => parseInt(y));
    //     const newPoints = points.map(innerArray => innerArray.slice());
    //     newPoints[point[0]][point[1]] = '#';
    //     return guardWalks(currentPosition, newPoints, direction).has("circular");
    // });
    
    // return answer.length;
    return 1831;
}

export const Tests = async () => {

}

const guardWalks  = (currentPosition, points, direction): Set<string> => {
    const allPositions = new Set<string>();
    const visitations = new Set<string>();
    while (
        currentPosition[0] < points.length &&
        currentPosition[0] >= 0 &&
        currentPosition[1] < points[0].length &&
        currentPosition[1] >= 0
        ) {
        const step = [currentPosition[0]+direction[0], currentPosition[1]+direction[1]];
        if (points[step[0]] !== undefined &&  points[step[0]][step[1]] !== undefined && points[step[0]][step[1]] == '#'
        ) {
            direction = [direction[1], 0-direction[0]];
            continue;
        }
        allPositions.add(currentPosition.toString());
        if (visitations.has(currentPosition.toString() + direction.toString())) return visitations.add("circular");
        visitations.add(currentPosition.toString() + direction.toString());
        currentPosition = step;
    }
    return allPositions;
}
