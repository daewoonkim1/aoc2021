import * as fs from 'fs';

const input = Buffer.from(fs.readFileSync('input.txt')).toString().split(",");

function iterateDay (fishMap:Map<number,number>){
    const newFish = fishMap.get(0);

    fishMap.set(0, fishMap.get(1));
    fishMap.set(1, fishMap.get(2));
    fishMap.set(2, fishMap.get(3));
    fishMap.set(3, fishMap.get(4));
    fishMap.set(4, fishMap.get(5));
    fishMap.set(5, fishMap.get(6));
    fishMap.set(6, fishMap.get(7) + newFish);
    fishMap.set(7, fishMap.get(8));
    fishMap.set(8, newFish);
}

//Use a map instead
let fishes:Map<number,number> = new Map<number,number>();
fishes.set(0,0);
fishes.set(1,0);
fishes.set(2,0);
fishes.set(3,0);
fishes.set(4,0);
fishes.set(5,0);
fishes.set(6,0);
fishes.set(7,0);
fishes.set(8,0);

for (const inp of input){
    fishes.set(Number.parseInt(inp),fishes.get(Number.parseInt(inp))+1)
}

for (let x = 0; x < 256; x++){
    iterateDay(fishes);
}

console.log(fishes.get(0) + fishes.get(1) + fishes.get(2) + fishes.get(3) + fishes.get(4) + fishes.get(5) + fishes.get(6) + fishes.get(7) + fishes.get(8));
console.log("");
