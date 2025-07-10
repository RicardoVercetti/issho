console.log("Started stuff...");



import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('before that..');

rl.question('What is your name? ', (answer) => {
    console.log(`Hello, ${answer}!`);
    rl.close();
    console.log('Done with that...');
});

console.log('after that..');

// Questions
// objects returned in readdirSync()
// 

