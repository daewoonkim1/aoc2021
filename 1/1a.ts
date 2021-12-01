import * as fs from 'fs';

const input = Buffer.from(fs.readFileSync('input.txt')).toString().split("\n");

let counter = 0;
let x = 1;
while (x < input.length){
    if (Number.parseInt(input[x])>Number.parseInt(input[x-1])){
        counter++;
    }
    x++;
}

console.log(counter);