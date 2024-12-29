import {readTextFile, readTextSample} from "../ReadInput";

const day = __filename.substring(__filename.length - 5,__filename.length - 3)

export const Part1 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n").map(line => line.split(''));

    const numpad = [
        ['7', '8', '9'],
        ['4', '5', '6'],
        ['1', '2', '3'],
        ['.', '0', 'A']
    ]
    
    const directionalPad = [
        ['.', '^', 'A'],
        ['<', 'v', '>']
    ]
    
    // const pathMap = new Map<string, string[][]>();
    const paths = new Map<string, [][]>()
    for (const line of parsedInput) {
        const results = shortestPossible(['A',...line], numpad)
        paths.set(line.join(''), results)
    }

    // const directionalPathMap = new Map<string, Map<string, string[][]>>();
    const paths2 = new Map<string, [][]>();
    paths.forEach((coordPath, key) => {
        const results = [];
        coordPath.forEach(path => shortestPossible(['A',...path], directionalPad)
            .forEach(resultingCoordinates =>results.push(resultingCoordinates)))
        paths2.set(key, results)
    })


    // const finalDirectionalMap = new Map<string, Map<string, Map<string, string[][]>>>();

    const paths3 = new Map<string, []>();
    paths2.forEach((coordPath, key) => {
        const results = [];
        coordPath.forEach(path => shortestPossible(['A',...path], directionalPad)
            .forEach(resultingCoordinates => {
                results.push(resultingCoordinates.length)
            }))
        paths3.set(key, results)
    })
    
    let total = 0;
    paths3.forEach((coordPath, key) => {
        const lengthOfMap = coordPath.sort();
        const keyNumber = parseInt(key.match(/\d+/g))
        total +=  lengthOfMap[0]*keyNumber 
    })
    
    return total;
}

export const Part2 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n").map(line => line.split(''));

    const numpad = [
        ['7', '8', '9'],
        ['4', '5', '6'],
        ['1', '2', '3'],
        ['.', '0', 'A']
    ]

    const directionalPad = [
        ['.', '^', 'A'],
        ['<', 'v', '>']
    ]

    // const pathMap = new Map<string, string[][]>();
    const paths = new Map<string, [][]>()
    for (const line of parsedInput) {
        const results = shortestPossible(['A',...line], numpad)
        paths.set(line.join(''), results)
    }
    
    let newPaths = new Map<string, []>()
    
    paths.forEach((coordPath:string[], key) => {
        const results = [];
        coordPath.forEach(path => {
            results.push(memoizeShortCuts(path, 25))
        })
        newPaths.set(key, results)
    })
    // for (let robits = 0; robits < 25; robits++) {
    //     const newPaths = new Map<string, [][]>();
    //     paths.forEach((coordPath:string[], key) => {
    //         const results = [];
    //         coordPath.forEach(path => {
    //             let bigString = ''
    //             const split = path.split('A')
    //             split.forEach(arrows => bigString = bigString + (memoizeShortCuts(arrows)))
    //             results.push(bigString)
    //         })
    //         newPaths.set(key, results)
    //     })
    //     paths = newPaths
    //     console.log(newPaths.get("140A")[0].length)
    // }

    let total = 0;
    newPaths.forEach((coordPath:number[], key) => {
        
        const lengthOfMap = coordPath.sort();
        const keyNumber = parseInt(key.match(/\d+/g))
        total +=  lengthOfMap[0]*keyNumber
    })

    return total;
}
//216706981773404

export const directionalMap =(target: { [key: string]: string }, temp = null) => {
    return {
        "A<": "v<<A",
        "A>": "vA",
        "Av": "<vA",
        "A^": "<A",
        "<A": ">>^A",
        "<^": ">^A",
        "^<": "v<A",
        "<v": ">A",
        ">A": "^A",
        ">v": "<A",
        ">^": "<^A",
        "v>": ">A",
        "v<": "<A",
        "vA": "^>A",
        "^>": "v>A",
        "^A": ">A",
        "AA": "A",
        "<<": "A",
        ">>": "A",
        "vv": "A",
        "^^": "A"
    }[target]
};
export const Tests = async () => {

}

const shortCutArrows = (arrows, repetition) => {
    if (repetition === 0) return arrows.length
    if (arrows.length === 0) {
        return "A"
    }
    let stringLength = 0;
    let start = 'A'
    
    for (let target = 0; target < arrows.length; target++) {
        let end = arrows[target];
        const mapResult = memoizeDirectionalMap(start + end, null)
        if (mapResult === undefined) {
            console.log("WHYYYYYY")
        }
        stringLength += memoizeShortCuts(mapResult, repetition-1)
        start = end;
    }

    return stringLength
}


