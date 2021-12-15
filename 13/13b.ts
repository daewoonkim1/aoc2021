import * as fs from 'fs'

const input = Buffer.from(fs.readFileSync('input.txt')).toString().split("\n")

class crease {
    public x:number;
    public y:number;
    constructor (x:number, y:number){this.x=x, this.y=y}
}

class point {
    public x:number;
    public y:number;
    public value:string;

    public connections:point[]=[]
    constructor (x:number, y:number, value:string){this.x=x, this.y=y, this.value=value}
}

const creases:crease[]=[]

let largestX = 0;
let largestY = 0;

const marks:point[] = []

input.forEach(x => {
    if (x.indexOf(",")!==-1){
        marks.push(new point(Number.parseInt(x.split(",")[0]), Number.parseInt(x.split(",")[1]),"x"))
        if (largestX<Number.parseInt(x.split(",")[0])){
            largestX = Number.parseInt(x.split(",")[0])
        }
        if (largestY<Number.parseInt(x.split(",")[1])){
            largestY = Number.parseInt(x.split(",")[1])
        }
    }
    if (x.indexOf("=")!==-1){
        if (x.split("=")[0].indexOf("x")!==-1){
            creases.push (new crease(Number.parseInt(x.split("=")[x.split("=").length-1]),-1))
        }
        else if (x.split("=")[0].indexOf("y")!==-1){
            creases.push (new crease(-1,(Number.parseInt(x.split("=")[x.split("=").length-1]))))
        }
    }
})

let paper:point[][] = []
for (let y = 0 ; y <= largestY; y++){
    paper.push(new Array<point>())
    for (let x = 0; x <= largestX; x++){
        paper[y].push(new point(x,y,"."))
    }
}

marks.forEach(x => {
    paper[x.y][x.x].value="x"
})

function debug (board:point[][]){
    let counter=0;
    for (let x = 0; x < board.length; x++){
        let rowbuilder=""
        for (let y = 0; y < board[x].length; y++){
            if (board[x][y].value==="x"){
                counter++;
            }
            rowbuilder+=board[x][y].value
        }
        console.log(rowbuilder);
    }
    return counter;
}

creases.forEach (creas => {
    if (creas.x!==-1){
        paper = paper.map (row => 
            row.filter (paperpoints => 
                paperpoints.x < creas.x
            ).map (survivedpoints => {
                if (paper[paper.indexOf(row)][Math.abs((row.length-1)-row.indexOf(survivedpoints))].value==="x" || survivedpoints.value==="x"){
                    return new point(survivedpoints.x, survivedpoints.y, "x")
                }
                else{
                    return new point(survivedpoints.x, survivedpoints.y, ".")
                }
            }))
    }
    else{
        paper = paper.filter(row => row[0].y < creas.y).map(
            rowUnderY =>
            rowUnderY.map(rowUnderYPoint => {
                if (paper[Math.abs(rowUnderYPoint.y - (paper.length-1))][rowUnderYPoint.x].value==="x" || rowUnderYPoint.value==="x"){
                    return new point (rowUnderYPoint.x, rowUnderYPoint.y, "x")
                }
                else{
                    return new point (rowUnderYPoint.x, rowUnderYPoint.y, ".")
                }
            }))
    }
})    

console.log(debug(paper))
console.log("")
