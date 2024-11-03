import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Player} from "../../types/Player";
import {SessionService} from "../../services/SessionService";
import {SessionResponse} from "../../types/dto/SessionResponse";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router, private sessionService: SessionService) {}

  ngOnInit(){
    const sessionID = localStorage.getItem('id')
    if (sessionID) {
      this.sessionService.validateSession(sessionID).subscribe({
        next: () => {
          this.router.navigate(['/game'])
        }
      })
    }
  }

  join(player: Player) {
    this.sessionService.startSession(player).subscribe({
      next: (response: SessionResponse) => {
        localStorage.setItem('id', response.id)
        this.router.navigate(['/game'])
      },
      error: () => {alert(`Desculpe, alguém já entrou como jogador ${player}`)}
    })
  }

  resetGame() {
    this.sessionService.resetSessions().subscribe({
      next: () => {
        alert("Sessions reset successfully!")
      },
      error:(error: any) => {
        alert("Couldn't restart sessions!")
        console.error(error)
      }
    })
  }

  joinAsGuest() {
    // TODO
  }
}
