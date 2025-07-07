import { APIGatewayProxyHandler } from 'aws-lambda';
import { PublishCommand, SNSClient} from '@aws-sdk/client-sns';
import { RegisterPayload } from './types';


const sns = new SNSClient({})
const TOPIC_ARN = `arn:aws:sns:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:${process.env.USER_REG_TOPIC}`;
export const handler:APIGatewayProxyHandler = async (event) =>{
    try{
        if(!event.body){
            return{statusCode:400, body:'Missing request body'}
        }

        const data: Partial<RegisterPayload> = JSON.parse(event.body)
        const {name,email} = data;
        if(!name || !email){
            return{ statusCode: 400, body: 'Both name and email are required' };
        }

        await sns.send(new PublishCommand({
            TopicArn:TOPIC_ARN,
            Message:JSON.stringify({name,email}),
        }));

        return {
            statusCode: 202,
            body: JSON.stringify({ message: 'Registration queued' }),
          };
        

    }catch(err:any){
        console.error('registerUser error:', err);
        return{
            statusCode:500,
            body:'Internal error'
        }
    }
}
