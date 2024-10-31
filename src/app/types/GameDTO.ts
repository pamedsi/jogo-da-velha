import {GameStatus} from "../enums/GameStatus";
import {Cell} from "./Cell";

export type GameDTO = {
  status: GameStatus
  grid: Cell[][]
}
