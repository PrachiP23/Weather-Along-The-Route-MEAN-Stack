# Weather Along The Route
A distributed web application that provides users enhanced information about a travel route. Simply put, when a user inputs “From” and “To” locations on the application, the route and the weather on certain locations on the route is displayed. This Project is developed using MEan stack.

## Getting Started
Following instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Pre-requisites:
1. NodeJS
2. MongoDB
3. Angular CLI

### Steps to Setup:
To run the application follow the below steps:
1. **Clone the application**  
```bash
git clone https://github.com/PrachiP23/Weather-Along-The-Route-MEAN-Stack.git
```

2. **Build and run the backend app**  
```bash
cd ./NodeJS
npm install
```
To start the server run:
```bash
node ./index.js
```
OR
```bash
nodemon ./index.js
```
Backend server will run on <http://localhost:3000>.

3. **Run the frontend Angular app using npm**  
```bash
	cd ./AngularApp
	npm install
	ng serve --open
```
Frontend server will run on <http://localhost:4200>.

### App Demo:
Below gifs shows the route and weather along it:  

1. **Chicago to New York**  
![](gifs/route1.gif)  

2. **Mumbai to Kolkata**
![](gifs/route2.gif)
