export interface AddChatRequestDto{
    type: "private" | "group"
    to: string[]
    chatName?: string
    image?: string
    color?: string
}
