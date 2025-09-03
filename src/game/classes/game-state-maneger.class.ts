import { Winner } from "../enums/winner.enum";
import { Turn } from "../enums/turn.enum";
import { IGameState } from "../interfaces/game-state.interface";

export class GameStateManager {
  private winningCombos: number[][];

  state: IGameState = {
    turn: Turn.Me,
    winner: Winner.Empty,
    myMoves: [],
    computerMoves: [],
    currentBoard: [],
  };

  constructor(winningCombos: number[][]) {
    this.winningCombos = winningCombos;
  }


  reset() {
    this.state = {
      turn: Turn.Me,
      winner: Winner.Empty,
      myMoves: [],
      computerMoves: [],
      currentBoard: [],
    };
  }


  isMoveAvailable(pos: number): boolean {
    return !this.state.currentBoard.includes(pos);
  }


  addMove(turn: Turn, pos: number) {
    if (!this.isMoveAvailable(pos)) return;

    if (turn === Turn.Me) {
      this.state.myMoves.push(pos);
    } else {
      this.state.computerMoves.push(pos);
    }

    this.state.currentBoard.push(pos);
  }

  toggleTurn() {
    this.state.turn = this.state.turn === Turn.Me ? Turn.Computer : Turn.Me;
  }


  checkWinner(): Winner {
    const { myMoves, computerMoves, currentBoard } = this.state;

    for (const combo of this.winningCombos) {
      if (combo.every((pos) => myMoves.includes(pos))) {
        this.state.winner = Winner.Cross;
        return Winner.Cross;
      }
      if (combo.every((pos) => computerMoves.includes(pos))) {
        this.state.winner = Winner.Circle;
        return Winner.Circle;
      }  
    }

    if (currentBoard.length >= 9) {
      this.state.winner = Winner.Draw;
      return Winner.Draw;
    }

    return Winner.Empty;
  }
}
