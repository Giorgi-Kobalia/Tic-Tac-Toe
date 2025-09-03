# Tic-Tac-Toe Game

This project is a modern implementation of the classic Tic-Tac-Toe game, built with TypeScript , Pixi.js V6.5.10 and Vite. It features a clean UI, AI opponent, and smooth gameplay experience. Assets such as custom fonts, images, and Spine animations are included for a polished look.

## Features

- Classic Tic-Tac-Toe gameplay
- Play against an AI opponent
- Asset management for fonts, images, and animations
- Easy to run and develop locally

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Install dependencies

- npm install

### Running the Project

- npm run dev

## Project Structure

- `src/` - Source code (TypeScript, game logic, UI)
- `public/` - Static assets (fonts, images, Spine animations)
- `index.html` - Main HTML file
- `vite.config.ts` - Vite configuration

├── src/ # Application source code
│ ├── game/ # Core game logic
│ │ ├── classes/ # Main classes
│ │ │ ├── game-controller.class.ts
│ │ │ ├── game-state-manager.class.ts
│ │ │ ├── tic-tak-toe-AI.class.ts
│ │ │ └── tile-cell.class.ts
│ │ │
│ │ ├── constants/ # Constant values used across the app
│ │ │ ├── combos.constant.ts
│ │ │ └── manifest.constant.ts
│ │ │
│ │ ├── enums/ # Enumerations for rules & states
│ │ │ ├── symbol.enum.ts
│ │ │ ├── turn.enum.ts
│ │ │ └── winner.enum.ts
│ │ │
│ │ ├── interfaces/ # TypeScript interfaces
│ │ │ └── game-state.interface.ts
│ │ │
│ │ ├── managers/ # Managers for assets and state
│ │ │ └── assets.manager.ts
│ │ │
│ │ └── ui/ # UI and rendering logic
│ │ ├── background.ts
│ │ ├── playfield.ts
│ │ ├── winners-text.ts
│ │ ├── app.ts
│ │ └── stage.ts
│ │
│ ├── main.ts # Application entry point
