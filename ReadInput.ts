import {promises as fs} from 'fs';

export const createTextFiles = async () => {
    const reject  = 'Please don\'t repeatedly request this endpoint before it unlocks! The calendar countdown is synchronized with the server time; the link will be enabled on the calendar the instant this puzzle becomes available.'
    const easternTime = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));

    let days = 0;
    if (easternTime.getMonth() + 1 !== 12) {
        days = 24;
    } else {
        days = easternTime.getDate();
    }
    
    for (let day = 1; day <= days; day++) {
        const dirPath = `AdventOfCodeDay${day}`
        const textPath = `AdventOfCodeDay${day}/AdventInputDay${day}.txt`
        const codePath = `AdventOfCodeDay${day}/AdventSolutionDay${day}.ts`
        
        try {
            await fs.access(dirPath)
        } catch (error) {
            await fs.mkdir(dirPath, { recursive: true });
            await fs.copyFile('AdventSolutionDayBoiler.ts', codePath);
        }

        let fileValue = ''
        try {
            fileValue = await fs.readFile(textPath, 'utf-8');
        } catch (err) {
            console.error('File does not exist: adding, and fetching');
        }

        if (!fileValue || fileValue === reject) {
            fetch(`https://adventofcode.com/${easternTime.getFullYear()}/day/${day}/input`, {
                headers: {'Cookie': "session=53616c7465645f5f6ab8e7c5bfd0dc9887b5c7b9cdd323c69173c3aa2889cb438d322aeec1b0788bdae4c8ba23539d7d3d16c15d9870a1749471e3be4c88199d"}
            })
                .then(res => res.text())
                .then(text => fs.writeFile(textPath, text))
                .catch(err => {
                    console.error("Error:", err);
                });
        }
    }
}
export const readTextFile = async (day: string) => {
    const filePath = `AdventOfCodeDay${day}/AdventInputDay${day}.txt`
    try {
        return await fs.readFile(filePath, 'utf-8');
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

export const readTextSample = async () => {
    const filePath = `sample.txt`
    try {
        return await fs.readFile(filePath, 'utf-8');
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

createTextFiles().then(r => r)