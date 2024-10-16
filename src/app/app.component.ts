import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgForOf} from "@angular/common";
import {emptyGrid} from "./assets/assets";
import {GameState} from './enums/GameState';
import {GameWinner} from "./types/GameWinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  moves: number = 0
  gameState: GameState = GameState.WAITING_START
  grid: string[][] = emptyGrid
  protected readonly GameState = GameState

  startNewGame(): void {
    this.gameState = GameState.X_TURN
    this.grid = emptyGrid
    this.moves = 0
  }

  play(row: number, column: number): void {
    this.validateMove(row, column);
    let move = ""
    switch (this.gameState) {
      case GameState.X_TURN:
        move = "X"
        this.gameState = GameState.O_TURN
        this.moves++
        break
      case GameState.O_TURN:
        move = "O"
        this.moves++
        this.gameState = GameState.X_TURN
        break
    }
    this.grid[row][column] = move;
    if (this.getGameWinner()) {
      this.gameState = GameState.FINISHED
    }
  }

  private validateMove(row: number, column: number): void {
    if (this.getGameWinner()) {
      throw new Error("Esta partida já encerrou, inicie outra!")
    }
    if (this.grid[row][column]) {
      throw new Error("Você não pode jogar nesta posição, escolha outra!")
    }
  }

  private getGameWinner(): GameWinner {
    let winner = ""

    // Com menos de 5 movimentos não é possível ter um vencedor:
    if (this.moves < 5) return {gameFinished: false, winner: ""}

    // Verificando vencedor horizontalmente:
    const hasAWinnerHorizontally = this.grid.some(row => {
      const allEqualInRow = row.every(value => value == row[0])
      if (allEqualInRow) winner = row[0]
      return allEqualInRow
    })
    if (hasAWinnerHorizontally) return {gameFinished: true, winner}

    // Verificando vencedor verticalmente:
    for (let row = 0; row < 3; row++) {
      const column = [this.grid[row][0], this.grid[row][1], this.grid[row][2]]
      const allEqualInColumn = column.every(value => value === column[0])
      if (allEqualInColumn) return {gameFinished: true, winner: column[0]}
    }

    // Verificando vencedor diagonalmente:
    const topLeftToRightBottom = this.grid[0][0] === this.grid[1][1] && this.grid[0][0] === this.grid[2][2]
    if (topLeftToRightBottom) return {gameFinished: true, winner: this.grid[0][0]}
    const topRightToLeftBottom = this.grid[0][2] === this.grid[1][1] && this.grid[0][2] === this.grid[2][0]
    if (topRightToLeftBottom) return {gameFinished: true, winner: this.grid[0][2]}

    // Checando se deu velha:
    if (this.moves >= 9) return {gameFinished: true, winner: ""}

    // Continuando o jogo:
    return {gameFinished: false, winner: ""}
  }
}
