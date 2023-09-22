import { ChatType } from "./chat";
import { Message } from "./message";

export interface ChatContact {
    type: ChatType;
    chatID: string;
    chatName: string;
    image: string;
    colour: string;
    lastMassage: Message;
}
