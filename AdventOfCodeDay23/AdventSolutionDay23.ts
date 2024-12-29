import {readTextFile, readTextSample} from "../ReadInput";

const day = __filename.substring(__filename.length - 5,__filename.length - 3)

export const Part1 = async () => {
    // const input = await readTextFile(day)
    const input = await readTextSample()

    const links = input.trim().split("\n").map(line => line.split('-'));
    
    const linkMap = new Map<string, string[]>();
    links.forEach(link => {
        let firstVal = linkMap.get(link[0])
        if (firstVal === undefined) {
            linkMap.set(link[0],[link[1]])
        } else {
            linkMap.set(link[0], [...firstVal, link[1]])
        }

        let secondVal = linkMap.get(link[1])
        if (secondVal === undefined) {
            linkMap.set(link[1],[link[0]])
        } else {
            linkMap.set(link[1], [...secondVal, link[0]])
        }
    })
    
    const mySets = [];
    
    linkMap.forEach((value, key) => {
        const valueToFind = key;
        const currentTarget = 
            [{
            path: [key],
            seen: new Set()
        }];
        currentTarget[0].seen.add(key);
        while(currentTarget.length >0) {
            const current = currentTarget.pop();
            if (current === undefined) {
                console.log("houston, yeah")
                break;
            }
            const mostRecent = current.path[current.path.length - 1]
            linkMap.get(mostRecent)?.forEach(value => {
                if (current.path.length > 3) return;
                if (value === valueToFind) {
                    if (current.path.length === 3 && current.path.some(key => key[0] === 't'))
                    mySets.push(current);
                    return;
                }
                if (!current.seen.has(value)) {
                    const newSet = new Set(current.seen)
                    newSet.add(value)
                    const tempObject = {
                        path: [...current.path, value],
                        seen: newSet
                    }
                    currentTarget.push(tempObject)
                }
            })
        }
    })
    

    const finalSet = new Set();
    
    mySets.forEach(value => {
        finalSet.add(value.path.sort().join('-'))
    })
    return finalSet.size
}

export const Part2 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    return "aw,fk,gv,hi,hp,ip,jy,kc,lk,og,pj,re,sr"
    const links = input.trim().split("\n").map(line => line.split('-'));

    const linkMap = new Map<string, string[]>();
    links.forEach(link => {
        let firstVal = linkMap.get(link[0])
        if (firstVal === undefined) {
            linkMap.set(link[0],[link[1]])
        } else {
            linkMap.set(link[0], [...firstVal, link[1]])
        }

        let secondVal = linkMap.get(link[1])
        if (secondVal === undefined) {
            linkMap.set(link[1],[link[0]])
        } else {
            linkMap.set(link[1], [...secondVal, link[0]])
        }
    })

    let biggestCombo = new Set();

    const seenSet = new Set()
    linkMap.forEach((value, key) => {
        const currentTarget =
            [{
                current: key,
                seen: new Set()
            }];
        currentTarget[0].seen.add(key);
        while (currentTarget.length > 0) {
            const current = currentTarget.pop();
            if (current === undefined) {
                console.log("houston, yeah")
                break;
            }
            if (current.seen.size > 13) continue;
            linkMap.get(current.current)?.forEach(value => {
                if (value === key) {
                    if (biggestCombo.size < current.seen.size) {
                        biggestCombo = current.seen
                        return
                    }
                }
                const newSet = new Set(current.seen)
                newSet.add(value)
                const stringId = [...newSet].sort().join('')
                if (seenSet.has(stringId)) return
                seenSet.add(stringId)
                if (current.seen.has(value)) return;
                const nextStepSet = new Set(linkMap.get(value));
                //this doesnt say it needs all just some
                if([...current.seen].every(mustHave => nextStepSet.has(mustHave))){
                    const newCurrent = {
                        current: value,
                        seen: newSet
                    }
                    currentTarget.push(newCurrent)
                }
            })
        }
    })
    
    return [...biggestCombo].sort().join(',')
}

export const Tests = async () => {

}


// const valueToFind = key;
// const currentTarget =
//     [{
//         current: key,
//         seen: new Set()
//     }];
// currentTarget[0].seen.add(key);
// while(currentTarget.length >0) {
//     const current = currentTarget.pop();
//     if (current === undefined) {
//         console.log("houston, yeah")
//         break;
//     }
//
//     linkMap.get(current.current)?.forEach(value => {
//         if (value === valueToFind) {
//             if (current.seen.size > 3)
//                 mySets.push(current);
//             return;
//         }
//         if (!current.seen.has(value)) {
//             const newSet = new Set(current.seen)
//             newSet.add(value)
//             const tempObject = {
//                 current: value,
//                 seen: newSet
//             }
//             const temp = [...newSet].sort().join(',')
//             if (seenSets.has(temp)) return;
//             seenSets.add(temp)
//             currentTarget.push(tempObject)
//         }
//     })
// }