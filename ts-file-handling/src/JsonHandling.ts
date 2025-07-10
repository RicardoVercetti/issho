import * as fs from 'fs';

type User = {
    name: string,
    age: number;
}

const user: User = {
    name: 'kaori',
    age: 25
}

fs.writeFileSync('user.json', JSON.stringify(user, null, 2));

const raw = fs.readFileSync('user.json', 'utf-8');
// const parsed: User = JSON.parse(raw);
console.log("User: ", raw);