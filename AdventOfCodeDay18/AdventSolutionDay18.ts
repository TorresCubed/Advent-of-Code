import {readTextFile, readTextSample} from "../ReadInput";
import {Dir} from "node:fs";
import {start} from "node:repl";

const day = __filename.substring(__filename.length - 5,__filename.length - 3)

export const Part1 = async () => {
    const input = await readTextFile(day)
    const size = 70
    // const input = await readTextSample()
    // const size = 6;
    
    const bytesFallen = 3008;
    
    const parsedInput = input.trim().split("\n").map(coord  => coord.split(',').map(number => parseInt(number)));

    const corrupted = [];
    
    for (let falling = 0; falling < bytesFallen; falling++) {
        corrupted.push(parsedInput[falling]);
    }

    const directions = [
        [1,0],
        [-1,0],
        [0,-1],
        [0,1]
    ]
    
    const seen = new Set();
    const paths = [[[0,0]]]
    
    while(paths.length > 0){
        let pathIndex = 0;
        let smallestLength = Number.MAX_VALUE;
        paths.forEach((path, index) => {
            if (path.length < smallestLength) {
                smallestLength = path.length;
                pathIndex = index;
            }
        })

        const currentPath = paths[pathIndex];
        paths[pathIndex] = paths[paths.length - 1];
        paths.pop();
        
        
        if (currentPath === undefined){
            console.log("houston we have a problem")
            break;
        }
        const currentPosition = currentPath[currentPath.length - 1];
        
        if (seen.has(currentPosition.toString())) continue;
        
        seen.add(currentPosition.toString(),);
        
        if (currentPosition[0] === size && currentPosition[1] === size) return currentPath.length-1
        
        directions.map(direction => [currentPosition[0] + direction[0],  currentPosition[1] + direction[1]])
            .filter(newPosition => 
                newPosition[0] >=0 &&
                newPosition[1] >=0 &&
                newPosition[1] <=size &&
                newPosition[0] <=size &&
                !corrupted.some(byte => byte[0] === newPosition[0] && byte[1] === newPosition[1])
            ).forEach(newPos => paths.push([...currentPath, newPos]));
        
    }
    
    return "Pending..."
}

export const Part2 = async () => {
    const input = await readTextFile(day)
    const size = 70
    // const input = await readTextSample()
    // const size = 6;


    const parsedInput = input.trim().split("\n").map(coord  => coord.split(',').map(number => parseInt(number)));
    
    let startPoint = 0;
    let endPoint = parsedInput.length;
        
    const directions = [
        [1,0],
        [-1,0],
        [0,-1],
        [0,1]
    ]


    while(true) {
        const half = Math.ceil((endPoint - startPoint)/2)+startPoint;
        const corrupted = parsedInput.slice(0, half);

        let succeeded = false;

        const paths = [[[0,0]]]
        const seen = new Set();
        
        while (paths.length > 0) {
            let pathIndex = 0;
            let smallestLength = Number.MAX_VALUE;
            paths.forEach((path, index) => {
                if (path.length < smallestLength) {
                    smallestLength = path.length;
                    pathIndex = index;
                }
            })

            const currentPath = paths[pathIndex];
            paths[pathIndex] = paths[paths.length - 1];
            paths.pop();


            if (currentPath === undefined) {
                console.log("houston we have a problem")
                break;
            }
            const currentPosition = currentPath[currentPath.length - 1];

            if (seen.has(currentPosition.toString())) continue;

            seen.add(currentPosition.toString(),);

            if (currentPosition[0] === size && currentPosition[1] === size) {
                succeeded = true;
                break;
            }

            directions.map(direction => [currentPosition[0] + direction[0], currentPosition[1] + direction[1]])
                .filter(newPosition =>
                    newPosition[0] >= 0 &&
                    newPosition[1] >= 0 &&
                    newPosition[1] <= size &&
                    newPosition[0] <= size &&
                    !corrupted.some(byte => byte[0] === newPosition[0] && byte[1] === newPosition[1])
                ).forEach(newPos => paths.push([...currentPath, newPos]));

        }
        
        
        if (endPoint - startPoint === 1) {
            console.log(endPoint);
            if(succeeded) {
                return parsedInput[endPoint-1].join(',');
            }
            return parsedInput[half-1].join(',');
        }
        
        if (succeeded) {
            startPoint = half;
            continue;
        }
        
        endPoint = half
        
    }

    return "Pending..."
}

export const Tests = async () => {

}
