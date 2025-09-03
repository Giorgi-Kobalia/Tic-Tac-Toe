import { IGameState } from "../interfaces/game-state.interface";

export class TicTacToeAI {
  private winningCombos: number[][];

  constructor(winningCombos: number[][]) {
    this.winningCombos = winningCombos;
  }

  getComputerChoice(state: IGameState): number {
    const available = this.getAvailableMoves(state);

    // Try to win
    const winMove = this.tryCompleteCombo(state.computerMoves, state);
    if (winMove) return winMove;

    // Try to block
    const blockMove = this.tryCompleteCombo(state.myMoves, state);
    if (blockMove) return blockMove;

    // Take center
    if (!state.currentBoard.includes(5)) return 5;

    // Take Corners
    const corners = [1, 3, 7, 9].filter((c) => !state.currentBoard.includes(c));
    if (corners.length > 0) return this.randomChoice(corners);

    // Anything else
    return this.randomChoice(available);
  }

  private tryCompleteCombo(moves: number[], state: IGameState): number | null {
    for (const combo of this.winningCombos) {
      const movesInCombo = combo.filter((pos) => moves.includes(pos));
      const emptyInCombo = combo.filter(
        (pos) => !state.currentBoard.includes(pos)
      );

      if (movesInCombo.length === 2 && emptyInCombo.length === 1) {
        return emptyInCombo[0];
      }  
    }
    return null;
  }

  private getAvailableMoves(state: IGameState): number[] {
    return Array.from({ length: 9 }, (_, i) => i + 1).filter(
      (i) => !state.currentBoard.includes(i)
    );
  }

  private randomChoice(arr: number[]): number {
    const idx = Math.floor(Math.random() * arr.length);
    return arr[idx];
  }
}
