import {Injectable, NgModule} from "@angular/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Player} from "../types/Player";
import {SessionResponse} from "../types/dto/SessionResponse";

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor(private http: HttpClient) {}

    startSession(player: Player) {
        return this.http.post<SessionResponse>('server/join', {player})
    }

  validateSession(sessionID: string) {
      return this.http.get<SessionResponse>(`server/validate/${sessionID}`)
  }
}

