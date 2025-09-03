import { Container } from "pixi.js";
import { Turn } from "../enums/turn.enum";
import { Winner } from "../enums/winner.enum";
import { WINNING_COMBOS } from "../constants/combos.contant";

import { GameStateManager } from "./game-state-maneger.class";
import { TicTacToeAI } from "./tic-tak-toe-AI.class";
import { TileCell } from "./tile-cell.class";
import { WinnersText } from "../ui/winners-text";

export class GameController extends Container {
  private static readonly GAP = 20;
  private static readonly COLS = 3;
  private static readonly ROWS = 3;

  private stateManager = new GameStateManager(WINNING_COMBOS);
  private ai = new TicTacToeAI(WINNING_COMBOS);

  private tiles: TileCell[] = [];
  private winnersText = new WinnersText();

  constructor() {
    super();
  }

  init() {
    this.winnersText.init(this);

    let index = 0;
    for (let row = 0; row < GameController.ROWS; row++) {
      for (let col = 0; col < GameController.COLS; col++) {
        const tileIndex = index;

        const tile = new TileCell(tileIndex);
        tile.x = col * (TileCell.TILE_SIZE + GameController.GAP);
        tile.y = row * (TileCell.TILE_SIZE + GameController.GAP);

        tile.on("pointertap", () => this.myTurn(tileIndex));

        this.tiles.push(tile);
        this.addChild(tile);
        index++;
      }
    }
  }

  private myTurn(index: number) {
    const pos = index + 1;
    const state = this.stateManager.state;

    if (!this.tiles[index]) {
      console.warn("Tile not found at index:", index);
      return;
    }

    if (state.turn === Turn.Computer || state.turn === Turn.None) return;
    if (!this.stateManager.isMoveAvailable(pos)) return;

    this.stateManager.addMove(Turn.Me, pos);
    this.tiles[index].setSymbol(Turn.Me);
    this.stateManager.toggleTurn();

    const winner = this.stateManager.checkWinner();
    if (winner !== Winner.Empty) {
      this.endGame(winner);
      return;
    }

    setTimeout(() => this.computerTurn(), 800);
  }

  private computerTurn() {
    const state = this.stateManager.state;

    if (state.turn === Turn.Me || state.turn === Turn.None) return;

    const choice = this.ai.getComputerChoice(state);
    const index = choice - 1;

    this.stateManager.addMove(Turn.Computer, choice);
    this.tiles[index].setSymbol(Turn.Computer);

    const winner = this.stateManager.checkWinner();
    if (winner !== Winner.Empty) {
      this.endGame(winner);
      return;
    }
    setTimeout(() => {
      this.stateManager.toggleTurn();
    }, 700);
  }

  private endGame(winner: Winner) {
    this.stateManager.state.turn = Turn.None;

    if (winner !== Winner.Draw) {
      const combo = WINNING_COMBOS.find(
        (c) =>
          c.every((pos) => this.stateManager.state.myMoves.includes(pos)) ||
          c.every((pos) => this.stateManager.state.computerMoves.includes(pos))
      );

      if (combo) {
        setTimeout(() => {
          combo.forEach((pos) => {
            const cell = this.tiles[pos - 1];
            cell.animateWin();
            cell.highlight();
          });
        }, 700);
      }
    }
    setTimeout(() => {
      this.winnersText.updateText(winner);
    }, 700);

    setTimeout(() => this.resetGame(), 2500);
  }

  private resetGame() {
    this.stateManager.reset();
    this.winnersText.updateText(Winner.Empty);
    this.tiles.forEach((cell) => cell.clear());
    this.stateManager.state.turn = Turn.Me;
  }
}
