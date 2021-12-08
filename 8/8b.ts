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

function sortLetters (letters:string){
    return Array.from(letters).sort().reduce((prev,curr) => prev+=curr)
}

function letterDiff (worda:string, wordb:string){
    return Array.from(worda).filter(x=>Array.from(wordb).indexOf(x)===-1);
}

function deecode (tendigits: string[]):string[]{
    let builder:string[] = Array(10);

    let lengthfives:string[] = []
    let lengthsixes:string[] = []

    let onetoArr:string[] = []
    let fourtoArr:string[] = []

    tendigits.forEach (dig => {
        if (dig.length === 2){
            builder[1]=sortLetters(dig);
            onetoArr=Array.from(builder[1])
        }
        else if (dig.length === 4){
            builder[4] = sortLetters(dig)
            fourtoArr = Array.from(builder[4])
        }
        else if (dig.length === 3){
            builder[7]= sortLetters(dig)
        }
        else if (dig.length === 7){
            builder[8]= sortLetters(dig)
        }
        else if (dig.length === 5){
            lengthfives.push(sortLetters(dig));
        }
        else if (dig.length === 6){
            lengthsixes.push(sortLetters(dig));
        }
    })

    const topleftcenter = letterDiff(builder[4],builder[1]);
    builder[3] = sortLetters(lengthfives.filter(x => Array.from(x).indexOf(onetoArr[0])!==-1 && Array.from(x).indexOf(onetoArr[1])!==-1)[0]);
    builder[5] = sortLetters(lengthfives.filter(x => Array.from(x).indexOf(topleftcenter[0])!==-1 && Array.from(x).indexOf(topleftcenter[1])!==-1)[0]);
    builder[2] = sortLetters(lengthfives.filter(x => x!== builder[3] && x!==builder[5])[0]);

    builder[9] = sortLetters(lengthsixes.filter(x => Array.from(x).indexOf(fourtoArr[0])!==-1 && Array.from(x).indexOf(fourtoArr[1])!==-1 && Array.from(x).indexOf(fourtoArr[2])!==-1 && Array.from(x).indexOf(fourtoArr[3])!==-1)[0])
    lengthsixes = lengthsixes.filter(x => x!==builder[9])
    builder[0] = sortLetters(lengthsixes.filter(x => Array.from(x).indexOf(onetoArr[0])!==-1 && Array.from(x).indexOf(onetoArr[1])!==-1)[0]);
    lengthsixes = lengthsixes.filter(x => x!==builder[0])
    builder[6] = lengthsixes[0]
    return builder;
}

let sum = 0;
rules.forEach (x => {
    const decode:string [] = deecode(x.sigpat);

    let letterbuilder=""
    x.fourdigval.forEach(four=> {
        letterbuilder+=decode.indexOf(sortLetters(four)) +""
    })

    sum+=Number.parseInt(letterbuilder);
})

console.log(sum);
console.log("");
