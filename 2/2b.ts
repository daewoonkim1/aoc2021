import * as fs from 'fs';

const input = Buffer.from(fs.readFileSync('input.txt')).toString().split("\n");

let x = 0, y=0, aim=0;

for (const dir of input){
    const dirSpl = dir.split(" ");
    if (dir.indexOf("forward")!==-1){
        x+=Number.parseInt(dirSpl[1]);

        y+=aim*Number.parseInt(dirSpl[1]);
        console.log(`forward ` + x);
    }
    else if (dir.indexOf("down")!==-1){
        aim+=Number.parseInt(dirSpl[1]);
        console.log(`down ` + y);
    }
    else if (dir.indexOf("up")!==-1){
        aim-=Number.parseInt(dirSpl[1]);
        console.log(`up `+ y);
    }
}
console.log(x);
console.log(y);
console.log(x*y);