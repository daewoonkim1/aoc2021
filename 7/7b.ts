import * as fs from 'fs';

const input = Buffer.from(fs.readFileSync('input.txt')).toString().split(",");
const intput:number[] = input.map(x => Number.parseInt(x));
let max:number=0
intput.forEach(x => {if (x>max) max = x})

//Some thinking and my inuition is telling me it's calculate distance from x for each crab, sum them and pick the smallest if people were able to solve it that quickly

function stepCounter (distance:number):number{ //high school math huh
    return (distance * (distance+1))/2
}

let min = -1;
for (let x = 0; x <= max; x++){
    let sum = 0;
    intput.forEach(y => {
        sum += stepCounter(Math.abs(y-x)); //Don't understand how reduce works
    })

    if ( min === -1){min=sum} else { if (sum < min) min = sum;}
    
    console.log(`${x}: ` + sum)
}
console.log(min);
console.log("");
