import * as fs from 'fs'

const input = Buffer.from(fs.readFileSync("input.txt")).toString().split("\n");
const board = input.map(row => Array.from(row).map(x=>Number.parseInt(x)))

let sum = 0;
for (let x = 0 ; x < board.length; x++){
    for (let y = 0; y< board[x].length; y++)
    {
        if (x===0){
            if (y===0 
                && board[0][0] < board[0][1]
                && board[0][0] < board[1][0]){
                    sum+=(board[0][0]+1)
            }
            else if (y===board[0].length-1
                && board[0][y] < board[0][y-1] 
                && board[0][y] < board[1][y]){
                    sum+=(board[x][y]+1)
            }
            else if (board[0][y] < board[0][y-1] 
                &&  board[0][y] < board[0][y+1]
                &&  board[0][y] < board[1][y]){
                    sum+=(board[0][y]+1)
            }
        }
        else if (x===board.length-1){
            if (y===0
                && board[x][0] < board[x-1][0]
                && board[x][0] < board[x][1]){
                    sum+=(board[x][y]+1)
            }
            else if (y===board[x].length-1
                && board[x][y] < board[x-1][y]
                && board[x][y] < board[x][y-1]){
                    sum+=(board[x][y]+1)
            }
            else if (board[x][y] < board[x-1][y]
                && board[x][y] < board[x][y+1]
                && board[x][y] < board[x][y-1]){
                    sum+=(board[x][y]+1)
            }
        }
        else if (y===0 && x!==0 && x!==board.length-1
            && board[x][y] < board[x][1]
            && board[x][y] < board[x+1][0]
            && board[x][y] < board[x-1][0]){
                sum+=(board[x][y]+1)
        }
        else if (y===board[x].length-1 && x!==0 && x!==board.length-1
            && board[x][y] < board[x][y-1]
            && board[x][y] < board[x+1][y]
            && board[x][y] < board[x-1][y]){
                sum+=(board[x][y]+1)
        }
        else if ( board[x][y] < board[x][y+1]
            && board[x][y] < board[x][y-1]
            && board[x][y] < board[x-1][y]
            && board[x][y] < board[x+1][y]){
                sum+=(board[x][y]+1)
        }
    }
}

//indexOf with duplicate numbers doesn't work as you think it should
/*
board.forEach(row => { //why did row[0] get repeated twice?
    row.forEach(num => {
        if (board.indexOf(row)===0){
            if (row.indexOf(num)===0 
                && num < board[0][1]
                && num < board[1][0]){
                    sum+=(num+1)
            }
            else if (row.indexOf(num)===row.length-1
                && num < board[0][row.length-2] 
                && num < board[1][row.length-1]){
                    sum+=(num+1)
            }
            else if (num < board[0][row.indexOf(num)-1] 
                &&  num < board[0][row.indexOf(num)+1]
                &&  num < board[1][row.indexOf(num)]){
                    sum+=(num+1)
            }
        }
        else if (board.indexOf(row)===board.length-1){
            if (row.indexOf(num)===0
                && num < board[board.length-2][0]
                && num < board[board.length-1][1]){
                    sum+=(num+1)
            }
            else if (row.indexOf(num)===row.length-1
                && num < board[board.length-2][row.length-1]
                && num < board[board.length-1][row.length-2]){
                    sum+=(num+1)
            }
            else if (num < board[board.length-2][row.indexOf(num)]
                && num < board[board.length-1][row.indexOf(num)+1]
                && num < board[board.length-1][row.indexOf(num)-1]){
                    sum+=(num+1)
            }
        }
        else if (row.indexOf(num)===0
            && num < board[board.indexOf(row)][1]
            && num < board[board.indexOf(row)+1][0]
            && num < board[board.indexOf(row)-1][0]){
                sum+=(num+1)
        }
        else if (row.indexOf(num)===row.length-1
            && num < board[board.indexOf(row)][row.length-2]
            && num < board[board.indexOf(row)+1][row.length-1]
            && num < board[board.indexOf(row)-1][row.length-1]){
                sum+=(num+1)
        }
        else if ( num < board[board.indexOf(row)][row.indexOf(num)+1]
            && num < board[board.indexOf(row)][row.indexOf(num)-1]
            && num < board[board.indexOf(row)-1][row.indexOf(num)]
            && num < board[board.indexOf(row)+1][row.indexOf(num)]){
                sum+=(num+1)
        }
    })
})
*/

console.log(sum)
console.log("")
