import { SNSEvent } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import {v4 as uuid}from "uuid"
import { UserItem } from "./types";
import { marshall } from "@aws-sdk/util-dynamodb";


const db = new DynamoDBClient({});
const TABLE_NAME = process.env.USERS_TABLE;

export const handler = async (event:SNSEvent) =>{
    for (const record of event.Records){
        try{
            //parse name and email from sns
            const payload = JSON.parse(record.Sns.Message) as {
                name: string;
                email: string;
              };
            const { name, email } = payload;

            //create userId
            const userId = uuid()
            const newUser:UserItem = {
                userId,
                name,
                email,
                createdAt: new Date().toISOString(),
            }

            await db.send(
                new PutItemCommand({
                    TableName: TABLE_NAME,
                    Item: marshall(newUser),
                    ConditionExpression:"attribute_not_exists(email)",
                })
            )
            console.log(`Created user ${userId} (email: ${email}, name:${name})`)


        }catch(err:any){
            console.error("handleUserRegistration record error:",err);
            throw err
        }
    }
   
}