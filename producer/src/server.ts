import express from "express";
import dotenv from "dotenv";
import { QueueService } from "../../consumer/src/queue";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/producer", async (req,res) => {
    const queueService = new QueueService();
    console.log("request to queue", req.body);
    await queueService.addInQueue("upload", Buffer.from(JSON.stringify(req.body)));

    return res.json(req.body);
})

app.listen(4000, () => {
    console.log("Server On Producer", 4000);
})