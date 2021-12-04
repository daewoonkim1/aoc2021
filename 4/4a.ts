import * as fs from 'fs';

const input = Buffer.from(fs.readFileSync('input.txt')).toString().split("\n");

class board {
    public data: (number[])[] = []
}

class skeleboard {
    public data: (boolean[])[] = []
}

let boards: board[] = [];
let skeleboards: skeleboard[] = [];

let bufferBoard: board = new board();
for (let x = 2, counter=0; x< input.length; x++, counter++){
    (input[x].replace("  ", " ").split(" ")).forEach(num => {
        if (bufferBoard.data[counter] === undefined){
            bufferBoard.data[counter] = []
        }
        if (Number.isNaN(Number.parseInt(num)) === false){
            bufferBoard.data[counter].push(Number.parseInt(num));
        }
    });
    if (counter === 4){
        boards.push(bufferBoard);
        let bufferSkeleBoard = new skeleboard();
        for (let fill = 0; fill< 5; fill++){
            bufferSkeleBoard.data.push([false, false, false, false, false]);
        }
        skeleboards.push(bufferSkeleBoard);
        bufferBoard = new board();
        counter=-1;
        x++;
    }
}

function checkBingo (board:boolean[][]){
    for (let x = 0 ; x< 5; x++){ //Check rows
        let counter = 0; 
        for (let y = 0; y < 5; y++){
            if (board[x][y]===true){
                counter++;
            }
        }
        if (counter === 5){
            return true;
        }
    }
    for (let x = 0 ; x< 5; x++){ //Check columns
        let counter = 0; 
        for (let y = 0; y < 5; y++){
            if (board[y][x]===true){
                counter++;
            }
        }
        if (counter === 5){
            return true;
        }
    }
    return false;
}

function sumOfUnmarked(markers:boolean[][], board:number[][]){
    let sum = 0; 
    for (let x = 0 ; x< 5; x++){ //Check rows
        for (let y = 0; y < 5; y++){
            if (markers[x][y]===false){
                sum+=board[x][y];
            }
        }
    }
    return sum;
}

input[0].split(",").forEach(x => {
    let count=0;
    boards.forEach(board => {
        for (let i = 0; i < 5; i++){
            for (let j = 0; j < 5; j++){
                if (board.data[i][j]===Number.parseInt(x)){
                    skeleboards[count].data[i][j]=true;
                }
            }
        }
        if (checkBingo(skeleboards[count].data)===true){
            console.log(board.data);
            console.log(skeleboards[count].data);
            console.log(sumOfUnmarked(skeleboards[count].data,board.data));
            console.log(x); //871 * 41
            console.log('');
        }
        count++;
    })
})
