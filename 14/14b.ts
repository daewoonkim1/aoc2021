import * as fs from 'fs'

const input = Buffer.from(fs.readFileSync('input.txt')).toString().split("\n")

let starter = input[0]
const rules = new Map<string,string>()

input.forEach(x => {
    if (input.indexOf(x)!==0 && input.indexOf(x)!==1){
        rules.set(x.split(" -> ")[0],x.split(" -> ")[1])
    }
})

function step (compound:string, keys:Map<string,string>){
    let builder = compound.charAt(0);
    for (let x = 1; x <= compound.length; x++){
        if (keys.get(compound.charAt(x-1)+compound.charAt(x))!==undefined){
            builder+=rules.get(compound.charAt(x-1)+compound.charAt(x)) + compound.charAt(x)
        }
        else{
            builder+=compound.charAt(x)
        }
    }        
    return builder;
}

//WIP yeah there's something to look into
for (let x = 0; x< 40; x++){
    starter = step (starter, rules);
}

const res = new Map<string,number>()
for (let x = 0; x < starter.length; x++){
    const resget = res.get(starter.charAt(x))
    if (resget===undefined){
        res.set(starter.charAt(x), 1)
    }
    else{
        res.set(starter.charAt(x), resget + 1)
    }
}

let compare = Array.from(res.values()).sort((a,b) => a-b)
console.log(Math.abs(compare[compare.length-1]-compare[0]))


console.log("")
