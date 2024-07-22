# Marvel Project

This project is a Vue 3 application that fetches and displays data from the Marvel API. The application is built with Vue 3, TypeScript, Pinia, and Axios..

## Features

- Display a list of Marvel series with infinite scroll
- Show details of each series, including related stories, comics, characters, and events
- Mark series as favorites, with a limit of 10 favorites

## Technologies Used

- Vue 3
- TypeScript
- Pinia (state management)
- Axios (HTTP client)
- Vue Router (for navigation)

## Project Setup

### Prerequisites

- Node.js v:v18.12.0 and npm installed
- Marvel API Key (You need to create an account on the [Marvel Developer Portal](https://developer.marvel.com/) to get your API key)

### Installation

1. Clone the repository:
    git clone https://github.com/Gin2509/marvel-project.git

2. Navigate to the project directory:
  ```sh
    cd marvel-project
  ```

3. Install dependencies:
  ```sh
    npm install
  ```

4. Create an `.env` file in the root directory and add your Marvel API key:

    ```env
       
    ```env
        VUE_APP_MARVEL_API_KEY=your_public_api_key
        VUE_APP_MARVEL_HASH=your_hash
        VUE_APP_TS=1
        VUE_APP_ROOT_API=https://gateway.marvel.com/
    ```
    ```
### Running the Project

To run the project in development mode:

    ```sh
    npm run serve
    ```

This will start the development server and you can view the application at `http://localhost:8080`.