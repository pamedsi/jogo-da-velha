import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatchInfo} from "../../types/MatchInfo";
import {NgForOf} from "@angular/common";
import {MoveRequest} from "../../types/dto/MoveRequest";
import {Cell} from "../../types/Cell";
import {GameStatus} from "../../enums/GameStatus";
import {Player} from "../../types/Player";
import {GameService} from "../../services/GameService";

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
  @Input() player!: Player
  @Input() thereAreMovesLeft!: boolean;
  @Output() matchFinished = new EventEmitter<MatchInfo>();
  @Output() moveMade = new EventEmitter<MoveRequest>()

  play(row: number, column: number): void {
    this.validateMove(row, column);
    const sessionID = localStorage.getItem("id")
    if (sessionID) {
      this.moveMade.emit({row, column, sessionID})
    }
    else {
      throw new Error("Session ID not valid!")
    }
  }

  private validateMove(row: number, column: number): void {
    if (!this.matchStarted()) {
      throw new Error("You must start a new match to play!")
    }
    if (!this.isPlayerTurn()) {
      throw new Error("It's not your turn, wait your turn to play!")
    }
    if (this.grid[row][column] !== "EMPTY") {
      throw new Error("You can't play on this position, please chose another!")
    }
  }

  private matchStarted(): boolean {
    return this.gameStatus === GameStatus.X_TURN || this.gameStatus === GameStatus.O_TURN
  }

  private isPlayerTurn(): boolean {
    const xTurnAndXTriedToMove = this.gameStatus === GameStatus.X_TURN && this.player === 'X'
    const oTurnAndOTriedToMove = this.gameStatus === GameStatus.O_TURN && this.player === 'O'
    return  xTurnAndXTriedToMove || oTurnAndOTriedToMove;
  }

  private checkIfMatchIsOver(): MatchInfo {
    const horizontally = this.checkIfThereIsAWinnerHorizontally()
    if (horizontally) return horizontally
    const vertically = this.checkIfThereIsAWinnerVertically()
    if (vertically) return vertically
    const diagonally = this.checkIfThereIsAWinnerDiagonally()
    if (diagonally) return diagonally
    return {finished: !this.thereAreMovesLeft, winner: "EMPTY"}
  }

  private checkIfThereIsAWinnerHorizontally(): MatchInfo | false {
    let winner: Cell = "EMPTY"
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
    const topLeftToRightBottom = this.grid[0][0] === this.grid[1][1] && this.grid[0][0] === this.grid[2][2] && this.grid[0][0] !== "EMPTY"
    if (topLeftToRightBottom) return {finished: true, winner: this.grid[0][0]}
    const topRightToLeftBottom = this.grid[0][2] === this.grid[1][1] && this.grid[0][2] === this.grid[2][0] && this.grid[0][2] !== "EMPTY"
    if (topRightToLeftBottom) return {finished: true, winner: this.grid[0][2]}
    return false
  }
}
