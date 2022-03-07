export interface ITodoItem {
  key: string
  content: string
  timeStamp: number
  isDone: boolean
}

export type IInputMode = 'addMode' | 'reviseMode'
