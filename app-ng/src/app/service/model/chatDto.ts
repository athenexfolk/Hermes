export interface ChatDto {
  chatID: string
  type: "group" | "private"
  chatName: string
  image?: string
  color?: string
  lastMassage: string
}
