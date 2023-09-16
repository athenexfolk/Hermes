import { mockContact, mockHistory } from "../mockData";
import {
    MessageContext,
    ResponseMessageContext,
} from "../models/message-context";

export async function getLoginStatus() {
    return true;
}

export async function getChatContactList() {
    return mockContact;
}

export async function getHistory(chatId: string) {
    return mockHistory.filter((chat) => chat.chatId === chatId);
}

export async function getChatName(chatId: string) {
    return mockContact.find((contact) => contact.chatID === chatId)!.chatName;
}

export async function sendMessage(msgContext: MessageContext) {
    const context: ResponseMessageContext = {
        ...msgContext,
        messageId: "a",
        sender: "0",
        timestamp: new Date(),
    };

    return context;
}
