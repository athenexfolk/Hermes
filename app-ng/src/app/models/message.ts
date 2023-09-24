export interface Message {
  senderID: string;
  chatID: string;
  messageID: string;
  content: MessageContent;
  sendTime: Date;
}

export interface MessageDto {
  chatContent: chatContent;
  chatId: string;
  messageId: string;
  sender: string;
  timestamp: Date;
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
}

export interface MessageContent {
  type: MessageType;
  data: string;
}

export interface chatContent {
  type: string;
  value: string;
}
