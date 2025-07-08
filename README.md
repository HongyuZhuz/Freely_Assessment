# Freely Message-Board API

A Serverless TypeScript backend providing:

- **User registration** (async via SNS → DynamoDB)
- **Get user by email** (sync via DynamoDB)
- **Boards**: list boards, queue board creation (via SQS) and process queue
- **Posts**: publish messages to boards (via SNS) and persist to DynamoDB

All services are deployed on AWS using the Serverless Framework.

---

- **Functions** & **Events**  
  1. **registerUser** (HTTP POST `/register`) → SNS  
  2. **handleUserRegistration** (SNS subscription) → DynamoDB PutItem  
  3. **getUserByEmail** (HTTP GET `/user/{email}`) → DynamoDB GetItem  
  4. **listBoards** (HTTP GET `/boards`) → DynamoDB Scan  
  5. **postBoards** (HTTP POST `/boards`) → SQS SendMessage  
  6. **handleBoardCreation** (SQS subscription) → DynamoDB PutItem  
