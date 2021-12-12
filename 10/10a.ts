import * as fs from 'fs'

const input = Buffer.from(fs.readFileSync("input.txt")).toString().split("\n")

let scoreboard:number[] = []

let incomplete:string[] = [];

input.forEach(line => {
    let tracker:string [] = []
    let lazyFirst:string[] = []
    Array.from(line).forEach(bracket => {
        if (bracket === "(" || bracket === "[" || bracket === "{" || bracket==="<"){
            tracker.push(bracket);
        }
        else {
            const compare = tracker.pop();
            if (compare === "(" && bracket ===")"){}
            else if (compare === "[" && bracket === "]"){}
            else if (compare === "{" && bracket === "}"){}
            else if (compare === "<" && bracket === ">"){}
            else{
                lazyFirst.push(bracket)
            }
        }
    })

    if (lazyFirst.length===0){
        incomplete.push(line)
    }

    if (lazyFirst[0]===")"){
        scoreboard.push(3)
    }
    else if (lazyFirst[0]==="]"){
        scoreboard.push(57)
    }
    else if (lazyFirst[0]==="}"){
        scoreboard.push(1197)
    }
    else if (lazyFirst[0]===">"){
        scoreboard.push(25137)
    }
})

console.log(scoreboard.reduce((prev,curr)=>prev+=curr))
console.log("");