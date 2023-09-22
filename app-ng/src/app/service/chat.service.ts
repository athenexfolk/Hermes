import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment.dev';
import { ChatDto } from './model/chatDto';
import { AddChatRequestDto } from './model/addChatRequestDto';
import { MessageDto } from './model/messageDto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = new URL(enviroment.API_SERVER_URL);
  private chatUrl = new URL("/chats", this.baseUrl);

  constructor(
    private http: HttpClient
  ) { }

  getChats() {
    return this.http
      .get<ChatDto[]>(this.chatUrl.toString()).pipe(
        tap(i=>console.debug(`Loading ${i.length} chats seccesss`))
      );
  }

  /**
   * @param id chat id or message id
   */
  getMessages(id: string) {
    const chatUrl = new URL(`/chats/${id}`, this.baseUrl);
    return this.http.get<MessageDto[]>(chatUrl.toString()).pipe(
      tap(i=>console.debug(`Loading chat ${id} : ${i.length} messages`)),
    );
  }

  addChat(data: AddChatRequestDto) {
    return this.http.post<ChatDto>(this.chatUrl.toString(),data).pipe(
      tap(console.debug)
    );
  }
}
