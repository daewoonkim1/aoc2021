import * as fs from 'fs';

const input = Buffer.from(fs.readFileSync('input.txt')).toString().split("\n");

let counter = 0;
let tailSum = Number.parseInt(input[2]) +  Number.parseInt(input[1]) +  Number.parseInt(input[0])
let x = 3;
while (x < input.length){
    const currentSum = Number.parseInt(input[x]) +  Number.parseInt(input[x-1]) +  Number.parseInt(input[x-2]);
    if (currentSum > tailSum){
        counter++;
    }
    tailSum = currentSum;
    x++;
}

console.log(counter);