import express from "express";
import dotenv from "dotenv";
import { QueueService } from "./queue";

dotenv.config();

const queueService = new QueueService();
const app = express();

app.use(express.json());

function test2(test: string){
    console.log("dsadasdasdasdasd", test)
    //throw new Error("test")
}

queueService.consumer("upload", test2);

app.listen(3000, () => {
    console.log("Server On Consumer", 3000)
})