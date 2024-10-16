import {Component, EventEmitter, Output} from '@angular/core';
import {getEmptyGrid} from "../../assets/assets";
import {GameStatus} from "../../types/GameStatus";
import {NgForOf} from "@angular/common";
import {GameState} from "../../enums/GameState";
import {Move} from "../../types/Move";

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  grid: string[][] = getEmptyGrid()
  @Output() gameFinished = new EventEmitter<GameStatus>();

  play({player, row, column}: Move): void {
    this.validateMove(row, column);
    this.grid[row][column] = player


  }

  private validateMove(row: number, column: number): void {
    if (this.grid[row][column]) {
      throw new Error("Você não pode jogar nesta posição, escolha outra!")
    }
    if (this.getGameWinner().finished) {
      throw new Error("É necessário iniciar a partida!")
    }
  }

  private getGameWinner(): GameStatus {
    let winner = ""

    // Com menos de 5 movimentos não é possível ter um vencedor:
    if (this.moves < 5) return {finished: false, winner: ""}

    // Verificando vencedor horizontalmente:
    const hasAWinnerHorizontally = this.grid.some(row => {
      const allEqualInRow = row.every(value => value == row[0] && value)
      if (allEqualInRow) winner = row[0]
      return allEqualInRow
    })
    if (hasAWinnerHorizontally) return {finished: true, winner}

    // Verificando vencedor verticalmente:
    for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
      const column = [this.grid[0][columnIndex], this.grid[1][columnIndex], this.grid[2][columnIndex]]
      const allEqualInColumn = column.every(value => value === column[0] && value)
      if (allEqualInColumn) return {finished: true, winner: column[0]}
    }

    // Verificando vencedor diagonalmente:
    const topLeftToRightBottom = this.grid[0][0] === this.grid[1][1] && this.grid[0][0] === this.grid[2][2] && this.grid[0][0]
    if (topLeftToRightBottom) return {finished: true, winner: this.grid[0][0]}
    const topRightToLeftBottom = this.grid[0][2] === this.grid[1][1] && this.grid[0][2] === this.grid[2][0] && this.grid[0][2]
    if (topRightToLeftBottom) return {finished: true, winner: this.grid[0][2]}

    // Checando se deu velha:
    if (this.moves >= 9) return {finished: true, winner: ""}

    // Continuando o jogo:
    return {finished: false, winner: ""}
  }
}
