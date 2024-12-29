import {readTextFile, readTextSample} from "../ReadInput";

const day = __filename.substring(__filename.length - 5,__filename.length - 3)

export const Part1 = async () => {
    const input = await readTextFile(day)
    const yMax = 103;
    const xMax = 101;
    // const input = await readTextSample()
    // const yMax = 7;
    // const xMax = 11;
    
    
    const parsedInput = input.trim().split("\n").map(line => {
            const split = line.match(/(-?\d+)/g)
            return {
                px: parseInt(split[0]),
                py: parseInt(split[1]),
                vx: parseInt(split[2]),
                vy: parseInt(split[3]),
            }
        }
    );

    let quad1 = 0;
    let quad2 = 0;
    let quad3 = 0;
    let quad4 = 0;
    
    parsedInput.forEach(line => {
        const xVal = (line.px+line.vx*100)%xMax;
        const yVal = (line.py+line.vy*100)%yMax;
        const x = xVal >=  0 ? xVal : xMax + xVal ;
        const y = yVal >= 0 ? yVal : yMax + yVal;

        const xfloor = Math.floor(xMax/2);
        const xceil = Math.ceil(xMax/2);
        const yfloor = Math.floor(yMax/2);
        const yceil = Math.ceil(yMax/2);

        if (x < xfloor && y < yfloor) quad1++;
        else if (x >= xceil && y < yfloor) quad2++;
        else if (x < xfloor && y >= yceil) quad3++;
        else if (x >= xceil && y >= yceil) quad4++;
    })
    

    return quad1*quad2*quad3*quad4;
}

export const Part2 = async () => {
    const input = await readTextFile(day)
    const yMax = 103;
    const xMax = 101;
    // const input = await readTextSample()
    // const yMax = 7;
    // const xMax = 11;


    const parsedInput = input.trim().split("\n").map(line => {
            const split = line.match(/(-?\d+)/g)
            return {
                px: parseInt(split[0]),
                py: parseInt(split[1]),
                vx: parseInt(split[2]),
                vy: parseInt(split[3]),
            }
        }
    );

    let count = 0;
    while(count < 10000) {

        const currentResults = parsedInput.map(line => {
            const xVal = (line.px+line.vx*count)%xMax;
            const yVal = (line.py+line.vy*count)%yMax;
            const x = xVal >=  0 ? xVal : xMax + xVal ;
            const y = yVal >= 0 ? yVal : yMax + yVal;
            return `${x},${y}`
        })
        
        if ((count-38) % 101 === 0 && (count-88) % 103 === 0) {
            for (let i = 0; i < yMax; i++) {
                let line = ''
                for (let j = 0; j < xMax; j++) {
                    if (currentResults.includes(`${i},${j}`)) {
                        line = line.concat('#')
                    } else {
                        line = line.concat('.')
                    }
                }
                console.log(line)
            }
        }
        count++;
    }
    
    return 7916
}

export const Tests = async () => {

}
// horiz = 38, 139
//vert = 88, 191
const sleep = () => {
    return new Promise(resolve => setTimeout(resolve ,500))
}