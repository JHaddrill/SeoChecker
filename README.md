# Introduction
The aim of this project is to be able to retrieve a given domain's (e.g. www.sympli.com.au) current postions in a search engine's (Google, Bing) top 100 web results.

The solution was split into two sections:
1. .NET Core 3.1 WebAPI which would be the main driver and handle 
    - Sending requests to the search engines
    - Parsing the resposne to extract search results
    - Returning a formatted repsonse acceptable to the Front End application
2. React Single Page Application
    - A client of the API
    - Provides a user friendly UI for the application

# Assumptions
- The use of Third-Party APIs and Libraries are not to be used in the API
- Other values can be provided for `keyword` and `url`
- Only need to retrieve the top 100 results

# Installation
First we need to retrieve the code, Either:
 1. Clone the project (https://github.com/JHaddrill/SeoChecker.git)
 2. Download the zip of the project and extract it into a new directory

## Run Script
The script will attempt to build adn run both the API and the React app
1. Naviagte to SeoChecker
2. Run `startApp.bat`

## API
To run the API build independently
1. Navigate to SeoChecker
2. Open `SEoChecker.sln` in Visual Studio (2019 recommended)
3. Build Solution 
    - <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd>
    - NavBar -> Build -> Build Solution)
4. Run Solution
    - Press <kbd>F5</kbd>
    - Run SeoChecker.Api from the toolbar

### React App
1. Naviagte to directory SeoChecker/seochecker-react
2. Run ```npm install```
3. Run ```npm start```
4. Navigate to localhost:3000 (if not opened automatically )
