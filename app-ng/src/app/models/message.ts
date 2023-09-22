export interface Message {
    senderID: string,
    chatID: string,
    content: MessageContent,
    sendTime: Date
}

export enum MessageType {
    TEXT,
    IMAGE
}

export interface MessageContent {
    type: MessageType,
    data: string
}