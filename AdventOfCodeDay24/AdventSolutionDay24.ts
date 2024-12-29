import {readTextFile, readTextSample} from "../ReadInput";

const day = __filename.substring(__filename.length - 5,__filename.length - 3)

export const Part1 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n\n");
    const valueMap = new Map();
    parsedInput[0].split("\n").forEach(line => {
        const toInput = line.split(": ")
        valueMap.set(toInput[0], toInput[1] === '1')
    })
    
    const equationMap = new Map();
    let equationValues = [];
    parsedInput[1].split("\n").forEach(line => {
        const initialSplit = line.split(" -> ");
        const functionSplit = initialSplit[0].split(' ');
        equationMap.set(initialSplit[1], {first: functionSplit[0], second: functionSplit[2], action: functionSplit[1]});
        equationValues.push(initialSplit[1]);
    })
    
    while (equationValues.length > 0) {
        const equationKey = equationValues[0];
        const currentEquation = equationMap.get(equationKey);
        equationValues = equationValues.slice(1);

        const val1 = valueMap.get(currentEquation['first'])
        const val2 = valueMap.get(currentEquation['second'])
        
        if (val1 === undefined || val2 === undefined) {
            equationValues.push(equationKey)
            continue
        }
        let result = null;
        switch (currentEquation['action']) {
            case "AND":
                result = val1 && val2
                break;
            case "OR":
                result = val2 || val1
                break;
            case "XOR":
                result = val2 !== val1
                break;
            default:
                console.log("something bad")
        }
        
        valueMap.set(equationKey, result)
    }
    
    const zs = [...valueMap.keys()].filter(key => key[0] === 'z').sort((a,b) =>b.localeCompare(a)).map(key => valueMap.get(key) ? 1 : 0 ).join('')
    

    return parseInt(zs, 2)
}

