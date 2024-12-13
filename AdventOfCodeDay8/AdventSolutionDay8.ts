import {readTextFile, readTextSample} from "../ReadInput";

const day = __filename[__filename.length - 4].toString()

export const Part1 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n").map(line => line.split(""));

    const locations = {};
    for (let i = 0; i < parsedInput.length; i++) {
        for (let j = 0; j < parsedInput[0].length; j++) {
            const target = parsedInput[i][j];
            if(target !== '.') {
                const result = locations[target]
                result ? result?.push([i,j]) : locations[target] = [[i,j]] ;
            }
        }
    }

    const antinodes = [];
    
    Object.values(locations).forEach((line: [[]]) => {
        for (let j = 0; j < line.length; j++) {
            const current: number[] = line[j];
            line.slice(j+1).forEach((value: number[]) => {
                const difference = [current[0] - value[0], current[1] - value[1]];
                const target1 =  [current[0] + difference[0], current[1] + difference[1]];
                const target2 =  [value[0] - difference[0], value[1] - difference[1]];
                if (parsedInput[target1[0]] && parsedInput[target1[0]][target1[1]]) antinodes.push(target1.toString());
                if (parsedInput[target2[0]] && parsedInput[target2[0]][target2[1]]) antinodes.push(target2.toString());
            });
        }
    })

    return new Set(antinodes).size
}

export const Part2 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n").map(line => line.split(""));

    const locations = {};
    for (let i = 0; i < parsedInput[0].length; i++) {
        for (let j = 0; j < parsedInput.length; j++) {
            if(parsedInput[i][j] !== '.') {
                const target = parsedInput[i][j];
                const value = locations[target];
                value ? value?.push([i,j]) : locations[parsedInput[i][j]] = [[i,j]] ;
            }
        }
    }

    let antinodes = [];

    Object.values(locations).forEach((line: [[]]) => {
        if (line.length == 1) return; 
        for (let j = 0; j < line.length; j++) {
            const current: number[] = line[j];
            line.slice(j+1).forEach((value: number[]) => {
                antinodes = antinodes.concat(waveTransmission(parsedInput, current, value));
            });
        }
    })
    
    return new Set(antinodes).size;
}

export const Tests = async () => {
}

const waveTransmission = (grid, point1, point2) => {

    const wave = []

    const difference = [point1[0] - point2[0], point1[1] - point2[1]];
    
    while(grid[point1[0]] && grid[point1[0]][point1[1]]) {
        wave.push(point1.toString());
        point1 = [point1[0] + difference[0], point1[1] + difference[1]]
    }
    
    while(grid[point2[0]] && grid[point2[0]][point2[1]]) {
        wave.push(point2.toString());
        point2 = [point2[0] - difference[0], point2[1] - difference[1]]
    }
    return wave;
}
