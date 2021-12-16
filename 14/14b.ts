import * as fs from 'fs'

const input = Buffer.from(fs.readFileSync('/Users/daewoonkim/git/neo/aoc2021/14/inputs.txt')).toString().split("\n")

let starter = input[0]
const rules = new Map<string,string>()

input.forEach(x => {
    if (input.indexOf(x)!==0 && input.indexOf(x)!==1){
        rules.set(x.split(" -> ")[0],x.split(" -> ")[1])
    }
})

function compress (){

}

function step (compound:string, keys:Map<string,string>){
    let builder = compound.charAt(0);
    for (let x = 1; x <= compound.length; x++){
        if (keys.get(compound.charAt(x-1)+compound.charAt(x))!==undefined){
            builder+=keys.get(compound.charAt(x-1)+compound.charAt(x)) + compound.charAt(x)
        }
        else{
            builder+=compound.charAt(x)
        }
    }        
    return builder;
}

const res = new Map<string,number>()
function updateRes (subcompound:string){
    for (let x = 0; x < subcompound.length; x++){
        const resget = res.get(subcompound.charAt(x))
        if (resget===undefined){
            res.set(subcompound.charAt(x), 1)
        }
        else{
            res.set(subcompound.charAt(x), resget + 1)
        }
    }
}

for (let i = 1; i <= starter.length; i++){
    let substarter = ""
    for (let x = 0; x< 40; x++){ //Wishful thinking
        if (x===0){
            substarter = step (starter.charAt(i-1)+starter.charAt(i), rules);
        }
        else{
            substarter = step(substarter, rules)
        }
    }
    updateRes(substarter); //N off by 1 for 10 steps, double counted somewhere
}

let compare = Array.from(res.values()).sort((a,b) => a-b)
console.log(Math.abs(compare[compare.length-1]-compare[0]))



console.log("")
