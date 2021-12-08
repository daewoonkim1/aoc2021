import * as fs from 'fs';

const input = Buffer.from(fs.readFileSync('input.txt')).toString().split("\n");

class pars {
    public sigpat:string[];
    public fourdigval:string[];

    constructor (sp:string[], fourdig:string[]){this.sigpat = sp, this.fourdigval=fourdig}
}

let rules: pars[] = []

for (const inp of input){
    rules.push(new pars (inp.split(" | ")[0].split(" "), inp.split(" | ")[1].split(" ")))
}

const one = "//" //One is two letters
const four = "//" //Four requires four
const seven = "//" //Seven requires three
const eight = "//" // Eight requires seven

let sum = 0;
rules.forEach (x => {
    x.fourdigval.forEach(val => {
        if (val.length === 2 || val.length === 4 || val.length === 3 || val.length === 7){
            sum++;
        }
    })
})
console.log(sum);
console.log("");
