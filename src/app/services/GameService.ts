import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {WebSocketService} from "./WebSocketService";
import {GameDTO} from "../types/dto/GameDTO";
import {GameEventDTO} from "../types/dto/GameEventDTO";
import {MoveRequest} from "../types/dto/MoveRequest";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly endpoint: string = 'server/game'

  constructor(private http: HttpClient, private webSocketService: WebSocketService) {
  }

  listenToEvent(onConnectWS: Subject<void>): Subject<GameEventDTO> {
    this.webSocketService.connect(onConnectWS)
    return this.webSocketService.onMessageReceived
  }

  start() {
    return this.http.post<void>(`${this.endpoint}/start`, null)
  }

  getStatus(): Observable<GameDTO> {
    return this.http.get<GameDTO>(`${this.endpoint}/status`)
  }

  move(move: MoveRequest): Observable<any> {
    return this.http.post<GameEventDTO>(`${this.endpoint}/move`, move)
  }
}
