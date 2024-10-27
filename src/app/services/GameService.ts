import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {WebSocketService} from "./WebSocketService";
import {GameStatusDTO} from "../types/GameStatusDTO";
import {GameEventDTO} from "../types/dto/GameEventDTO";

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

  getStatus(): Observable<GameStatusDTO> {
    return this.http.get<GameStatusDTO>(`${this.endpoint}/status`)
  }
}
