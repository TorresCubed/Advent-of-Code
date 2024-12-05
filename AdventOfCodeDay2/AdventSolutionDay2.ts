import {readTextFile, readTextSample} from "../ReadInput";

const day = __filename[__filename.length - 4].toString()

export const Part1 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()
    
    const reports = input.trim().split("\n");
    let parsedReports = []
    
    reports.forEach((line) => {
        let parsedLine =  line.split(/\s+/)
            .map(num => parseInt(num))
            .filter(num => !isNaN(num));
        parsedReports.push(parsedLine);
    })
    
    
    let count = 0;
    
    parsedReports.forEach((report) => {
        let direction = Math.sign(report[0] - report[1]);
        let safe = true;
        for (let j = 0; j < report.length-1; j++) {
            const result = report[j] - report[j+1];
            const difference = Math.abs(result);
            if (difference > 3 || difference < 1 || direction !== Math.sign(result)) {
                safe = false;
                break;
            }
        }
        count += safe ? 1 : 0;
    })

     return count
}

export const Part2 = async () => {
    const input = await readTextFile(day)
    // const input = await readTextSample()


    const reports = input.trim().split("\n");
    let parsedReports = []

    reports.forEach((line) => {
        let parsedLine =  line.split(/\s+/)
            .map(num => parseInt(num))
            .filter(num => !isNaN(num));
        parsedReports.push(parsedLine);
    })

    let count = 0;
    
    parsedReports.forEach((report:number[]) => {
        let reportResult = checkValues(report);
        if (!reportResult) {
            for (let j = 0; j < report.length; j++) {
                let tempArr: number[] = [
                    ...report.slice(0, j),
                    ...report.slice(j + 1)
                ];
                
                if (!checkValues(tempArr)) continue;
                reportResult = true;
                break;
            }
        }
        count += reportResult ? 1 : 0;
    })

    return count
}

const checkValues = (report: number[]) => {
    return report.every((value, index) => {
        if (index === report.length - 1) return true;  // Don't check last element
        const result = value - report[index + 1];
        const difference = Math.abs(result);
        return difference >= 1 && difference <= 3 && Math.sign(result) === Math.sign(report[0] - report[1]);
    });
}

export const Tests = async () => {

}