export const Part2 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n\n");
    const concerns = new Set();
    const equationMap = new Map();
    let equationValues = [];
    parsedInput[1].split("\n").forEach(line => {
        const initialSplit = line.split(" -> ");
        const functionSplit = initialSplit[0].split(' ');
        equationMap.set(initialSplit[1], {
            first: functionSplit[0],
            second: functionSplit[2],
            action: functionSplit[1]
        });

        equationValues.push(initialSplit[1]);
    })

    equationMap.forEach((value, key) => {
        if (key[0] === 'z' && value.action !== "XOR" && key.substring(1) !== "45") {
            concerns.add(key);
        }
        if (value.action === 'OR') {
            const first = value.first
            const firstEquation = equationMap.get(first);
            const second = value.second
            const secondEquation = equationMap.get(second);
            if (firstEquation.action !== "AND") {
                concerns.add(first)
            }
            if (secondEquation.action !== "AND") {
                concerns.add(second)
            }
            // if (!((firstEquation.first[0] === 'x' || firstEquation.first[0] === 'y') && (firstEquation.second[0] === 'x' || firstEquation.second[0] === 'y'))) {
            //     const newFirst = firstEquation.first
            //     const newFirstEquation = equationMap.get(firstEquation.first);
            //     const newSecond = firstEquation.second
            //     const newSecondEquation = equationMap.get(firstEquation.second);
            //     if (!(newFirstEquation.first[0] === 'x' || newFirstEquation.first[0] === 'y') && (newFirstEquation.second[0] === 'x' || newFirstEquation.second[0] === 'y')) {
            //         concerns.add(newFirst)
            //     }
            //     if (!(newSecondEquation.first[0] === 'x' || newSecondEquation.first[0] === 'y') && (newSecondEquation.second[0] === 'x' || newSecondEquation.second[0] === 'y')) {
            //         concerns.add(newSecond)
            //     }
            // }
            // if (!((secondEquation.first[0] === 'x' || secondEquation.first[0] === 'y') && (secondEquation.second[0] === 'x' || secondEquation.second[0] === 'y'))) {
            //     const newFirst = secondEquation.first
            //     const newFirstEquation = equationMap.get(secondEquation.first);
            //     const newSecond = secondEquation.second
            //     const newSecondEquation = equationMap.get(secondEquation.second);
            //     if (!(newFirstEquation.first[0] === 'x' || newFirstEquation.first[0] === 'y') && (newFirstEquation.second[0] === 'x' || newFirstEquation.second[0] === 'y')) {
            //         concerns.add(newFirst)
            //     }
            //     if (!(newSecondEquation.first[0] === 'x' || newSecondEquation.first[0] === 'y') && (newSecondEquation.second[0] === 'x' || newSecondEquation.second[0] === 'y')) {
            //         concerns.add(newSecond)
            //     }
            // }
        } else if (value.action === 'XOR') {
            if ((value.first[0] === 'x' || value.first[0] === 'y') && (value.second[0] === 'x' || value.second[0] === 'y')) {
                if (key[0] === 'z' && key.substring(1) !== "00") {
                    concerns.add(key);
                }
            }
        } else if(value.action === 'AND') {
            const first = value.first
            const firstEquation = equationMap.get(first);
            const second = value.second
            const secondEquation = equationMap.get(second);
            
            if (!((first[0] === 'x' || first[0] === 'y') && (second[0] === 'x' || second[0] === 'y'))) {
                if (firstEquation.action === "AND" && firstEquation.first.substring(1) !== "00") {
                    concerns.add(first)
                }
                if (secondEquation.action === "AND" && firstEquation.first.substring(1) !== "00") {
                    concerns.add(second)
                }
                if (!(firstEquation.action === "OR" || (firstEquation.first[0] === 'x' || firstEquation.first[0] === 'y') && (firstEquation.second[0] === 'x' || firstEquation.second[0] === 'y'))) {
                    concerns.add(first)
                }
                if (!(secondEquation.action === "OR" || (secondEquation.first[0] === 'x' || secondEquation.first[0] === 'y') && (secondEquation.second[0] === 'x' || secondEquation.second[0] === 'y'))) {
                    concerns.add(second)
                }
            }
        }
    })
    const wiresCrossed = new Set();
    
    // for (let x = 0; x < 45; x++) {
    //     const valueMap = new Map();
    //     let tempEquationValues = [...equationValues]
    //     // parsedInput[0].split("\n").forEach(line => {
    //     //     const toInput = line.split(": ")
    //     //     valueMap.set(toInput[0], toInput[1] === '1')
    //     // })
    //     const neededBits = (17592186044416).toString(2);
    //     for (let i = 0; i < neededBits.length; i++) {
    //         if (i === x) {
    //             valueMap.set(`x${i < 10 ? 0 : ''}${i}`, neededBits[neededBits.length - 1 - i] === '0');
    //         } else {
    //             valueMap.set(`x${i < 10 ? 0 : ''}${i}`, neededBits[neededBits.length - 1 - i] === '1');
    //         }
    //         valueMap.set(`y${i < 10 ? 0 : ''}${i}`, neededBits[neededBits.length - 1 - i] === '1');
    //     }
    //
    //     const xs = [...valueMap.keys()].filter(key => key[0] === 'x').sort((a, b) => b.localeCompare(a)).map(key => valueMap.get(key) ? 1 : 0).join('')
    //     const xValue = parseInt(xs, 2)
    //     const ys = [...valueMap.keys()].filter(key => key[0] === 'y').sort((a, b) => b.localeCompare(a)).map(key => valueMap.get(key) ? 1 : 0).join('')
    //     const yValue = parseInt(ys, 2)
    //    
    //    
    //     while (tempEquationValues.length > 0) {
    //         const equationKey = tempEquationValues[0];
    //         const currentEquation = equationMap.get(equationKey);
    //         tempEquationValues = tempEquationValues.slice(1);
    //
    //         const val1 = valueMap.get(currentEquation['first'])
    //         const val2 = valueMap.get(currentEquation['second'])
    //
    //         if (val1 === undefined || val2 === undefined) {
    //             tempEquationValues.push(equationKey)
    //             continue
    //         }
    //         let result = null;
    //         switch (currentEquation['action']) {
    //             case "AND":
    //                 result = val1 && val2
    //                 break;
    //             case "OR":
    //                 result = val2 || val1
    //                 break;
    //             case "XOR":
    //                 result = val2 !== val1
    //                 break;
    //             default:
    //                 console.log("something bad")
    //         }
    //
    //         valueMap.set(equationKey, result)
    //     }
    //
    //     const zResults = new Map();
    //
    //     const zEquationVals = [...valueMap.keys()].filter(key => key[0] === 'z').sort((a, b) => b.localeCompare(a))
    //     const zs = zEquationVals.map(key => valueMap.get(key) ? 1 : 0).join('')
    //     const z = parseInt(zs, 2)
    //     const result = BigInt(xValue + yValue) ^ BigInt(z)
    //     const testPrev = xValue + yValue
    //     const test = (testPrev).toString(2)
    //     const binaried = result.toString(2);
    //
    //     for (let i = 0; i < binaried.length; i++) {
    //         if (i !== x && binaried[binaried.length - 1 - i] === '1') {
    //             concerns.add(zEquationVals[zEquationVals.length - 1 - i])
    //             // zResults.set(zEquationVals[zEquationVals.length - 1 - i], zs[zEquationVals.length - 1 - i]);
    //         }
    //     }
    //
    //    [...zResults.keys()].forEach(key => wiresCrossed.add(key))
    // }
    
    return [...concerns].sort().join(',');
    // 56,794,324,938,584
}

export const Tests = async () => {

}
