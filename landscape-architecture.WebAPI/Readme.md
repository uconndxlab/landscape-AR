# Landscape Architecture Web-API
This directory houses the Web API for the landscape architecture project.

## General
There are two main components to this API:
1. The API its self, written using ExpressJS with Typescript
2. The conversion scripts. This project has a lot of computationally intensive functionality. These operations are written in C++ rather than in Typescript for performance reasons. These are located in the `./src/services/conversion-scripts` directory, and are compiled with node-gyp

## First Time Setup
Follow the steps below to host the Web API locally for development.

1. Ensure Node.js is installed. Node can be downloaded [here](https://nodejs.org/en/)
2. While typescript does not need to be installed globally as it is configured in this project, it can be helpful for testing outside this repository. Typescript can be installed with npm by running the command: `npm install -g typescript`
3. Run the command `npm install`
4. Configure node-gyp in order to be able to compile and run C++ from node. This is required in order to run the conversion scripts
    1. Install node-gyp globally with `npm install -g node-gyp`. This command needs to be run as an administrator
    2. Run the command `node-gyp configure`
    3. Run the command `node-gyp build`. This will build the C++ code located at `./src/services/conversion-scripts`
5. Set up the MySQL database
    1. Ensure that MySQL server is installed on your machine
    2. Create a .env file to house the database url `DATABASE_URL=mysql://myUser:mypassword@localhost:3306/landcape-AR?connectionLimit=10`
    3. Run the command `npx prisma migrate dev --name init` to run a migration and generate the schema
6. Run the command `npm run dev` to host the API locally
