import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Player} from "../types/Player";
import {SessionResponse} from "../types/dto/SessionResponse";

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private readonly endpoint = 'server/session';

    constructor(private http: HttpClient) {}

    startSession(player: Player) {
        return this.http.post<SessionResponse>(`${this.endpoint}/join`, {player})
    }

    validateSession(sessionID: string) {
      return this.http.get<SessionResponse>(`${this.endpoint}/validate/${sessionID}`)
    }
}

