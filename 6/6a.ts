import * as fs from 'fs';

const input = Buffer.from(fs.readFileSync('input.txt')).toString().split(",");

class fish {
    public daysUntil: number;

    constructor (inp:number){
        this.daysUntil = inp;
    }
}

function dayPass (thefishes:fish[]){
    let fishestoAdd:fish[] = []
    thefishes.forEach(eachFish => {
        if (eachFish.daysUntil === 0){
            eachFish.daysUntil = 6;
            fishestoAdd.push(new fish(8));
        }
        else{
            eachFish.daysUntil--;
        }
    })
    fishestoAdd.forEach(x => thefishes.push(x))
}

let fishes: fish [] = [];

for (const inp of input){
    fishes.push(new fish(Number.parseInt(inp)));
}

for (let x = 0; x < 256; x++){
    dayPass(fishes);
}

console.log(fishes.length);
console.log("");