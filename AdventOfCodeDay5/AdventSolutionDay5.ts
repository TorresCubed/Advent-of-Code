import {readTextFile, readTextSample} from "../ReadInput";

const day = __filename[__filename.length - 4].toString()
export const Part1 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()
    
    const rulesAndOrder = input.trim().split("\n\n");
    
    const rules = {};
    rulesAndOrder[0].split("\n").forEach(rule => {
        const split = rule.split('|');
        if (!rules[split[0]]) rules[split[0]] = [];
        rules[split[0]].push(parseInt(split[1]));
    });
    
    const orders =  [];
    rulesAndOrder[1].split("\n").forEach(order => {
        orders.push(order.split(",").map(num => parseInt(num)));
    })
    
    const results = orders.filter(order => {
        for (let j = 0; j < order.length; j++) {
            const indexOne = order.indexOf(order[j]);
            const indexOther = rules[order[j]]
                ?.map((target: number) => order.indexOf(target))
                .filter(index => index != -1) ?? [];
            if (indexOther.some(index => indexOne > index)) {
                return false;
            }
        }
        return true;
    })
    return results.map(result => result[(result.length - 1)/2]).reduce((acc , val) => acc + val);
}

export const Part2 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const rulesAndOrder = input.trim().split("\n\n");

    const rules = {};
    rulesAndOrder[0].split("\n").forEach(rule => {
        const split = rule.split('|');
        if (!rules[split[0]]) rules[split[0]] = [];
        rules[split[0]].push(parseInt(split[1]));
    });

    const orders =  [];
    rulesAndOrder[1].split("\n").forEach(order => {
        orders.push(order.split(",").map(num => parseInt(num)));
    })

    const results = orders.filter(order => {
        for (let j = 0; j < order.length; j++) {
            const indexOne = order.indexOf(order[j]);
            const indexOther = rules[order[j]]
                ?.map((target: number) => order.indexOf(target))
                .filter(index => index != -1) ?? [];
            if (indexOther.some(index => indexOne > index)) {
                return true;
            }
        }
        return false;
    })
    
    return results.map(result => result.sort((a,b) => rules[a]?.includes(b) ? -1 : rules[b]?.includes(a) ? 1 : 0))
        .map(result => result[(result.length - 1)/2])
        .reduce((acc , val) => acc + val);
}

export const Tests = async () => {

}

