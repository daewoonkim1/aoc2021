import * as fs from 'fs' 

const input = Buffer.from(fs.readFileSync('')).toString().split("\n")

const map = new Map<string, string[]>();

input.forEach(connection => {
    map.set(connection.split("-")[0], 
    (new Array()
    .concat(connection.split("-")[1])
    .concat(map.get(connection.split("-")[0])))
    .filter(x=>x!==undefined));

    map.set(connection.split("-")[1],
    (new Array()
    .concat(connection.split("-")[0])
    .concat(map.get(connection.split("-")[1])))
    .filter(x=>x!==undefined) || map.get(connection.split("-")[1])?.indexOf(connection.split("-")[0])!==-1)
});

const observer:string[][] = []
function pathss (search:string, map:Map<string,string[]>, currentpath:string[]){
    if (search==="start" && currentpath.indexOf("start")===-1){
        observer.push(currentpath.concat("start"))
        map.get("start")!.forEach(x => {
            pathss(x, map, (currentpath.concat("start")))
        })
    }
    else if (search==="end" && currentpath.indexOf("end")===-1){
        observer.push(currentpath.concat("end"))
    }
    else if (search.toUpperCase()===search){
        observer.push(currentpath.concat(search))
        if (map.get(search)!==undefined){
            map.get(search)?.forEach(x => {
                if (x==="end" && currentpath.indexOf("end")===-1){
                    pathss(x, map, (currentpath.concat(search)))
                }
                else if (x!=="start"){
                    pathss(x, map, (currentpath.concat(search)))
                }
            })
        }
    }
    else if (search.toUpperCase()!==search && currentpath.filter(x=>x===search).length<2){
        observer.push(currentpath.concat(search))
        if (map.get(search)!==undefined){
            map.get(search)?.forEach(x => {
                if (x==="end" && currentpath.indexOf("end")===-1){
                    pathss(x, map, (currentpath.concat(search)))
                }
                else if (x!=="start"){
                    pathss(x, map, (currentpath.concat(search)))
                }
            })
        }
    }
}

pathss("start", map, []);
console.log(observer.filter(x => x[0]==="start" && x[x.length-1]==="end"));
console.log("")
