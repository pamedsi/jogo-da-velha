import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgForOf} from "@angular/common";
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
  title = "tic-tac-toe"
}
