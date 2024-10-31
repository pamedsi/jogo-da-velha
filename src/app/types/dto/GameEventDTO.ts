import {GameEvent} from "../../enums/GameEvent";
import {MoveEvent} from "../MoveEvent";

export type GameEventDTO = {
    type: GameEvent
    move: MoveEvent
}
