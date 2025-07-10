import { promises as fsPromises, readdirSync } from 'fs';

// modern async
async function fileOps() {
    await fsPromises.writeFile('async.txt', 'async hello!');
    const data = await fsPromises.readFile('async.txt', 'utf-8');

    console.log("Async read:",data);
    await fsPromises.unlink('async.txt');
}

fileOps();

console.log('finished...');
const files = readdirSync('.');
console.log("Files in dir:", files);

console.log("Type : ", typeof(files[0]));