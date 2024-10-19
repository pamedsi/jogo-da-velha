import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket | null = null;
  private subject: Subject<any> = new Subject();
  private readonly URL = 'ws://localhost:8080';

  connect(): void {
    if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
      this.socket = new WebSocket(this.URL);
      // this.setupSocketEvents();
    }
  }

  disconnect(): void {
    if (this.socket && this.socket.readyState !== WebSocket.CLOSED) {
      this.socket.close();
      this.socket = null;
    }
  }

  send(message: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  onMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  // private setupSocketEvents(): void {
  //   this.socket?.onopen = () => {
  //     console.log('WebSocket connection established');
  //   };
  //
  //   this.socket?.onclose = (event: CloseEvent) => {
  //     console.log('WebSocket connection closed', event.code, event.reason);
  //     this.subject.next(null);
  //   };
  //
  //   this.socket?.onmessage = (event: MessageEvent) => {
  //     try {
  //       const data = JSON.parse(event.data);
  //       console.log('Received:', data);
  //       this.subject.next(data);
  //     } catch (error) {
  //       console.error('Failed to parse WebSocket message:', error);
  //       this.subject.next(null);
  //     }
  //   };
  //
  //   this.socket?.onerror = (error: Event) => {
  //     console.error('WebSocket error:', error);
  //     this.subject.next(null);
  //   };
  // }
}
