# Robot Factory API

The Robot Factory API is a Typescript and Express-based application that powers a robot management system. It allows you to create, manage, and interact with robots, teaching them to answer questions and storing their memories.

## Overview

The Robot Factory API serves as the core of a robot management system. It allows you to create robots, train them to answer questions, and query their memories to find relevant answers. The API is designed to help you manage your robot workforce efficiently.

- Live API: [Robot Factory API](https://robot-factory.onrender.com)

## Getting Started

To set up and run the Robot Factory API, follow these steps:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/mjavason/Robot-Factory-API.git
   ```

2. Navigate to the project directory:

   ```shell
   cd Robot-Factory-API
   ```

3. Install the required dependencies:

   ```shell
   npm install
   ```

4. Create a `.env` file in the root directory and set up the required environment variables. Refer to the "Environment Variables" section below for details.

5. Build the TypeScript code:

   ```shell
   npm run build
   ```

6. Start the server:

   ```shell
   npm start
   ```

The API will be accessible at `http://localhost:5000` by default.

## Features

- **Create Robots**: Create and manage robots within the system.

- **Train Robots**: Teach robots to answer questions by providing question-answer pairs.

- **Query Robot Memories**: Find relevant answers by querying a robot's memory.

- **RESTful API**: Utilize a RESTful API for easy integration into various applications.

## Environment Variables

Before running the API, set up the following environment variables in your `.env` file:

```env
ACCESS_TOKEN_SECRET=your-access-token-secret
API_DOCUMENTATION_URL=doc.xxx.com
APP_NAME=Robot Factory
JWT_SECRET=your-jwt-secret
MAIL_ADDRESS=your-mail-address@mail.com
MAIL_PASSWORD=your-mail-password
MONGODB_URL=your-mongodb-url
MONGO_DB_NAME=your-mongodb-database-name
REFRESH_TOKEN_SECRET=your-refresh-token-secret
SITE_LINK=your-app-website-link
USERNAME=user@mail.com
```

## Sample Usage

### Creating a Robot

To create a new robot, make a POST request to the `/robots` endpoint of the API with the necessary parameters.

Example using curl:

```bash
curl -X POST http://localhost:5000/api/v1/robot/ -d "name=Robot Name" -d "creator=6999wer8f324223"
```

## Documentation

For detailed documentation on how to use the Robot Factory API and its endpoints, refer to the [API Documentation](https://documenter.getpostman.com/view/29278179/2s9YJdX389).

## Contributing

Contributions to the Robot Factory API are welcome! If you'd like to contribute:

1. Fork the project on GitHub.

2. Create a new branch for your changes.

3. Make your improvements or additions.

4. Thoroughly test your changes.

5. Create a pull request with a clear description of your changes.

Contributions that improve functionality, performance, and user experience are highly appreciated.
