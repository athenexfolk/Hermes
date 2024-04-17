import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, map, of, tap } from 'rxjs';
import { AddChatContactDto, ChatContact } from '../models/chat-contact';
import { Message, MessageDto } from '../models/message';
import { ChatPortalService } from './chat-portal.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private baseUrl = new URL(environment.apiOrigin);
  private chatUrl = new URL('api/chats', this.baseUrl);

  private chatContacts: BehaviorSubject<ChatContact[]>;

  constructor(private http: HttpClient, private chatPortal: ChatPortalService) {
    this.chatContacts = new BehaviorSubject<ChatContact[]>([]);
    this.getChats().subscribe();
    this.chatPortal.messageStream$.subscribe(this.sendReSortedContact);
  }

  get chatContacts$() {
    return this.chatContacts.asObservable();
  }

  sortByLastestMessageCompare = (a: ChatContact, b: ChatContact) => {
    console.debug("sorting chat contacts compared");
    return (a.lastMassage?.sendTime > b.lastMassage?.sendTime)
      ? -1
      : (a.lastMassage?.sendTime < b.lastMassage?.sendTime)
        ? 1
        : 0;
  }

  private sendReSortedContact = (msgDto: MessageDto) => {
    const chatContacts = this.chatContacts.getValue();
    const newMsgIndex = chatContacts.findIndex(i => i.chatID == msgDto.chatId);
    if (newMsgIndex < 0) {
      this.getChats().subscribe();
    }
    else {
      chatContacts[newMsgIndex].lastMassage = {
        chatID: msgDto.chatId,
        content: {
          type: msgDto.chatContent.type,
          data: msgDto.chatContent.value,
        },
        senderID: msgDto.sender,
        sendTime: new Date(msgDto.timestamp),
        messageID: msgDto.messageId
      } as Message;

      console.log(chatContacts.map(i => i.lastMassage.sendTime));
      const s = chatContacts.sort(this.sortByLastestMessageCompare);
      this.chatContacts.next(s);
    }
  }

  getChats() {
    return this.http.get<any[]>(this.chatUrl.toString()).pipe(
      map(x => {
        return x.map(i => ({
          chatID: i.chatID,
          chatName: i.chatName,
          colour: i.color,
          image: i.image,
          lastMassage: {
            senderID: i.lastestMessage.sender,
            chatID: i.lastestMessage.chatId,
            messageID: i.lastestMessage.messageId,
            content: {
              type: i.lastestMessage.chatContent.type,
              data: i.lastestMessage.chatContent.value,
            },
            sendTime: new Date(i.lastestMessage.timestamp),
          },
          type: i.type,
          members: i.members
        } as unknown as ChatContact))
      }),
      map(i => i.sort(this.sortByLastestMessageCompare)),
      tap((chats) => {
        this.chatContacts.next(chats);
        console.debug(`Loading ${chats.length} chats seccesss`);
      })
    );
  }

  /**
   * @param id chat id or message id
   */
  getMessages(id: string) {
    const chatUrl = new URL(`api/chats/${id}`, this.baseUrl);
    return this.http.get<MessageDto[]>(chatUrl.toString()).pipe(
      tap((i) => console.debug(`Loading chat ${id} : ${i.length} messages`)),
      map((messages) =>
        messages.map(
          (message) =>
          ({
            chatID: message.chatId,
            content: {
              type: message.chatContent.type,
              data: message.chatContent.value,
            },
            senderID: message.sender,
            sendTime: message.timestamp,
            messageID: message.messageId
          } as Message)
        )
      )
    );
  }

  addChat(data: AddChatContactDto) {
    return this.http.post<ChatContact>(this.chatUrl.toString(), data).pipe(
      tap(console.debug),
      tap(() => this.getChats().subscribe())
    );
  }
}
