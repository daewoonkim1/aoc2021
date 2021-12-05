import * as fs from 'fs';

const input = Buffer.from(fs.readFileSync('input.txt')).toString().split("\n");
const input2:string[] = []
input.forEach(x => input2.push (x.replace(" -> ",",")));

class rule {
    public x1:string="";
    public y1:string="";

    public x2:string="";
    public y2:string="";

    constructor (arr:string[]){
        this.x1 = arr[0];
        this.x2 = arr[2];
        this.y1 = arr[1];
        this.y2 = arr[3];
    }
}
const rules:rule[] = [] 
input2.forEach (x=>
    rules.push(new rule(x.split(",")))
)

let grid:(string[])[]= []

for (let x = 0; x< 999; x++){
    for (let y = 0; y< 999; y++){
        if (grid[x]===undefined){
            grid[x]=[]
        }
        grid[x][y]="."
    }
}

function debugGrid (grid:string[][]){
    let builder = ""
    grid.forEach (x =>{
        x.forEach(y => {
            builder = builder + y
        })
        builder = builder+"\n"
    })
    fs.writeFileSync("/Users/daewoonkim/git/neo/aoc2021/5/debug.txt",builder);
}

function atLeastTwo (grid:string[][]){
    let counter = 0;
    grid.forEach (x =>{
        x.forEach(y =>{
            if ( !Number.isNaN(Number.parseInt(y)) && Number.parseInt(y)>=2){
                counter++;
            }
        })
    })
    return counter;
}

rules.forEach(rule => {
    if (rule.x1 === rule.x2){
        if (Number.parseInt(rule.y1) < Number.parseInt(rule.y2)){
            for (let y = Number.parseInt(rule.y1); y <= Number.parseInt(rule.y2); y++){
                if (grid[y][Number.parseInt(rule.x1)] === "."){
                    grid[y][Number.parseInt(rule.x1)]="1"
                }
                else{
                    grid[y][Number.parseInt(rule.x1)] = (Number.parseInt(grid[y][Number.parseInt(rule.x1)])+1)+"";
                }
            }    
        }
        else{
            for (let y = Number.parseInt(rule.y2); y <= Number.parseInt(rule.y1); y++){
                if (grid[y][Number.parseInt(rule.x1)] === "."){
                    grid[y][Number.parseInt(rule.x1)]="1"
                }
                else{
                    grid[y][Number.parseInt(rule.x1)] = (Number.parseInt(grid[y][Number.parseInt(rule.x1)])+1)+"";
                }
            }    
        }
        //console.log("firedver");
    }
    if (rule.y1 === rule.y2){
        if (Number.parseInt(rule.x1) < Number.parseInt(rule.x2)){
            for (let x = Number.parseInt(rule.x1); x <= Number.parseInt(rule.x2); x++){
                if (grid[Number.parseInt(rule.y1)][x]=== ".")
                {
                    grid[Number.parseInt(rule.y1)][x] = "1"
                }
                else{
                    grid[Number.parseInt(rule.y1)][x] = (Number.parseInt(grid[Number.parseInt(rule.y1)][x])+1)+"";
                }
            }    
        }
        else{
            for (let x = Number.parseInt(rule.x2); x <= Number.parseInt(rule.x1); x++){
                if (grid[Number.parseInt(rule.y1)][x]=== ".")
                {
                    grid[Number.parseInt(rule.y1)][x] = "1"
                }
                else{
                    grid[Number.parseInt(rule.y1)][x] = (Number.parseInt(grid[Number.parseInt(rule.y1)][x])+1)+"";
                }
            }    
        }
        //console.log("firedhor");
    }
    //debugGrid(grid);
})

console.log(atLeastTwo(grid)); //1966 is incorrect -- Vertical lines went horizontal and horizontal went vertical, also forgot that x1 < x2 vs x1 > x2 and vice versa for y

debugGrid(grid);

console.log("");