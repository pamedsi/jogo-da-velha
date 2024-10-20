import {Injectable} from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs'
import {GameEvent} from "../types/GameEvent";
import {Client} from "stompjs";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private readonly url = 'server/websocket'
  stompClient!: Client
  onMessageReceived: Subject<GameEvent> = new Subject()

  connect() {
    const ws = SockJS(this.url)
    this.stompClient = Stomp.over(ws)
    this.stompClient.connect(
      {},
      () => {
        this.stompClient.subscribe('/topic/game', (gameEvent: any) => {
          this.onMessageReceived.next(gameEvent)
        })
      },
      (error) => {
        console.error("Failed to connect!", error)
      }
    )
  }


}
