import * as fs from 'fs'

const input = Buffer.from(fs.readFileSync("input.txt")).toString().split("\n")

let scoreboard:number[] = []

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
        let score = 0;
        while (tracker.length!==0){
            const compare = tracker.pop();
            if (compare === "("){score = (score*5) + 1}
            else if (compare === "["){score = (score*5) + 2}
            else if (compare === "{"){score = (score*5) + 3}
            else if (compare === "<"){score = (score*5) + 4}
        }
        scoreboard.push(score);
    }
})

console.log(scoreboard.sort((a,b) =>a-b)[Math.floor(scoreboard.length/2)])
console.log("");