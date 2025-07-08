# Freely Message-Board API

A Serverless TypeScript backend providing:

- **User registration** (async via SNS → DynamoDB)
- **Get user by email** (sync via DynamoDB)
- **Boards**: list boards, queue board creation (via SQS) and process queue
- **Posts**: publish messages to boards (via SNS) and persist to DynamoDB

All services are deployed on AWS using the Serverless Framework.

---

## Architecture Overview
.
├── serverless.yml # Infra: API Gateway, Lambdas, DynamoDB, SNS, SQS, IAM
├── src/
│ ├── types.ts # shared TS interfaces (UserItem, BoardItem, PostItem, payloads)
│ ├── registerUser.ts # POST /register → Publish to SNS
│ ├── handleUserRegistration.ts # SNS → PutItem into Users table
│ ├── getUserByEmail.ts # GET /user/{email} → GetItem from Users table
│ ├── listBoards.ts # GET /boards → Scan Boards table
│ ├── postBoards.ts # POST /boards → SendMessage to SQS queue
│ ├── handleBoardCreation.ts # SQS → PutItem into Boards table
└── README.md
