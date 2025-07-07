import { APIGatewayProxyHandler } from "aws-lambda";
import {DynamoDBClient, GetItemCommand, GetItemCommandOutput,} from "@aws-sdk/client-dynamodb";
  import { unmarshall } from "@aws-sdk/util-dynamodb";

const db = new DynamoDBClient({});
const TABLE_NAME = process.env.USERS_TABLE;

export const handler: APIGatewayProxyHandler = async (event) =>{
    try {
        const email = event.pathParameters?.email;
        if (!email) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: "Path parameter 'email' is required" }),
          };
        }
        const result: GetItemCommandOutput = await db.send(
          new GetItemCommand({
            TableName: TABLE_NAME,
            Key: { email: { S: email } },
          })
        );
        if (!result.Item) {
          return {
            statusCode: 404,
            body: JSON.stringify({ error: "User not found" }),
          };
        }
        const user = unmarshall(result.Item);
        return {
          statusCode: 200,
          body: JSON.stringify(user),
        };
      } catch (err: any) {
        console.error("getUserByEmail error:", err);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: "Internal server error" }),
        };
      }
}