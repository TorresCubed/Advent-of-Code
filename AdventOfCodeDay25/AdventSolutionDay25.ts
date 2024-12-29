import {readTextFile, readTextSample} from "../ReadInput";

const day = __filename.substring(__filename.length - 5,__filename.length - 3)

export const Part1 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const lockAndKeys = input.trim().split("\n\n");
    
    const keys = [];
    const locks = [];
    
    lockAndKeys.forEach(lock => {
        const graphic = lock.split("\n").map(line => line.split(""))
        
        if (lock[0] === '#') {
            const lockGraphic = graphic.slice(1,graphic.length-1)
            let tumblers = []
            for (let x = 0; x < lockGraphic[0].length; x++) {
                let tumblerSize = 0;
                for (let y = 0; y < lockGraphic.length; y++) {
                    if (lockGraphic[y][x] === '.') break;
                    tumblerSize++;
                }
                tumblers.push(5 - tumblerSize)
            }
            locks.push(tumblers);
        } else {
            const keyGraphic = graphic.slice(1,graphic.length-1)
            let associatedTumblers = []
            for (let x = 0; x < keyGraphic[0].length; x++) {
                let keyHeight = 0;
                for (let y = keyGraphic.length-1; y >= 0; y--) {
                    if (keyGraphic[y][x] === '.') break;
                    keyHeight++;
                }
                associatedTumblers.push(keyHeight);
            }
            keys.push(associatedTumblers);
        }
    })
    
    let combos = 0;
    
    for (let x = 0; x < keys.length; x++) {
        for (let y = 0; y < locks.length; y++) {
            const lock = locks[y];
            const key = keys[x];
            let succeeded = true;
            for (let position = 0; position < lock.length; position++) {
                if (lock[position] < key[position]) {
                    succeeded = false;
                    break;
                }
            }
            if (succeeded) combos++;
        }
    }

    
    return combos
}

export const Part2 = async () => {
    // const input = await readTextFile(day)
    const input = await readTextSample()

    const parsedInput = input.trim().split("\n");

    return "Pending..."
}

export const Tests = async () => {

}
