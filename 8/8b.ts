import * as fs from 'fs';

const input = Buffer.from(fs.readFileSync('inputs.txt')).toString().split("\n");

class pars {
    public sigpat:string[];
    public fourdigval:string[];

    constructor (sp:string[], fourdig:string[]){this.sigpat = sp, this.fourdigval=fourdig}
}

let rules: pars[] = []

for (const inp of input){
    rules.push(new pars (inp.split(" | ")[0].split(" "), inp.split(" | ")[1].split(" ")))
}

const zero = 'abcdeg'
const one = 'ab' //One is two letters
const two = 'acdfg'
const three = 'abcdf'
const four = 'abef' //Four is 4
const five =  'bcdef'
const six = 'bcdefg'
const seven = 'abd' //Seven requires three
const eight = 'abcdefg' // Eight requires seven
const nine = 'abcdef' //

//Map the parts onto 1d array?

function sortLetters (letters:string){
    return Array.from(letters).sort().reduce((prev,curr) => prev+=curr)
}

function letterDiff (worda:string, wordb:string){
    return Array.from(worda).filter(x=>Array.from(wordb).indexOf(x)===-1);
}

function deecode (tendigits: string[]):string[]{
    let builder:string[] = Array(10);

    tendigits.forEach (dig => {
        if (dig.length === 2){
            builder[1]=sortLetters(dig);
        }
        else if (dig.length === 3){
            builder[7]= sortLetters(dig)
        }
        else if (dig.length === 4){
            builder[4] = sortLetters(dig)
        }
        else if (dig.length === 7){
            builder[8]= sortLetters(dig)
        }
    })

    const tophat = letterDiff(builder[7], builder[7]);
    builder[6] = sortLetters(letterDiff(builder[1],builder[8]).reduceRight((prev,curr)=>prev+=curr));
    //TODO: Figure out 0,2,3,5,9, getting late

    return builder;
}

let sum = 0;
rules.forEach (x => {
    let rules:number[] = []
    x.sigpat.forEach(pat => {
        const decode:string[] = deecode(pat.split(" "));
    })
})
console.log(sum);
console.log("");
