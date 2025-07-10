// entry
import * as fs from "fs";

console.log("Started stuff...");

// write synchonously
// fs.writeFileSync('sample.txt', 'hello, world');

// read file synchronously
const content = fs.readFileSync('sample.txt', 'utf-8');
console.log('sync read : ', content);

// append sync
fs.appendFileSync('sample.txt', '\nAppend line');

// delete sync
// fs.unlinkSync('sample.txt');


