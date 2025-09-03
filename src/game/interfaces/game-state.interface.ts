import { Turn } from "../enums/turn.enum";
import { Winner } from "../enums/winner.enum";

export interface IGameState {
  turn: Turn;
  winner: Winner;
  myMoves: number[];
  computerMoves: number[];
  currentBoard: number[];
}
