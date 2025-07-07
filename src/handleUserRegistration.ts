import { SNSEvent } from "aws-lambda";


export const handler = async (event:SNSEvent) =>{
    console.log("test")
    try{
        console.log(event.Records)
    }catch(err:any){
        console.error("handleUserRegistration record error:",err);
        throw err
    }
}