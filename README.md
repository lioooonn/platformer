# Pixel Adventure - 2D Platformer

A fun and challenging 2D platformer game built with JavaScript and HTML5 Canvas. Progress through 5 increasingly difficult levels, avoiding spikes and reaching the goal flag to advance.

## Features

- 5 unique levels with increasing difficulty
- Smooth platform physics
- Local progress saving
- Multiple game screens (Title, Level Select, Gameplay, Death)
- Simple and intuitive controls

## How to Play

1. Open `index.html` in a modern web browser
2. Use the following controls:
   - Arrow Left/Right: Move left/right
   - Space: Jump
   - Enter: Confirm/Start
   - Escape: Return to level select (when dead)

## Level Progression

1. Tutorial - Learn the basic mechanics
2. The Gap - Test your jumping skills
3. The Climb - Master vertical movement
4. The Gauntlet - Navigate through spike fields
5. The Master Trial - Put all your skills to the test

## Local Storage

The game automatically saves your progress locally in your browser. Completed levels will remain unlocked when you return to the game.

## Development

The game is built using vanilla JavaScript and HTML5 Canvas, making it easy to modify and extend. The code is organized into several modules:

- `game.js` - Main game loop and initialization
- `player.js` - Player movement and physics
- `level.js` - Level rendering and collision detection
- `screens.js` - Game screen management
- `constants.js` - Game configuration and level data

## Deployment

To deploy the game:

1. Clone this repository
2. Host the files on any web server or GitHub Pages
3. Open index.html in a web browser

## License

This project is open source and available under the MIT License. 