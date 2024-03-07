import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import https from "https";
import { Server } from "socket.io";
const PORT = 8000;
// const IPV4_ADDRESS = "192.168.1.133";

///
const app=express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*"
    }
});
///
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin: '*'
}));
///
// mongoose.connect("mongodb://127.0.0.1:27017/catkeeperDB");
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "Connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });
///
// const chartSchema = 
// {
//     time : String,
//     heartBeat : Number
// }
// const Chart = mongoose.model("Chart",chartSchema);

// const dht11Schema = 
// {
//     temp: Number,
//     humidity: Number
// }

// const Dht11= mongoose.model("Dht11",dht11Schema);

///
// io.on("connection",(socket)=>{
//     console.log(socket.id + " connected.");
//     socket.on("disconnect",function(){
//         console.log(socket.id+" disconnected.");
//     });
// });

// app.post("/data/heartbeat",async(req,res)=>{
//     try{
//         const newHeartBeat = new Chart({
//             time: req.body.time,
//             heartBeat: req.body.heartBeat
//         });
//         await newHeartBeat.save()
//         .then(result =>{
//             console.log(result);
//         })
//         .catch(err=>{
//             console.log(err);
//         })
    
//         io.emit("newData",newHeartBeat);
//     }
//     catch(err){
//         console.log(err);
//     }

// });

// app.post("/data/dht11",async(req,res)=>{
//     try{
//         const newData = new Dht11({
//             temp: req.body.temp,
//             humidity: req.body.humidity
//         });
//         await newData.save()
//         .then(result =>{
//             console.log(result);
//         })
//         .catch(err=>{
//             console.log(err);
//         })
    
//         io.emit("dht11",newData);
//     }
//     catch(err){
//         console.log(err);
//     }

// });

app.get("/data/weather",(req,res)=>{
    const url = "https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=20b7501e9cd429bcc6b2ca06c6541333&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const weatherDataFull= {
                tempt: weatherData.main.temp,
                description: weatherData.weather[0].description,
                icon: weatherData.weather[0].icon,
                imgURL: "https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png"
            }
            console.log(weatherDataFull)
            res.json(weatherDataFull);
        });
    });
});

server.listen(PORT,function(){
    console.log("Server started on port 8000");
});
