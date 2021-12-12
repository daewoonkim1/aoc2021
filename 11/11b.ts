import * as fs from 'fs'

const input = Buffer.from(fs.readFileSync('input.txt')).toString().split("\n")

//Just going to reuse day 9
const board = input.map(row => Array.from(row).map(x=>Number.parseInt(x)))

class point {
    public x:number;
    public y:number;
    public value:number;
    public flashing:boolean=false;

    public connections:point[]=[]
    constructor (x:number, y:number, value:number){this.x=x, this.y=y, this.value=value}
}

let points:point[] = new Array()

for (let x = 0 ; x < board.length; x++){
    for (let y = 0; y< board[x].length; y++)
    {
        const pushpoint = (new point(x,y, board[x][y]));
        points.push(pushpoint)
    }
}

const rowlength = board[0].length
points.forEach(poin => {
    if (poin.x===0){
        if (poin.y===0){
            poin.connections.push(points[1])
            poin.connections.push(points[rowlength])
            poin.connections.push(points[rowlength+1])
        }
        else if (poin.y===board[0].length-1){
            poin.connections.push(points[points.indexOf(poin)-1])
            poin.connections.push(points[points.indexOf(poin)+rowlength])
            poin.connections.push(points[points.indexOf(poin)+rowlength-1])
        }
        else {
            poin.connections.push(points[points.indexOf(poin)-1])
            poin.connections.push(points[points.indexOf(poin)+1])
            poin.connections.push(points[points.indexOf(poin)+rowlength])

            poin.connections.push(points[points.indexOf(poin)+rowlength+1])
            poin.connections.push(points[points.indexOf(poin)+rowlength-1])
        }
    }
    else if (poin.x===board.length-1){
        if (poin.y===0){
            poin.connections.push(points[points.indexOf(poin)-rowlength])
            poin.connections.push(points[points.indexOf(poin)+1])
            poin.connections.push(points[points.indexOf(poin)-rowlength+1])
        }
        else if (poin.y===board[poin.x].length-1){
            poin.connections.push(points[points.indexOf(poin)-1])
            poin.connections.push(points[points.indexOf(poin)-rowlength])
            poin.connections.push(points[points.indexOf(poin)-rowlength-1])
        }
        else {
            poin.connections.push(points[points.indexOf(poin)-1])
            poin.connections.push(points[points.indexOf(poin)+1])
            poin.connections.push(points[points.indexOf(poin)-rowlength])

            poin.connections.push(points[points.indexOf(poin)-rowlength+1])
            poin.connections.push(points[points.indexOf(poin)-rowlength-1])
        }
    }
    else if (poin.y===0 && poin.x!==0 && poin.x!==board.length-1){
        poin.connections.push(points[points.indexOf(poin)-rowlength])
        poin.connections.push(points[points.indexOf(poin)+rowlength])
        poin.connections.push(points[points.indexOf(poin)+1])

        poin.connections.push(points[points.indexOf(poin)-rowlength+1])
        poin.connections.push(points[points.indexOf(poin)+rowlength+1])
    }
    else if (poin.y===board[poin.x].length-1 && poin.x!==0 && poin.x!==board.length-1){
        poin.connections.push(points[points.indexOf(poin)-rowlength])
        poin.connections.push(points[points.indexOf(poin)+rowlength])
        poin.connections.push(points[points.indexOf(poin)-1])

        poin.connections.push(points[points.indexOf(poin)-rowlength-1])
        poin.connections.push(points[points.indexOf(poin)+rowlength-1])
    }
    else {
        poin.connections.push(points[points.indexOf(poin)-rowlength])
        poin.connections.push(points[points.indexOf(poin)+rowlength])
        poin.connections.push(points[points.indexOf(poin)-1])
        poin.connections.push(points[points.indexOf(poin)+1])

        poin.connections.push(points[points.indexOf(poin)-rowlength-1])
        poin.connections.push(points[points.indexOf(poin)+rowlength-1])
        poin.connections.push(points[points.indexOf(poin)-rowlength+1])
        poin.connections.push(points[points.indexOf(poin)+rowlength+1])
    }
})

function step(pointsg:point[]):point[]{
    pointsg.forEach(octopus => octopus.value = octopus.value+1)

    while (pointsg.filter(x => x.value>9 && x.flashing===false).length!==0){
        pointsg.filter( x => x.value>9 && x.flashing===false ).forEach(flashingOctopus => {
            flashingOctopus.flashing = true

            flashingOctopus.connections.forEach(flashedTopus => {
                flashedTopus.value = flashedTopus.value+1
            })
        })
    }

    points.forEach(searchFlash => { if (searchFlash.flashing===true){searchFlash.value=0; searchFlash.flashing=false;} } )

    return pointsg
}

let steptracker=0;
while (!points.every(octopus => octopus.value===0)){
    points = step(points);
    steptracker++;
}

console.log(steptracker)
console.log("")
