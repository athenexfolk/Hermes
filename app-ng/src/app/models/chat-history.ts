import { MessageContent } from "./message";

export interface ChatHistory {
    chatId: string;
    messageId: string;
    sender: string;
    timestamp: Date;
    chatContent: MessageContent;
}
