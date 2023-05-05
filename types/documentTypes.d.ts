export interface DeckObject {
  __v: number
  _id: string
  createdBy: string
  createdDate: string
  language: string
  title: string
  totalCards: number
}

export interface CardObject {
  __v: number
  _id: string
  answer: string
  createdBy: string
  createdDate: string
  deck: string
  dueDate: string
  easinessFactor: number
  language: string
  question: string
  repetitionInterval: number
  repetitionNumber: number
  title: string
  totalViews: number
}
