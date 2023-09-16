import { MessageContent } from "./message";

export interface MessageContext {
    chatId: string;
    chatContent: MessageContent;
}

export interface ResponseMessageContext {
    chatId: string;
    messageId: string;
    sender: string;
    timestamp: Date;
    chatContent: MessageContent;
}
