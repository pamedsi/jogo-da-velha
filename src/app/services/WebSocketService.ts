import {Injectable} from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs'
import {Client} from "stompjs";
import {Subject} from "rxjs";
import {GameEventDTO} from "../types/dto/GameEventDTO";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private readonly url = 'server/websocket'
  stompClient!: Client
  private _onMessageReceived: Subject<GameEventDTO> = new Subject()

  connect(onConnectWS: Subject<void>) {
    const sessionID = localStorage.getItem('id')
    const ws = SockJS(this.url)
    this.stompClient = Stomp.over(ws)
    this.stompClient.connect(
      { sessionID },
      () => {
        onConnectWS.next()
        this.stompClient.subscribe('/topic/game', (gameEvent: any) => {
          this._onMessageReceived.next(JSON.parse(gameEvent.body) as GameEventDTO)
        })
      },
      (error) => {
        console.error("Failed to connect!", error)
      }
    )
  }

  get onMessageReceived (): Subject<GameEventDTO> {
    return this._onMessageReceived
  }
}
