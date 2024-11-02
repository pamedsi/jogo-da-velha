import {Component, Input} from '@angular/core';
import {ScoreDTO} from "../../types/dto/ScoreDTO";

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.css'
})
export class ScoreboardComponent {
  @Input() score!: ScoreDTO
  xScore!: number
  oScore!: number
  draws!: number

  ngOnChanges(): void {
    if (this.score) {
      this.xScore = this.score.x
      this.oScore = this.score.o
      this.draws = this.score.draws
    }
  }
}
