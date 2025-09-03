import { App } from "./game/app";
import { TicTacToeStage } from "./game/stage";

const htmlDiv = document.getElementById("app");

const ticTacToe = new TicTacToeStage();
new App(htmlDiv, ticTacToe); 
