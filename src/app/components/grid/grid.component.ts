import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatchInfo} from "../../types/MatchInfo";
import {NgForOf} from "@angular/common";
import {Move} from "../../types/Move";
import {Cell} from "../../types/Cell";
import {GameStatus} from "../../enums/GameStatus";

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
  @Input() grid!: Cell[][]
  @Input() possibleToFinish!: boolean;
  @Input() gameStatus!: GameStatus
  @Input() currentPlayer!: Cell
  @Input() thereAreMovesLeft!: boolean;
  // @Input() matchStarted!: boolean;
  @Output() matchFinished = new EventEmitter<MatchInfo>();
  @Output() moveMade = new EventEmitter<Move>()

  ngOnInit() {
    if (this.gameStatus === GameStatus.X_TURN) {
      this.currentPlayer = 'X'
    }
    else if (this.gameStatus === GameStatus.O_TURN) {
      this.currentPlayer = 'O'
    }
  }

  play(row: number, column: number): void {
    // TODO
    // this.validateMove(row, column);
    // this.grid[row][column] = this.currentPlayer
    // this.moveMade.emit({row, column, player: this.currentPlayer} as Move)
    // if (this.possibleToFinish) {
    //   const gameStatus = this.checkIfMatchIsOver()
    //   if (gameStatus.finished) {
    //     this.matchFinished.emit(gameStatus)
    //   }
    // }
  }

  // private validateMove(row: number, column: number): void {
  //   if (!this.matchStarted) {
  //     throw new Error("Você precisa iniciar uma nova partida!")
  //   }
  //   if (this.grid[row][column]) {
  //     throw new Error("Você não pode jogar nesta posição, escolha outra!")
  //   }
  // }

  private checkIfMatchIsOver(): MatchInfo {
    const horizontally = this.checkIfThereIsAWinnerHorizontally()
    if (horizontally) return horizontally
    const vertically = this.checkIfThereIsAWinnerVertically()
    if (vertically) return vertically
    const diagonally = this.checkIfThereIsAWinnerDiagonally()
    if (diagonally) return diagonally
    return {finished: !this.thereAreMovesLeft, winner: ""}
  }

  private checkIfThereIsAWinnerHorizontally(): MatchInfo | false {
    let winner: Cell = ""
    const hasAWinnerHorizontally = this.grid.some(row => {
      const allEqualInRow = row.every(value => value == row[0] && value)
      if (allEqualInRow) winner = row[0]
      return allEqualInRow
    })
    if (hasAWinnerHorizontally) return {finished: true, winner}
    return false
  }

  private checkIfThereIsAWinnerVertically(): MatchInfo | false {
    for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
      const column = [this.grid[0][columnIndex], this.grid[1][columnIndex], this.grid[2][columnIndex]]
      const allEqualInColumn = column.every(value => value === column[0] && value)
      if (allEqualInColumn) return {finished: true, winner: column[0]}
    }
    return false
  }

  private checkIfThereIsAWinnerDiagonally(): MatchInfo | false {
    const topLeftToRightBottom = this.grid[0][0] === this.grid[1][1] && this.grid[0][0] === this.grid[2][2] && this.grid[0][0]
    if (topLeftToRightBottom) return {finished: true, winner: this.grid[0][0]}
    const topRightToLeftBottom = this.grid[0][2] === this.grid[1][1] && this.grid[0][2] === this.grid[2][0] && this.grid[0][2]
    if (topRightToLeftBottom) return {finished: true, winner: this.grid[0][2]}
    return false
  }
}
