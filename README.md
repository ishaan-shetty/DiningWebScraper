# UMass Dining Menu Scraper

This is a Node.js application that scrapes the UMass Dining Menu from their website and allows users to filter out dishes based on their allergies.

## Requirements
- Node.js
- npm
- Express
- Axios
- Cheerio

## Setup
1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Run the application with `npm start`. This will run the program on http://localhost:3000 (or the specified port if you have set the PORT environment variable)

## Usage
1. Upon starting the application, it will scrape the menu from the UMass Dining website and store it.
2. To filter items based on allergies, make a GET request to `/allergy` endpoint with a list of allergies separated by commas in the request body. 

## Important Note
- The application scrapes the menu only once upon startup. If you want to refresh the menu, you need to restart the application.

## Endpoints

### GET /allergy
- **Description**: Filter items based on allergies.
- **Query Parameters**:
- `allergyList`: A comma-separated list of allergies.
- **Response**: A JSON array containing menu items that do not contain any of the specified allergies.
- **For example**: 
    - http://localhost:3000/allergy
    - Request body: {"allergyList": "beef, pork"}
    - This will return a list of menu items that do not contain beef or pork.