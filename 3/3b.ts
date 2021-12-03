import * as fs from 'fs';

const input = Buffer.from(fs.readFileSync('input.txt')).toString().split("\n");

class counter{
    public zeros=0;
    public ones=0;
}

function mostCommons (input:string[]){
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

    return bucket;
}

let ogrStartInputs:string[] = []; 
input.forEach(x => ogrStartInputs.push(x));
let ogrInit = mostCommons(ogrStartInputs);

function ogrIter(x:number, ogrStartInputs:string[], ogrInit:counter[]){ //Debug, should have added else if (ogrInit[x].ones triple equals)
    let refresher:string[] = [];
    for (const line of ogrStartInputs){
        if (ogrInit[x].ones>ogrInit[x].zeros && line.charAt(x)==="1"){
            refresher.push(line);
        }
        else if (ogrInit[x].ones < ogrInit[x].zeros && line.charAt(x) === "0"){
            refresher.push(line)
        }
        else if (ogrInit[x].ones === ogrInit[x].zeros){
            if (line.charAt(x)==="1"){
                refresher.push(line);
            }
        }
    }
    ogrStartInputs = refresher;
    ogrInit = mostCommons(ogrStartInputs);

    return refresher;
}

for (let x = 0; x < 12; x++){
    let res = ogrIter(x, ogrStartInputs, ogrInit)
    if (res.length===1){
        console.log(res[0])
        break;
    }

    ogrStartInputs = res;
    ogrInit = mostCommons(ogrStartInputs);
}


let co2StartInputs:string[] = []; 
input.forEach(x => co2StartInputs.push(x));

let co2Init = mostCommons(co2StartInputs);

for (let x = 0; x < 12; x++){
    if (co2StartInputs.length === 1){
        console.log(co2StartInputs[0]);
        break;
    }

    let refresher:string[] = [];
    for (const line of co2StartInputs){
        if (co2Init[x].ones < co2Init[x].zeros && line.charAt(x)==="1"){
            refresher.push(line);
        }
        else if (co2Init[x].ones > co2Init[x].zeros && line.charAt(x) === "0"){
            refresher.push(line)
        }
        else if (co2Init[x].ones === co2Init[x].zeros){
            if (line.charAt(x)==="0"){
                refresher.push(line);
            }
        }
    }
    co2StartInputs = refresher;
    co2Init = mostCommons(co2StartInputs);
}

//100111110011 = 2547
//001011100001 = 737