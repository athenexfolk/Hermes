import { ChatType } from './chat';
import { Message } from './message';

export interface ChatContact {
  type: ChatType;
  chatID: string;
  chatName: string;
  image: string;
  colour: string;
  lastMassage: Message;
}

export interface AddChatContactDto {
  type: ChatType;
  to: string[];
  chatName?: string;
  image?: string;
  colour?: string;
}
