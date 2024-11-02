import {GameStatus} from "../../enums/GameStatus";
import {Cell} from "../Cell";
import {ScoreDTO} from "./ScoreDTO";

export type GameDTO = {
  status: GameStatus
  score: ScoreDTO
  grid: Cell[][]
}
