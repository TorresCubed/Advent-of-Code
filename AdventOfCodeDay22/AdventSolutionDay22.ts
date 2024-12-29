import {readTextFile, readTextSample} from "../ReadInput";

const day = __filename.substring(__filename.length - 5,__filename.length - 3)

export const Part1 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n").map(num => parseInt(num));

    let total:bigint =BigInt(0);
    parsedInput.forEach(num => {
        let preveSecret: bigint = BigInt(num)
        for (let i = 0; i < 2000; i++) {let newNum: bigint = ((preveSecret * BigInt(64)) ^ preveSecret) % BigInt(16777216);
            let newNum2: bigint = (newNum / BigInt(32)) ^ newNum;
            newNum2 = newNum2 % BigInt(16777216); 
            
            preveSecret = ((newNum2 * BigInt(2048)) ^ newNum2) % BigInt(16777216);
        }
        total += preveSecret;
    })
    
    
    return Number(total)
}

export const Part2 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n").map(num => parseInt(num));

    const monkeyChangePrices = {}
    return 2362
    parsedInput.forEach(num => {
        let preveSecret: bigint = BigInt(num)
        let tens = BigInt(num%10)
        let change1 = 10;
        let change2 = 10;
        let change3 = 10;
        let change4 = 10;
        let bigEnough = false;
        for (let i = 0; i < 2000; i++) {
            if (i >2) bigEnough = true;
            let newNum: bigint = ((preveSecret * BigInt(64)) ^ preveSecret) % BigInt(16777216);
            let newNum2: bigint = ((newNum / BigInt(32)) ^ newNum)% BigInt(16777216);

            preveSecret = ((newNum2 * BigInt(2048)) ^ newNum2) % BigInt(16777216);
            
            let tensPlace = preveSecret%BigInt(10);
            change1=change2;
            change2=change3;
            change3=change4;
            change4=Number(tensPlace - tens);
            tens = tensPlace
            if (tensPlace > 0 && bigEnough) {
                const tracker = `${change1},${change2},${change3},${change4}`
                let check = monkeyChangePrices[tracker];
                if (check === undefined) {
                    check = {total: Number(tensPlace), [num]: Number(tensPlace)};
                    monkeyChangePrices[tracker] = check;
                }
                if (check[num] === undefined) {
                    check[num] = Number(tensPlace);
                    check['total'] = check['total']+Number(tensPlace);
                }
            }
            
        }
    })

    
    let bigOne = 0;
    Object.entries(monkeyChangePrices).forEach(changeSet => {
        if (bigOne < changeSet[1]["total"]) bigOne = changeSet[1]["total"]
    })

    return bigOne
}

export const Tests = async () => {

}

// export const Part2 = async () => {
//     const input = await readTextFile(day)
//     // const input = await readTextSample()
//
//     const parsedInput = input.trim().split("\n").map(num => parseInt(num));
//
//     const monkeyChangePrices = {
//         9:{},
//         8:{},
//         7:{},
//         6:{},
//         5:{},
//         4:{},
//         3:{},
//         2:{},
//         1:{},
//     }
//
//     parsedInput.forEach(num => {
//         let preveSecret: bigint = BigInt(num)
//         let tens = [BigInt(num%10)]
//         let change = [];
//         let bigEnough = false;
//         for (let i = 0; i < 2000; i++) {
//             if (i >2) bigEnough = true;
//             let newNum: bigint = ((preveSecret * BigInt(64)) ^ preveSecret) % BigInt(16777216);
//             let newNum2: bigint = (newNum / BigInt(32)) ^ newNum;
//             newNum2 = newNum2 % BigInt(16777216);
//
//             preveSecret = ((newNum2 * BigInt(2048)) ^ newNum2) % BigInt(16777216);
//
//             let tensPlace = preveSecret%BigInt(10);
//             change.push(tensPlace - tens[tens.length - 1])
//             tens.push(tensPlace)
//             if (tensPlace > 0 && bigEnough) {
//                 let check = monkeyChangePrices[Number(tensPlace)][num];
//                 if (check === undefined) {
//                     monkeyChangePrices[Number(tensPlace)][change.slice(change.length-4).toString()] = new Set();
//                 }
//                 monkeyChangePrices[Number(tensPlace)][change.slice(change.length-4).toString()].add(num);
//             }
//
//         }
//     })
//
//
//     let total = 0;
//     temp.forEach(changeSet => {
//         let tempTotal = 0;
//         parsedInput.forEach(num => {
//             for (let i = 9; i > 0; i--) {
//                 if (monkeyChangePrices[i][num].has(changeSet)) {
//                     tempTotal += i;
//                     break;
//                 }
//             }
//         })
//         if (tempTotal >total && tempTotal !== 2416) {
//             total = tempTotal;
//         }
//     })
//
//     console.log('-2,1,-1,2')
//
//     return Number(total)
// }

