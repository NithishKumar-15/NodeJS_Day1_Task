import * as fs from 'fs';
import Express  from 'express';

//creating date and time
const date=new Date().toString();
const textDate=date.toString();
const txt=textDate.split(":").join("-");

//when ever the file create api called the txt file name will be pushed to this array
const fileTxt=[];
let fileReadData=[];
const server=Express();

//function for creating a file
function fileCret(){
    if(!fs.existsSync("file")){
        fs.mkdirSync("file");
    }
    try{
    fileTxt.push(txt);
    fs.writeFileSync(`./file/${txt}.txt`,`${Date.now()}`);
    }catch(e){
        console.log(e);
    }
}

// file read function
function fileRead(){
    //with the for each loop I iterate the value with that value I pass the value to template literal with one by one I print the data
    fileTxt.forEach((val)=>{
        fs.readFile(`./file/${val}.txt`,'utf-8',(err,data)=>{
            fileReadData.push(data);
        })
    })
}

//API for creating a file
server.get('/createfile',(req,res)=>{
    fileCret();
    res.send({message:"File created successfully"});
});


//API for reading all the file text
server.get('/fileread',(req,res)=>{
    fileRead();
    res.send({message:fileReadData});
})

const port=8000;
server.listen(port,()=>{
console.log(port);
});
