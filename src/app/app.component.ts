import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgForOf} from "@angular/common";
import {getEmptyGrid} from "./assets/assets";
import {GameState} from './enums/GameState';
import {GameWinner} from "./types/GameWinner";
import {ScoreboardComponent} from "./components/scoreboard/scoreboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, ScoreboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  xScore: number = 0
  oScore: number = 0
  draws: number = 0
  moves: number = 0
  gameState: GameState = GameState.WAITING_START
  grid: string[][] = getEmptyGrid()
  protected readonly GameState = GameState

  startNewGame(): void {
    this.gameState = GameState.X_TURN
    this.grid = getEmptyGrid()
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

    const winner = this.getGameWinner()
    if (winner.gameFinished) {
      const delay = 100
      this.gameState = GameState.FINISHED
      if (winner.gameFinished && winner.winner) {
        setTimeout(()=> {
          alert(`Jogador: "${winner.winner}" venceu!`)
          winner.winner === "X" ? this.xScore++ : this.oScore++
        }, delay)
      }
      else {
        setTimeout(()=> {
          alert(`Deu velha! Comece outro jogo!`)
          this.draws++
        }, delay)
      }
    }
  }

  private validateMove(row: number, column: number): void {
    if (this.grid[row][column]) {
      throw new Error("Você não pode jogar nesta posição, escolha outra!")
    }
    if (this.getGameWinner().gameFinished) {
      throw new Error("É necessário iniciar a partida!")
    }
  }

  private getGameWinner(): GameWinner {
    let winner = ""

    // Com menos de 5 movimentos não é possível ter um vencedor:
    if (this.moves < 5) return {gameFinished: false, winner: ""}

    // Verificando vencedor horizontalmente:
    const hasAWinnerHorizontally = this.grid.some(row => {
      const allEqualInRow = row.every(value => value == row[0] && value)
      if (allEqualInRow) winner = row[0]
      return allEqualInRow
    })
    if (hasAWinnerHorizontally) return {gameFinished: true, winner}

    // Verificando vencedor verticalmente:
    for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
      const column = [this.grid[0][columnIndex], this.grid[1][columnIndex], this.grid[2][columnIndex]]
      const allEqualInColumn = column.every(value => value === column[0] && value)
      if (allEqualInColumn) return {gameFinished: true, winner: column[0]}
    }

    // Verificando vencedor diagonalmente:
    const topLeftToRightBottom = this.grid[0][0] === this.grid[1][1] && this.grid[0][0] === this.grid[2][2] && this.grid[0][0]
    if (topLeftToRightBottom) return {gameFinished: true, winner: this.grid[0][0]}
    const topRightToLeftBottom = this.grid[0][2] === this.grid[1][1] && this.grid[0][2] === this.grid[2][0] && this.grid[0][2]
    if (topRightToLeftBottom) return {gameFinished: true, winner: this.grid[0][2]}

    // Checando se deu velha:
    if (this.moves >= 9) return {gameFinished: true, winner: ""}

    // Continuando o jogo:
    return {gameFinished: false, winner: ""}
  }
}