const shortestPossible = (sequence, graph) => {
    const myMap = new Map();
    
    for (let y = 0; y < graph.length; y++) {
        for (let x = 0; x < graph[y].length; x++) {
            myMap.set(graph[y][x], [y,x]);
        }
    }

    let paths = [[]]
    
    for (let targetCount = 0; targetCount < sequence.length-1; targetCount++) {
        let target = myMap.get(sequence[targetCount]);
        let end = myMap.get(sequence[targetCount+1]);
        
        const tempPaths = [];
        memoizeDijkstra(graph, target, end, '.').forEach(result => {
            paths.forEach(path => {
                const combo = [...path, ...result]
                tempPaths.push([...combo,'A'])
            })
        })
        paths = tempPaths
    }
    
    return paths
}


export const dijkstras = (graph, start, end, restrictedChar:string | null = null) =>  {
    const visitations = [{
        position: start,
        path: new Set(),
    }];

    let fastest = Number.MAX_VALUE;
    
    const paths = [];
    
    while(visitations.length > 0){
        let pathIndex = 0;
        let smallestLength = Number.MAX_VALUE;
        visitations.forEach((path, index) => {
            if (path.path.size < smallestLength) {
                smallestLength = path.path.size;
                pathIndex = index;
            }
        })

        const currentNode = visitations[pathIndex];
        visitations[pathIndex] = visitations[visitations.length - 1];
        visitations.pop();

        if (currentNode === undefined){
            console.log("houston we have a problem")
            break;
        }
        
        const currentPosition = currentNode.position;
        
        if (currentNode.path.size > fastest) break;
        if (currentPosition[0] === end[0] && currentPosition[1] === end[1]) {
            fastest = currentNode.path.size;
            paths.push([...currentNode.path, currentPosition.toString()]);
            continue;
        }

        directions.map(direction => [currentPosition[0] + direction[0],  currentPosition[1] + direction[1]])
            .filter(newPosition => {
                if(newPosition[0] >= 0 &&
                newPosition[1] >= 0 &&
                newPosition[1] < graph[0].length &&
                newPosition[0] < graph.length &&
                !currentNode.path.has(newPosition.toString())) {
                    return !(restrictedChar !== null && graph[newPosition[0]][newPosition[1]] === restrictedChar);
                }
                return false
            }).forEach(newPos => {
                const temp = new Set(currentNode.path)
                temp.add(currentPosition.toString())
                const newPath = {
                    position: newPos,
                    path: temp
                }
            visitations.push(newPath)
        });

    }

    const tempPaths = []
    paths.forEach(result => {
        const arrows = memoizePositionToDirection(result)
        let changed = false;
        let current= arrows[0];
        for (let y = 1; y < arrows.length; y++) {
            if (current !== arrows[y]) {
                if (changed) return
                changed = true;
            }
            current = arrows[y]
        }
        tempPaths.push(arrows)
    })
    
    return tempPaths
}

export const directions = [
    [1,0],
    [-1,0],
    [0,-1],
    [0,1]
]


const positionsToDirection = (positions) => {
    positions = positions.map(position => {
        const nums = position.split(',')
        return [parseInt(nums[0]), parseInt(nums[1])];
    })
    const directionalMap = new Map();

    directionalMap.set("-1,0", '^')
    directionalMap.set("1,0", 'v')
    directionalMap.set("0,-1", '<')
    directionalMap.set("0,1", '>')

    let stepOne = [];
    let stepTwo = [];

    const newPattern = [];

    for (let y = 0; y < positions.length-1; y++) {
        stepOne = positions[y]
        stepTwo = positions[y+1]
        const direction = [stepTwo[0] - stepOne[0], stepTwo[1] - stepOne[1]]
        newPattern.push(directionalMap.get(direction.toString()))
    }

    return newPattern
}

const memoize = (fn) =>  {
    const cache = new Map();
    return function(...args) {
        // Create a key from the arguments by converting them to a string
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key); // Return the cached result if available
        }
        const result = fn(...args); // Otherwise, compute the result
        cache.set(key, result); // Store the result in the cache
        return result;
    };
}


const memoizeDijkstra = memoize(dijkstras);
const memoizePositionToDirection = memoize(positionsToDirection);
const memoizeShortCuts = memoize(shortCutArrows);
const memoizeDirectionalMap = memoize(directionalMap);