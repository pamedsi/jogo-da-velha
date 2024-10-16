import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgForOf} from "@angular/common";
import {GameState} from './enums/GameState';
import {ScoreboardComponent} from "./components/scoreboard/scoreboard.component";
import {GridComponent} from "./components/grid/grid.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, ScoreboardComponent, GridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  xScore: number = 0
  oScore: number = 0
  draws: number = 0
  moves: number = 0
  gameState: GameState = GameState.WAITING_START
  protected readonly GameState = GameState

  startNewGame(): void {
    this.gameState = GameState.X_TURN
    this.moves = 0
  }

  score(player: string): void {

  }

  finishGame(winner: string): void {
    const delay = 100
    this.gameState = GameState.FINISHED
    if (winner) {
      setTimeout(()=> {
          alert(`Jogador: "${winner}" venceu!`)
          winner === "X" ? this.xScore++ : this.oScore++
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
