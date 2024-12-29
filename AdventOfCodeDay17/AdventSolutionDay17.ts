import {readTextFile, readTextSample} from "../ReadInput";

const day = __filename.substring(__filename.length - 5,__filename.length - 3)

export const Part1 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n\n");
    const program = parsedInput[1].split(': ')[1].split(',').map(item => parseInt(item));
    const registers = [...parsedInput[0].matchAll(/\d+/g)].map(value => parseInt(value[0]));

    let index = 0;
    const output = [];

    bigLoop:
    while (index < program.length) {
        const opcode = program[index];
        if (index++ >= program.length) {
            break
        };
        const operand  = program[index];
        const comboOperand = operand === 4 ? 
            registers[0] : operand === 5 ? 
                registers[1] : operand === 6 ? 
                    registers[2] : operand;
        index++;

        switch (opcode) {
            case 0:
                registers[0] = Math.floor(registers[0]/(Math.pow(2, comboOperand)));
                break;
            case 1:
                const a = BigInt(registers[1]);
                const b = BigInt(operand);
                registers[1] = Number(a ^ b)
                break;
            case 2:
                registers[1] = Math.abs(comboOperand % 8);
                break;
            case 3:
                if (registers[0] !== 0) {
                    index = operand;
                }
                break;
            case 4:
                const c = BigInt(registers[1]);
                const d = BigInt(registers[2]);
                registers[1] = Number(c ^ d);
                break;
            case 5:
                output.push(Math.abs(comboOperand % 8));
                break;
            case 6:
                registers[1] = Math.floor(registers[0]/(Math.pow(2, comboOperand)));
                break;
            case 7:
                registers[2] = Math.floor(registers[0]/(Math.pow(2, comboOperand)));
                break;
            default:
                break;
        }

    }

    return output.join(',');
}

export const Part2 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()

    const parsedInput = input.trim().split("\n\n");
    const program = parsedInput[1].split(': ')[1].split(',').map(item => parseInt(item));
    const registers = [0,0,0];
    
    let output = [];
    let As: number[] = [0];
    
    for (let i = program.length-1; i >= 0; i--) {
        const tempAs = []
        const max = As.length
        for (let j = 0; j < max; j++) {
            const currentA = As.pop();
            
            for (let bitwise = 0; bitwise <= 7; bitwise++) {
                output = []

                registers[0] = currentA * 8 + bitwise;
                let index = 0;

                while (index < program.length) {
                    const opcode = program[index];
                    if (index++ >= program.length) {
                        break
                    }

                    const operand = program[index];
                    const comboOperand = operand === 4 ?
                        registers[0] : operand === 5 ?
                            registers[1] : operand === 6 ?
                                registers[2] : operand;
                    index++;

                    switch (opcode) {
                        case 0:
                            registers[0] = Math.floor(registers[0] / (Math.pow(2, comboOperand)));
                            break;
                        case 1:
                            const a = BigInt(registers[1]);
                            const b = BigInt(operand);
                            registers[1] = Number(a ^ b)
                            break;
                        case 2:
                            registers[1] = Math.abs(comboOperand % 8);
                            break;
                        case 3:
                            if (registers[0] !== 0) {
                                index = operand;
                            }
                            break;
                        case 4:
                            const c = BigInt(registers[1]);
                            const d = BigInt(registers[2]);
                            registers[1] = Number(c ^ d);
                            break;
                        case 5:
                            output.push(Math.abs(comboOperand % 8));
                            break;
                        case 6:
                            registers[1] = Math.floor(registers[0] / (Math.pow(2, comboOperand)));
                            break;
                        case 7:
                            registers[2] = Math.floor(registers[0] / (Math.pow(2, comboOperand)));
                            break;
                        default:
                            break;
                    }
                }
                if (compare(program.slice(i), output)) {
                    tempAs.push(currentA * 8 + bitwise);
                }
            }
        }
        As = tempAs
    }
    
    return As.sort((a, b) => a - b).shift();
}

export const Tests = async () => {

}

const compare = (arr1, arr2) => {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}
