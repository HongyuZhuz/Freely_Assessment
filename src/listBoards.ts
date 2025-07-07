import type { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const db = new DynamoDBClient({})
const TABLE_NAME = process.env.BOARDS_TABLE

export const handler: APIGatewayProxyHandler = async () => {
  try {
    const resp = await db.send(new ScanCommand({TableName: TABLE_NAME}))
    const boards = (resp.Items?? []).map(item => unmarshall(item))
    return {
      statusCode: 200,
      body: JSON.stringify(boards),
    }
  } catch (err: any) {
    console.error("listBoards error:", err)
    return {
      statusCode: 500,
      body:'Failed to list boards',
    }
  }
}