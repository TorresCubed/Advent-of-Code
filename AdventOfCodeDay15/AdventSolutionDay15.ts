import {readTextFile, readTextSample} from "../ReadInput";

const day = __filename.substring(__filename.length - 5,__filename.length - 3)

export const Part1 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const splitInput = input.trim().split("\n\n");
    
    const fishMap = splitInput[0].split("\n").map(line => line.split(''));
    const directions = splitInput[1].replace(/\n/g, '').split('');

    let robotPos: number[] = [];
    const walls: number[][] = [];
    const crates = new Map<number, number[]>();
    let movement = [0,0]

    const checkCrates = (spotsToMove: number[]): number[] => {
        const current = crates.get(spotsToMove[spotsToMove.length-1]);
        if (current === undefined) {
            console.log("something went wrong")
            return []
        }
        
        const xMove = current[0]+movement[0];
        const yMove = current[1]+movement[1];

        if (walls.some((wall: number[]) => wall[0] === xMove && wall[1] === yMove)) return [];

        let crateInTheWay = -1;
        for (let [key, val] of crates) {
            if (val[0] === xMove && val[1] === yMove) {
                crateInTheWay =  key;
                break;
            }
        }
            
        if (crateInTheWay === -1) return spotsToMove;

        const otherCrates: number[] = checkCrates([...spotsToMove, crateInTheWay]);

        if (otherCrates.length === 0) return [];

        return otherCrates;
    }
    
    const directionalMap = {
        ">": [1,0],
        "<": [-1,0],
        "^": [0,-1],
        "v": [0,1]
    }
    
    let crateCount = 1;
    for (let y = 0; y < fishMap.length; y++) {
        for (let x = 0; x < fishMap[0].length; x++) {
            const char = fishMap[y][x];
            if(char === '@') {
                robotPos = [x, y];
                crates.set(0, [x, y])
            } else if (char === 'O') {
                crates.set(crateCount, [x, y])
                crateCount++;
            } else if (char === '#') walls.push([x, y]);
        }
    }
    
    directions.forEach(direction => {
        movement = directionalMap[direction];
        
        const otherCrates = checkCrates([0]);
        if (otherCrates.length === 0) return
        
        otherCrates.forEach(crateKey => {
            const cratePos = crates.get(crateKey);
            if (cratePos === undefined) {
                console.log("something went wrong here too!")
                return
            }
            if(crateKey === 0) robotPos = [robotPos[0] + movement[0], robotPos[1] + movement[1]];
            crates.set(crateKey, [movement[0] + cratePos[0], movement[1] + cratePos[1]]);
        })
    })
    
    let total = 0;
    
    for (const [key, value] of crates.entries()) {
        if (key === 0) continue;
        total += (value[0]) + (value[1]*100)
    }

    // for (let y = 0; y < fishMap.length; y++) {
    //     let line = ''
    //     for (let x = 0; x < fishMap[0].length; x++) {
    //         if (robotPos[0] === x && robotPos[1] === y) line = line.concat('@')
    //         else if(checkCratesVal(crates, [x,y])) line = line.concat('O')
    //         else if (walls.some((wall: number[]) => wall[0] === x && wall[1] === y)) line =line.concat('#')
    //         else line = line.concat('.')
    //     }
    //     console.log(line)
    // }
    return total
}

export const Part2 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const splitInput = input.trim().split("\n\n");

    const fishMap = splitInput[0].replace(/#/g,'##').replace(/O/g, '[]').replace(/\./g,'..').replace(/@/g,'@.').split("\n").map(line => line.split(''));
    const directions = splitInput[1].replace(/\n/g, '').split('');

    let robotPos: number[] = [];
    const walls: number[][] = [];
    const crates = new Map<number, number[]>();
    let movement = [0,0]

    const checkCrates = (spotsToMove: number[]): number[] => {
        const current = crates.get(spotsToMove[spotsToMove.length-1]);
        if (current === undefined) {
            console.log("something went wrong")
            return []
        }

        const xMove = current[0]+movement[0];
        const yMove = current[1]+movement[1];

        if (walls.some((wall: number[]) => wall[1] === yMove && (wall[0] === xMove || (spotsToMove[spotsToMove.length-1] !== 0 && wall[0] === xMove+1)))) return [];

        let cratesInTheWay = [];
        for (let [key, val] of crates) {
            if (spotsToMove[spotsToMove.length-1] === key) continue;
            if (val[1] === yMove && (val[0] === xMove || val[0]+1 === xMove || (spotsToMove[spotsToMove.length-1] !== 0 && val[0] === xMove+1))) {
                cratesInTheWay.push(key);
            }
        }

        if (cratesInTheWay.length === 0) return spotsToMove;

        if(cratesInTheWay.length > 2) console.log("possible Error")
        let otherCrates: number[] = []
        
        let hitWall = false;
        cratesInTheWay.forEach(crate => {
            const newCrates = checkCrates([...spotsToMove, crate]);
            if(newCrates.length === 0) hitWall = true;
            otherCrates = [...otherCrates, ...newCrates]
        });

        if (hitWall) return [];

        return otherCrates;
    }

    const directionalMap = {
        ">": [1,0],
        "<": [-1,0],
        "^": [0,-1],
        "v": [0,1]
    }

    let crateCount = 1;
    for (let y = 0; y < fishMap.length; y++) {
        for (let x = 0; x < fishMap[0].length; x++) {
            const char = fishMap[y][x];
            if(char === '@') {
                robotPos = [x, y];
                crates.set(0, [x, y])
            } else if (char === '[') {
                crates.set(crateCount, [x, y])
                crateCount++;
            } else if (char === '#') walls.push([x, y]);
        }
    }

    directions.forEach(direction => {
        movement = directionalMap[direction];

        const otherCrates = new Set(checkCrates([0]));
        if (otherCrates.size === 0) return

        otherCrates.forEach(crateKey => {
            const cratePos = crates.get(crateKey);
            if (cratePos === undefined) {
                console.log("something went wrong here too!")
                return
            }
            if(crateKey === 0) robotPos = [robotPos[0] + movement[0], robotPos[1] + movement[1]];
            crates.set(crateKey, [movement[0] + cratePos[0], movement[1] + cratePos[1]]);
        })
    })

    let total = 0;

    for (const [key, value] of crates.entries()) {
        if (key === 0) continue;
        total += (value[0]) + (value[1]*100)
    }

    return total
}

export const Tests = async () => {

}

const checkCratesVal = (crates, value) => {
    for (let [key, val] of crates) {
        if (val[0] === value[0] && val[1] === value[1]) {return true
        }
    }
}