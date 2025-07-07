import { APIGatewayProxyHandler } from 'aws-lambda';
export const handler:APIGatewayProxyHandler = async (event) =>{
    console.log("test")
    return{statusCode:202, body:"test"}
}
