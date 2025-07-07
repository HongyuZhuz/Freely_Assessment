import type { APIGatewayProxyHandler } from "aws-lambda";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs"
import { CreateBoardPayload } from './types';

const sqs = new SQSClient({})
const QUEUE_URL = process.env.BOARD_QUEUE_URL;


export const handler: APIGatewayProxyHandler = async (event) => {
    console.log(QUEUE_URL)
    try {
        if (!event.body) {
          return { statusCode: 400, body: JSON.stringify({ error: "Missing request body" }) }
        }
        const { title } = JSON.parse(event.body) as CreateBoardPayload
        
        if (!title || typeof title !== "string") {
          return { statusCode: 400, body: JSON.stringify({ error: "Board title is required" }) }
        }
    
        await sqs.send(
          new SendMessageCommand({
            QueueUrl: QUEUE_URL,
            MessageBody: JSON.stringify({ title }),
          })
        )
    
        return {
          statusCode: 202,
          body: JSON.stringify({ message: "Board creation queued" }),
        }
      } catch (err: any) {
        console.error("postBoards error:", err)
        return {
          statusCode: 500,
          body: JSON.stringify({ error: err.message || "Failed to queue board creation" }),
        }
      }
}