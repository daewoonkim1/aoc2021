import * as fs from 'fs'

const input = Buffer.from(fs.readFileSync("input.txt")).toString().split("\n");
const board = input.map(row => Array.from(row).map(x=>Number.parseInt(x)))


class point {
    public x:number;
    public y:number;
    public value:number;

    public connections:point[]=[]
    constructor (x:number, y:number, value:number){this.x=x, this.y=y, this.value=value}
}

let lowpoints:point[] = []
let points:point[] = new Array()

for (let x = 0 ; x < board.length; x++){
    for (let y = 0; y< board[x].length; y++)
    {
        const pushpoint = (new point(x,y, board[x][y]));
        points.push(pushpoint)

        if (x===0){
            if (y===0 
                && board[0][0] < board[0][1]
                && board[0][0] < board[1][0]){
                    lowpoints.push(pushpoint)
            }
            else if (y===board[0].length-1
                && board[0][y] < board[0][y-1] 
                && board[0][y] < board[1][y]){
                    lowpoints.push(pushpoint)
            }
            else if (board[0][y] < board[0][y-1] 
                &&  board[0][y] < board[0][y+1]
                &&  board[0][y] < board[1][y]){
                    lowpoints.push(pushpoint)
            }
        }
        else if (x===board.length-1){
            if (y===0
                && board[x][0] < board[x-1][0]
                && board[x][0] < board[x][1]){
                    lowpoints.push(pushpoint)
            }
            else if (y===board[x].length-1
                && board[x][y] < board[x-1][y]
                && board[x][y] < board[x][y-1]){
                    lowpoints.push(pushpoint)
            }
            else if (board[x][y] < board[x-1][y]
                && board[x][y] < board[x][y+1]
                && board[x][y] < board[x][y-1]){
                    lowpoints.push(pushpoint)
            }
        }
        else if (y===0 && x!==0 && x!==board.length-1
            && board[x][y] < board[x][1]
            && board[x][y] < board[x+1][0]
            && board[x][y] < board[x-1][0]){
                lowpoints.push(pushpoint)
        }
        else if (y===board[x].length-1 && x!==0 && x!==board.length-1
            && board[x][y] < board[x][y-1]
            && board[x][y] < board[x+1][y]
            && board[x][y] < board[x-1][y]){
                lowpoints.push(pushpoint)
        }
        else if ( board[x][y] < board[x][y+1]
            && board[x][y] < board[x][y-1]
            && board[x][y] < board[x-1][y]
            && board[x][y] < board[x+1][y]){
                lowpoints.push(pushpoint)
        }
    }
}

//Set point connections
const rowlength = board[0].length
points.forEach(poin => {
    if (poin.x===0){
        if (poin.y===0){
            poin.connections.push(points[1])
            poin.connections.push(points[rowlength])
        }
        else if (poin.y===board[0].length-1){
            poin.connections.push(points[points.indexOf(poin)-1])
            poin.connections.push(points[points.indexOf(poin)+rowlength])
        }
        else {
            poin.connections.push(points[points.indexOf(poin)-1])
            poin.connections.push(points[points.indexOf(poin)+1])
            poin.connections.push(points[points.indexOf(poin)+rowlength])
        }
    }
    else if (poin.x===board.length-1){
        if (poin.y===0){
            poin.connections.push(points[points.indexOf(poin)-rowlength])
            poin.connections.push(points[points.indexOf(poin)+1])
        }
        else if (poin.y===board[poin.x].length-1){
            poin.connections.push(points[points.indexOf(poin)-1])
            poin.connections.push(points[points.indexOf(poin)-rowlength])
        }
        else {
            poin.connections.push(points[points.indexOf(poin)-1])
            poin.connections.push(points[points.indexOf(poin)+1])
            poin.connections.push(points[points.indexOf(poin)-rowlength])
        }
    }
    else if (poin.y===0 && poin.x!==0 && poin.x!==board.length-1){
        poin.connections.push(points[points.indexOf(poin)-rowlength])
        poin.connections.push(points[points.indexOf(poin)+rowlength])
        poin.connections.push(points[points.indexOf(poin)+1])
    }
    else if (poin.y===board[poin.x].length-1 && poin.x!==0 && poin.x!==board.length-1){
        poin.connections.push(points[points.indexOf(poin)-rowlength])
        poin.connections.push(points[points.indexOf(poin)+rowlength])
        poin.connections.push(points[points.indexOf(poin)-1])
    }
    else {
        poin.connections.push(points[points.indexOf(poin)-rowlength])
        poin.connections.push(points[points.indexOf(poin)+rowlength])
        poin.connections.push(points[points.indexOf(poin)-1])
        poin.connections.push(points[points.indexOf(poin)+1])
    }
})

function searchAttempt (lowpoint:point, trail:point[]):point[]{ //wasn't comfortable working with board[][]=undefined
    lowpoint.connections.forEach(connectedpoint => {
        if (connectedpoint.value!==9 && trail.indexOf(connectedpoint)===-1){
            trail.push(connectedpoint)
            searchAttempt(connectedpoint, trail);
        }
        else{
            return;
        }
    })
    return trail;
}


let basins:point[][] = []
lowpoints.forEach(point => { basins.push(searchAttempt(point, [point]))})
const basSizes = basins.map(basin => basin.length).sort((a,b) => b-a);

console.log(basSizes[0] * basSizes[1] * basSizes[2])
console.log("")
