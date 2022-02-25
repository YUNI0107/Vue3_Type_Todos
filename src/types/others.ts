export interface ITodoItem {
  content: string
  timeStamp: number
  isDone: boolean
}

export type IInputMode = "addMode" | "reviseMode"
