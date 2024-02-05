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
5. **Setup Prisma**
   1. Install the Prisma CLI with `npm install prisma --save-dev`
   2. Next, set up your Prisma project by creating your Prisma schema file template with the following command: `npx prisma init`
   3. In prisma/schema.prisma, replace the contents with the following:
      ```prisma
      datasource db {
        provider = "mysql"
        url      = env("DATABASE_URL")
      }

      generator client {
        provider = "prisma-client-js"
      }
      ```
      4. Contact another dev for the DATABASE_URL environment variable
      5. Run `npx prisma db pull` to pull the database schema
      6. Run `npx prisma generate` to generate the Prisma client
      7. See https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql for more information
6. Run the command `npm run dev` to host the API locally
