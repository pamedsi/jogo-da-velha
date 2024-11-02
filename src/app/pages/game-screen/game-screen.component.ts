import {Component} from '@angular/core';
import {GridComponent} from "../../components/grid/grid.component";
import {ScoreboardComponent} from "../../components/scoreboard/scoreboard.component";
import {Cell} from "../../types/Cell";
import {getEmptyGrid} from "../../../assets/assets";
import {Player} from "../../types/Player";
import {NgIf} from "@angular/common";
import {SessionService} from "../../services/SessionService";
import {Router} from "@angular/router";
import {GameService} from "../../services/GameService";
import {GameDTO} from "../../types/dto/GameDTO";
import {GameStatus} from "../../enums/GameStatus";
import {Subject} from "rxjs";
import {MoveRequest} from "../../types/dto/MoveRequest";
import {GameEvent} from "../../enums/GameEvent";
import {ScoreDTO} from "../../types/dto/ScoreDTO";

@Component({
  selector: 'app-game-screen',
  standalone: true,
  imports: [
    GridComponent,
    ScoreboardComponent,
    NgIf
  ],
  templateUrl: './game-screen.component.html',
  styleUrl: './game-screen.component.css'
})
export class GameScreenComponent {
  score!: ScoreDTO
  player!: Player
  gameStatus!: GameStatus
  grid!: Cell[][]
  thisPlayerIsConnectedWithWS: boolean = false
  private onConnectWS: Subject<void> = new Subject()
  protected readonly GameStatus = GameStatus;

  constructor (
    private sessionService: SessionService,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkSession()
    this.getStatus()
    this.setThisPlayerConnectedWithWS()
  }

  setThisPlayerConnectedWithWS(): void {
    this.onConnectWS.subscribe(({
      next: () => {
        this.thisPlayerIsConnectedWithWS = true
        this.getStatus()
      },
      error: (error) => {
        console.error(error)
    }
    }))
  }

  updateStatusOnEvent (): void {
    this.gameService.listenToEvent(this.onConnectWS).subscribe((event) => {
        if (event.type == GameEvent.MATCH_ENDED) {
          this.handleEnfOfMath(event.winner)
        }
        this.getStatus()
      }
    )
  }

  getStatus(): void {
    this.gameService.getStatus().subscribe(({
      next: (game: GameDTO) => {
        this.gameStatus = game.status
        this.grid = game.grid
        this.score = game.score
      },
      error: (error: any) => {
        alert("Não foi possível obter o status da partida!")
        console.error(error)
      }
    }))
  }

  checkSession(): void {
    const sessionID = localStorage.getItem('id')
    if (sessionID) {
      this.sessionService.validateSession(sessionID).subscribe({
        next: (response) => {
          this.player = response.player;
          this.updateStatusOnEvent()
        },
        error: (response) => {
          console.error(response)
          this.router.navigate([''])
        }
      })
    }
    else {
      this.router.navigate([''])
    }
  }

  startNewGame(): void {
    this.gameService.start().subscribe({
      next: () => console.info("New game started!"),
      error: (response) => {
        console.error(response.error.details)
        alert("Couldn't start the game!")
        this.grid = getEmptyGrid()
      }
    })
  }

  makeAMove(move: MoveRequest) {
    this.gameService.move(move).subscribe({
      next: () => {
        this.getStatus()
      },
      error: (response) => {
        console.error(response)
        alert("Couldn't execute the move!")
      },
    })
  }

  handleEnfOfMath(winner: Cell): void {
    setTimeout(() => {
      if (winner != "EMPTY") {
        alert(`Player ${winner} wins!`)
      }
      else {
        alert(`It's a draw game!`)
      }
    }, 100)
  }
}
