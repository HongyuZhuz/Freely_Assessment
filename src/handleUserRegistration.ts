import { SNSEvent } from "aws-lambda";

export const handler = async (event:SNSEvent) =>{
    console.log("test handle user registration")
    console.log(event)
    return
}