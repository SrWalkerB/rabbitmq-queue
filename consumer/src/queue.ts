import amqp from "amqplib";

type QueuesTypes = "upload";

export class QueueService{
    async consumer(queue: QueuesTypes, callback: any){
        try {
            const connection = await this.getConnection();
            const channel = await connection.createChannel();
    
            await channel.assertQueue(queue);
    
            console.log("Waiting Messages...");
    
            channel.consume(queue, async (message) => {
                if(message !== null){
                    const data = JSON.parse(message.content.toString());
                    //console.log("Message received", data);
                    try{
                        await callback(data.name);
                        channel.ack(message);
                    } catch(error) {
                        console.log(error)
                    }
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    async addInQueue(queue: QueuesTypes, props: Buffer){
        const connection = await this.getConnection();
        const channel = await connection.createChannel();

        await channel.assertQueue(queue);
        channel.sendToQueue(queue, props, {
            persistent: true
        });

        await channel.close();
        await connection.close();
    }

    async getConnection(){
        const user = process.env.RABBITMQ_DEFAULT_USER;
        const password = process.env.RABBITMQ_DEFAULT_PASS;
        const host = process.env.RABBITMQ_DEFAULT_HOST;

        return await amqp.connect(`amqp://${user}:${password}@${host}`);
    }
}