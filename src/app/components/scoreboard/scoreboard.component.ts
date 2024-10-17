import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.css'
})
export class ScoreboardComponent {
  @Input() xScore!: number
  @Input() oScore!: number
  @Input() draws!: number
}
