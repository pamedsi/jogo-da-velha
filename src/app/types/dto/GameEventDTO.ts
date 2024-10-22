import {GameEvent} from "../../enums/GameEvent";
import {Move} from "../Move";

export type GameEventDTO = {
    type: GameEvent
    move: Move
}
