import type { SQSEvent } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuid } from "uuid";
import { marshall } from "@aws-sdk/util-dynamodb";
import { BoardItem } from './types';



const db = new DynamoDBClient({})
const TABLE_NAME = process.env.BOARDS_TABLE

export const handler = async (event: SQSEvent)=> {
  for (const record of event.Records){
    try {
      const {title} = JSON.parse(record.body) as {title: string}
      if (!title) {
        console.warn("Skipping record with empty title:", record)
        continue
      }
      const boardId = uuid()
      const newBoard: BoardItem ={
        boardId,
        title,
        createdAt: new Date().toISOString(),
      }

      await db.send(
        new PutItemCommand({
          TableName: TABLE_NAME,
          Item: marshall(newBoard),
        })
      )

      console.log(`Created board ${boardId} (${title})`)
    } catch (err: any) {
      console.error("handleBoardCreation record error:",err,record)
      throw err
    }
  }
};