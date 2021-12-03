import * as fs from 'fs';

const input = Buffer.from(fs.readFileSync('input.txt')).toString().split("\n");

class counter{
    public zeros=0;
    public ones=0;
}

let bucket:counter[] = [];

for (let x = 0; x< 12; x++){
    bucket.push(new counter());
}

for (const line of input){
    for (let x = 0 ; x< 12; x++){
        if (line.charAt(x)==='1'){
            bucket[x].ones++;
        }
        else {
            bucket[x].zeros++;
        }
    }
}

let builder = "";
for (let x =0; x< 12; x++){
    if (bucket[x].ones > bucket[x].zeros){
        builder+="1"
    }
    else{
        builder+="0"
    }
}

let gamma = builder; //110111000111
let epsilon = "001000111000";

function bin2Dec(exp:string){
    let dec=0;

    let count=0;
    for (let x = exp.length; x>=0; x--){
        if (exp.charAt(x)==="1"){
            dec+=Math.pow(2, count)
        }
        count++;
    }
    return dec;
}

console.log(bin2Dec(gamma) * bin2Dec(epsilon)); //8013344 attempt failed

//3527 * 568 in an online calculator = 2003336 = correct answer