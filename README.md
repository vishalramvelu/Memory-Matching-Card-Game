# Memory-Card-Matching-Project

This is a memory card matching game built with JavaScript and MERN stack. The objective of the game is to find all matching pairs of cards by flipping them over two at a time. It's a fun and challenging way to test your memory skills!

## Features

- Dynamic grid size: The game allows you to choose from different grid sizes, including 2x2, 4x4, 6x6, and 8x8, providing varying levels of difficulty.
- Card flipping: Click on a card to flip it and reveal the hidden symbol. Keep flipping cards until you find a matching pair.
- Match checking: The game automatically checks if the flipped cards are a match or not. If they match, they stay open; otherwise, they are flipped back over.
- Score tracking: The game keeps track of your moves and displays the number of matches found. Try to complete the game with as few moves as possible. 
- Reset option: You can reset the game at any time to start fresh and shuffle the cards.

## Technologies Used

JavaScript: The game logic and functionality are implemented using JavaScript, including the card shuffling, matching, and game state management.
React: The user interface is built using React, allowing for efficient component-based development and seamless UI updates.
Express.Js: Express.js makes it easier to create RESTful APIs, manage routes, handle request parameters, and perform various tasks related to building a backend for web applications. In your memory matching card game, Express.js is used to define the routes, handle POST and GET requests, interact with the MongoDB database, and manage the communication between the frontend and backend.
Node.Js:Node.js serves as the foundation for your backend server. It allows you to handle HTTP requests and responses, interact with databases, and perform other server-side operations.Essentially, acts as the runtime environment that allows you to execute JavaScript on the server-side.
MongoDB: MongoDB serves as the database management system that stores and manages the game-related data, including high scores and game statistics. It enables me to manage player data and provide a leaderboard feature to enhance the gaming experience for users.
CSS: Styling and layout are done using CSS, making the game visually appealing and responsive.
BootStrap: Bootstrap enhances the user experience by providing a responsive, visually appealing, and user-friendly interface.Provides consistent styling and responive desgin to fit any size device. 

## Future Features

1. Multiplayer Mode: Implement a multiplayer mode where players can compete against each other in real-time. Players can take turns to reveal cards and try to match pairs while competing for the best time and fewest tries.
2. Power-Ups and Obstacles: Introduce power-up cards that provide temporary advantages, such as revealing all cards for a short time. Likewise, include obstacle cards that hinder players' progress, such as swapping card positions.
3. Accessibility: Implement accessibility features to make the game usable by people with disabilities. This includes keyboard navigation, screen reader compatibility, and color contrast adjustments.

## Getting Started

To get started with the Memory Card Matching Game locally on your machine, follow these steps:

1. Clone the repository: git clone https://github.com/your-username/Memory-Card-Matching-Game.git
2. Navigate to the project directory: cd Memory-Card-Matching-Game
3. Install dependencies: npm install
4. Start the backend server: node server.js
5. Start the development server: npm start
6. Open your browser and visit http://localhost:3000 to play the game.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
