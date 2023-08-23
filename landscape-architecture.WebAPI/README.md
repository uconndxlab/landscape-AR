# Welcome to the Landscape AR WebAPI project!
#### Built by the Digital Experience Group at UCONN (https://dxgroup.core.uconn.edu/)
#### Who to contact: Parker Smith (parker.smith@uconn.edu), Quincy Miller (quincy.miller@uconn.edu), Joel Salisbury (joel@uconn.edu)

## Overview
The Landscape AR WebAPI is built using the ASP.NET Core WebAPI framework. It is the central backend infrastructure for all the Landscape AR software, acting as a wrapper for the 3D Model to topography C++ scripts.

A more detailed look:
![image](https://github.com/uconndxlab/landscape-AR/assets/32872369/12bd0b76-ff89-4cc8-849f-f5374f9f7188)


## First Time Setup
### Prerequisites 
- Visual Studio 2022 or above (See Visual Studio Setup)
- .NET 7.0.400 SDK

### .NET 7 Setup
1. Download .NET 7: https://dotnet.microsoft.com/en-us/download/dotnet/7.0 (We are currently using 7.0.400)
2. Verify your download in terminal with ```dotnet --info```

### Visual Studio Setup
1. Download Visual Studio Community 2022 or similar version, Visual Studio Community is available to all students for free (https://visualstudio.microsoft.com/downloads/)
2. Under Workloads, select the following: 
  - ASP.NET and Web Development
  - Node.js Development
  - .NET Desktop Development
  - Desktop Development with C++
  - Data Storage and Processing

![image](https://github.com/uconndxlab/landscape-AR/assets/32872369/bf81151e-1bcc-4f63-87d4-342cea25b2d0)` ![image](https://github.com/uconndxlab/landscape-AR/assets/32872369/28d82329-da8f-4a8d-b435-109e8c7d9adc) ![image](https://github.com/uconndxlab/landscape-AR/assets/32872369/d9cbd381-9e20-46d5-adc0-44f1f798c59e)

3. Modify any other settings in the installer to your preferences, then select "Install while downloading" and press "Install"

### Project Setup
1. Clone the repo ```git clone https://github.com/uconndxlab/landscape-AR.git```
2. In Visual Studio, navigate to File->Open->Open Project/Solution

![image](https://github.com/uconndxlab/landscape-AR/assets/32872369/02643562-8f8a-4921-ba2a-54800f078332)

3. Select "landscape-architecture.WebAPI.sln" from your file explorer
4. Open the Solution Explorer by navigating to View->Solution Explorer

![image](https://github.com/uconndxlab/landscape-AR/assets/32872369/58b387c8-fd73-4469-b626-decb5e9d6421)

5. Right click on "Solution 'landscape-architecture.WebAPI' (3 of 3 projects)" and select "Build Solution" at the top of the menu

![image](https://github.com/uconndxlab/landscape-AR/assets/32872369/70cc1961-0b3e-4d2a-80ef-9e1d98a3da52)

### Running the Project

Now that you have successfully built the project locally, we can run the project and execute requests at our endpoints directly using the Swagger UI

1. At the top bar, you can select the environment mode, the system architecture, the targeted project, and the launch settings

![image](https://github.com/uconndxlab/landscape-AR/assets/32872369/c9e697bb-bcd4-4fa1-9335-f04a65521aec)
We have two options to run the application, the solid green arrow runs the application with debug mode on, while the outlined green arrow simply launches the application. These instructions will mostly focus on the solid green arrow but the outlined one is a good option when you just want to simply run the API without any debugging.

2. So, select "WebAPI" from the dropdown and press the solid green arrow. This should open up a new browser tab
3. Depending on what browser you are using, you may have to accept the certificate. On chrome this should look like the following:

![image](https://github.com/uconndxlab/landscape-AR/assets/32872369/da8184cc-f187-4370-872d-e68ce7e438d4)

4. There will be an option to proceed, select that option (it may be hidden under "Advanced" or some similar option)
5. Finally the browser tab will open up the Swagger UI, here we send a request to our first endpoint. At the time of writing this, we only have one GET request that requires 0 parameters to execute. However as development progresses the process of executing a request using the UI should be similar.
6. To execute our first request, we can choose and endpoint. Here I am selecting GET from the ```/api/v0/Model/GetTopoFromModel``` endpoiut. Select "Try it out" on the right side and then press "Execute".

![image](https://github.com/uconndxlab/landscape-AR/assets/32872369/b860654c-8bf7-4522-b5ab-18d60c22c5e9)
![image](https://github.com/uconndxlab/landscape-AR/assets/32872369/18e3fdbb-79ae-4d7b-bd28-69a8cd3d064b)

The response should look something like this, with a 200 Code indicating a successful response.

![image](https://github.com/uconndxlab/landscape-AR/assets/32872369/20a38c88-7445-4e52-bfc1-9a9adec8d629)

7. In Visual Studio, now that the app is running we can see a few more toolbar options (see image below). The main options here are "Hot Reload" which is the fire icon and the "Stop Debugging" red square. You can select the hot reload after you make any changes to the code and want to re-run the API, while selecting stop debugging ends the process altogether.

![image](https://github.com/uconndxlab/landscape-AR/assets/32872369/fe3f1176-7f23-4d9c-892d-0ede8b40d0e8)

## Testing

### General Functionality Testing
```TODO: Update Postman Docs once Postman project and collections is setup.```

Besides using the Swagger UI, the landscape architecture WebAPI can be tested using Postman (https://www.postman.com/).

### Unit Testing
```TODO: Update Testing Docs when new testing paradigms are added such as Integration Testing```
"A unit test is a test that exercises individual software components or methods, also known as a "unit of work." Unit tests should only test code within the developer's control. They don't test infrastructure concerns. Infrastructure concerns include interacting with databases, file systems, and network resources." (For more info, see https://learn.microsoft.com/en-us/dotnet/core/testing/). 

We are using unit testing in the controller layer to verify the functionality of each of our endpoints.
To run the tests:

1. Navigate to the solution explorer in Visual Studio
2. Right click on the landscape-architecture.WebAPI.Tests project and select "Run Tests". This will open the Test Explorer and allow you to navigate the tests ran.

![image](https://github.com/uconndxlab/landscape-AR/assets/32872369/2d26592e-d181-4cd0-8b78-77c43066861e)

#### Important note: TDD is an important aspect of software development, and we are doing our due diligence in implementing new functionality into this project. Any new functionality added to the app are likely going to need new tests to ensure high code coverage, see CONTRIBUTING.md for more info.





