import * as fs from 'fs';

const input = Buffer.from(fs.readFileSync('input.txt')).toString().split(",");

class crab {
    public id:number;
    public position:number;
    public distanceFrom:number

    constructor (id:number, pos:number, df:number){this.id = id; this.position=pos; this.distanceFrom = df}
}

const crabs: Map<number, crab[]> = new Map<number,crab[]>();

for (let x = 0; x < input.length; x++){
    crabs.set(x, []);
    for (let y = 0; y < input.length; y++){
        if (x!==y){
            let change = crabs.get(x);
            change.push(new crab(y,Number.parseInt(input[y]), Math.abs(Number.parseInt(input[x])-Number.parseInt(input[y]))));
            crabs.set(x, change);
        }
    }
}

const crabDist: Map<number,number> = new Map<number,number>();

for (let x = 0; x < input.length; x++){
    let distSum = 0;

    let iter = crabs.keys();
    for (let key = iter.next(); key.done !== true; key=iter.next()){ //uh oh
        crabs.get(key.value).forEach(y =>{
            if (y.id === x){
                distSum+=y.distanceFrom;
            }
        })
    }
    crabDist.set(x, distSum);
}

let min = crabDist.get(0);
for(let x = 1; x < input.length; x++){
    if (crabDist.get(x) < min){
        min = crabDist.get(x);
    }
}

console.log(min); //7b -- Got lucky that the cheapest location was one of the points a crab was already on
console.log("");