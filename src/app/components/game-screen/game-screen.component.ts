import { Component } from '@angular/core';
import {GridComponent} from "../grid/grid.component";
import {ScoreboardComponent} from "../scoreboard/scoreboard.component";
import {MatchState} from "../../enums/MatchState";
import {Cell} from "../../types/Cell";
import {getEmptyGrid} from "../../../assets/assets";
import {MatchInfo} from "../../types/MatchInfo";
import {Player} from "../../types/Player";

@Component({
  selector: 'app-game-screen',
  standalone: true,
    imports: [
        GridComponent,
        ScoreboardComponent
    ],
  templateUrl: './game-screen.component.html',
  styleUrl: './game-screen.component.css'
})
export class GameScreenComponent {
  xScore: number = 0
  oScore: number = 0
  draws: number = 0
  moves: number = 0
  turn: Player = "X"
  gameState: MatchState = MatchState.WAITING_START
  grid: Cell[][] = getEmptyGrid()
  protected readonly GameState = MatchState

  startNewGame(): void {
    this.gameState = MatchState.STARTED
    this.moves = 0
    this.grid = getEmptyGrid()
  }

  makeAMove() {
    this.moves++
    this.switchTurn()
  }

  switchTurn() {
    this.turn === "X" ? this.turn = "O" : this.turn = "X"
  }

  score(matchInfo: MatchInfo): void {
    if(matchInfo.finished) {
      switch (matchInfo.winner) {
        case "X":
          this.xScore++
          break
        case "O":
          this.oScore++
          break
        default:
          this.draws++
      }
      this.finishMatch(matchInfo.winner)
    }
  }

  finishMatch(winner: string): void {
    const delay = 100
    this.gameState = MatchState.FINISHED
    if (winner) {
      setTimeout(()=> {
        alert(`Jogador: "${winner}" venceu!`)
      }, delay)
    }
    else {
      setTimeout(()=> {
        alert(`Deu velha! Comece outro jogo!`)
      }, delay)
    }
  }
}
