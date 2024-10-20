export enum GameStatus {
  WAITING_START,
  X_TURN,
  O_TURN,
  STARTED,
  FINISHED
}

export type GameStatusDTO = {
  status: GameStatus
}
