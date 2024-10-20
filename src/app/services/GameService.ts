import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {WebSocketService} from "./WebSocketService";
import {GameEvent} from "../types/GameEvent";
import {GameStatusDTO} from "../types/GameStatusDTO";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly endpoint: string = 'server/game'

  constructor(private http: HttpClient, private webSocketService: WebSocketService) {
  }

  listenToEvent(): Subject<GameEvent> {
    this.webSocketService.connect()
    return this.webSocketService.onMessageReceived
  }

  start() {
    return this.http.post<void>(`${this.endpoint}/start`, null)
  }

  getStatus(): Observable<GameStatusDTO> {
    return this.http.get<GameStatusDTO>(`${this.endpoint}/status`)
  }
}
