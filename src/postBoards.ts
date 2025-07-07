import type { APIGatewayProxyHandler } from "aws-lambda";



export const handler: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 202,
    body: JSON.stringify({ message: 'post board' }),
  }
}