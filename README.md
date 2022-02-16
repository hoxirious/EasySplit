# EasySplit

## Purpose
EasySplit seeks to provide an easy way to keep track of expenses and proportionately split them between users. Splitting money when you are out with your friends or colleagues can sometimes be tricky and might lead to unfair distribution of the expenses. The goal of Easy Split is to address this issue and make sure that everyone pays their fair share of the expenses without any disagreement, using a user friendly interface, from anywhere in the world. All parties can see the expense details, track down previous payments, etc. with only a few clicks! 

## Background Reading
In order to better understand how we wanted to structure our application, we decided to research on how similar problems are being addressed by currently existing applications and the architecture that is used to design these applications. 
- Splitwise

## Context
- Keeps track of money between you and your friends
- Keeps track of your transactions 
- Helps you to plan money expenditure better 
- Doing all the math for you so you can enjoy hanging out with your friends
- Reminds you to pay what you owe and helps keep track of who owes you
Money is the flow of society and the ability of keeping track of your own balance is important. However, it can be difficult as keeping track of expenses can be tricky and splitting money proportionately between your friends or colleagues can be complicated. This is the reason EasySplit was made. 
EasySpilit helps you to avoid unfair distribution of the expenses thanks to its built-in algorithm. In addition, EasySplit can help you plan your account better by keeping track of owed money between you and your friends or colleagues, and reminding you to pay the money you owe through its notification system.
EasySpilit can make planning money expenditure, splitting money, and keeping track of expenses thanks to its easy-to-use nature and simple graphical user interface. It can play a big role in keeping your balance should you decide to use it.

## Detailed Design 

- The overall system architecture: We intend to use the Model View Controller (MVC) architecture for our application. We will also be using the event sourcing architecture.
- How users interact with the system: The users will interact with the system in a web-based system, i.e., our application will support all the modern browsers and provide the users with a GUI (Graphical User Interface) that they can use to interact with the different components of the interface. Our aim is to provide users with a simple and easy to use application by typing less and selecting more.
- How software components interact: Frontend and backend will communicate using RestAPI where Frontend will send proper JSON format requests that include the endpoint and the content. This endpoint later will be used to route to the correct Controller in the Backend that handles the request. 
- How data flows through the system: Users will interact with the web browser that needs data from the database. The event listener from the client will then be triggered and send a request to the endpoint that has been set up on the server-side. - After that, the request will be handled by Nestjs, it will be guided to the desired Controller with the endpoint extracted from the request. Controller will process the request's content, simultaneously, a connection to the database will be opened by the Request Listener. We retrieve the right information. In the end, the Controller will send back the response to the View and View will display it to the web browser.

## Implementation Plan 
- Technologies you intend to use: Frontend: HTML/CSS, Bootstrap, ReactJs. Backend: NestJs, Firestore, Firebase Functions
- How you will manage source code: The source code will be managed using GitHub. We will create a repository to collaborate, review and manage application code. We also set rules that will only allow merging branches to the source code if there is an acceptance from at least 1 member. Requirements will also be broken down into small issues which will be managed with MVP supported by Github. Once tasks are completed and approved to be merged, the issues will be closed along with the related branch.
- How you will integrate components: Components will be integrated after being reviewed by at least two people and properly testing each functionality. 
- How you intend to test the system: In order to test the frontend components, we intend to use the React Testing Library. Nestjs supports testing utilities for backend to test the functionalities with mock data. 
- How you will deploy the system: Client and server will be deployed to Firebase. 

## Project Planning
Team organization: Currently, the team is being split into people working on the model and controller, aka the backend, and people working on the view, aka the user interface.

The teams are as follows:

Frontend: 
> - Priyavart Rajain 
> - Redwanul Islam
> - Mohammad Mahtab Khan

Backend 
> - Olisehemeka Chukwuma
> - Nguyen Gia Hy Huynh
> - Hao Nguyen 
> - Jonas Wong

How work is coordinated    
> - Agile development process
> - Frequent sprint meetings to discuss progress 
The team will be meeting once a week on a specified day to work on this project together. 


## Schedule 
| **Deliverable** | **Date** |
| :---: | :---: |
| Set up environment | Feb 19, 2022 |
| User login page | Feb 25, 2022 |
| Keep track of expenses | Feb 28, 2022 |
| Record of previous expenses | Mar 4, 2022 |
| Keep track of specific users expenses | Mar 7, 2022 |
| Deploy & Test | Mar 14, 2022 |
| Minimum Viable Product | Mar 21, 2022 |
| Final fully tested product with demo | Mar 28, 2022 |



