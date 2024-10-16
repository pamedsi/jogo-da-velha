import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgForOf} from "@angular/common";
import { emptyGrid } from "./assets/assets";
import { GameState } from './enums/GameState';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  gameState: GameState = GameState.WAITING_START;
  grid: string[][] = emptyGrid
  protected readonly GameState = GameState;

  startNewGame() {
    this.gameState = GameState.X_TURN;
    this.grid = emptyGrid;
  }
}
