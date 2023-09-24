import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, map, of, tap } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment.dev';
import { AddChatContactDto, ChatContact } from '../models/chat-contact';
import { Message, MessageDto } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private baseUrl = new URL(enviroment.API_SERVER_URL);
  private chatUrl = new URL('/chats', this.baseUrl);

  private chatContacts: BehaviorSubject<ChatContact[]>;
  // messages: BehaviorSubject<Message[]>;

  constructor(private http: HttpClient) {
    this.chatContacts = new BehaviorSubject<ChatContact[]>([]);
    // this.messages = new BehaviorSubject<Message[]>([]);

    this.getChats().subscribe();
  }

  get chatContacts$() {
    return this.chatContacts.asObservable();
  }

  // get messages$() {
  //   return this.messages.asObservable();
  // }

  getChats() {
    return this.http.get<ChatContact[]>(this.chatUrl.toString()).pipe(
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
    const chatUrl = new URL(`/chats/${id}`, this.baseUrl);
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
      ),
      // tap((messages) => this.messages.next(messages)),
    );
  }

  addChat(data: AddChatContactDto) {
    return this.http.post<ChatContact>(this.chatUrl.toString(), data).pipe(
      tap(console.debug),
      tap(() =>this.getChats().subscribe())
    );
  }
}
