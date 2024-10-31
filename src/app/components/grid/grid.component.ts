import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatchInfo} from "../../types/MatchInfo";
import {NgForOf} from "@angular/common";
import {MoveRequest} from "../../types/dto/MoveRequest";
import {Cell} from "../../types/Cell";
import {GameStatus} from "../../enums/GameStatus";
import {Player} from "../../types/Player";

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

}
