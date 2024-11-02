import {GameEvent} from "../../enums/GameEvent";
import {MoveEvent} from "../MoveEvent";
import {Cell} from "../Cell";

export type GameEventDTO = {
    type: GameEvent
    move: MoveEvent
    winner: Cell
}
