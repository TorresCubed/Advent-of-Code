import {readTextFile, readTextSample} from "../ReadInput";

const day = __filename.substring(__filename.length - 5,__filename.length - 3)

export const Part1 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n\n");
    const cleaned = parsedInput.map(group => {
            const regexed = group.split("\n").map(line => line.match(/(\d+)/g))

        return {
                Ax: parseInt(regexed[0][0]), 
                Ay: parseInt(regexed[0][1]),
                Bx: parseInt(regexed[1][0]),
                By: parseInt(regexed[1][1]),
                X: parseInt(regexed[2][0]),
                Y: parseInt(regexed[2][1]),
            }   
        });
    let total = 0;

    cleaned.forEach((line) => {
        const multiplesArrayAx = Array.from({ length: 101 }, (_, index) => (index) * line.Ax).filter(num => num <=line.X);
        const multiplesArrayBx = Array.from({ length: 101 }, (_, index) => (index) * line.Bx).filter(num => num <=line.X);

        outerLoop:
        for (let a = 0; a < multiplesArrayAx.length; a++) {
            for (let b = 0; b < multiplesArrayBx.length; b++) {
                if (multiplesArrayAx[a] + multiplesArrayBx[b] === line.X) {
                    if (a*line.Ay + b*line.By === line.Y) {
                        total += multiplesArrayAx[a]*3+multiplesArrayBx[b];
                        break outerLoop;
                    }   
                }
                if (multiplesArrayAx[a] + multiplesArrayBx[b] > line.X) break;
            }
        }
    })
    
    return total
}

export const Part2 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n\n");
    const cleaned = parsedInput.map(group => {
        const regexed = group.split("\n").map(line => line.match(/(\d+)/g))

        return {
            Ax: parseInt(regexed[0][0]),
            Ay: parseInt(regexed[0][1]),
            Bx: parseInt(regexed[1][0]),
            By: parseInt(regexed[1][1]),
            X: parseInt(regexed[2][0]) + 10000000000000,
            Y: parseInt(regexed[2][1]) + 10000000000000,
        }
    });
    let total = 0;

    cleaned.forEach((line) => {
        const pressesButtonB = ((line.Y*line.Ax) - line.X*line.Ay)/((line.By*line.Ax)-(line.Bx*line.Ay))
        if (Number.isInteger(pressesButtonB)) {
            const pressesButtonA = (line.X - pressesButtonB*line.Bx) / line.Ax
            if (Number.isInteger(pressesButtonA)) {
                if (pressesButtonA*line.Ay + pressesButtonB*line.By === line.Y) {
                    total += pressesButtonA * 3 + pressesButtonB
                }
            }
        }
    })

    return total
}

export const Tests = async () => {

}
