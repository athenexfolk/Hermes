import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { enviroment } from 'src/enviroment/enviroment.dev';
import { AuthorizationService } from './authorization.service';
import { BehaviorSubject, filter, map, Subject, tap } from 'rxjs';
import { chatContent, MessageDto } from '../models/message';

interface MessageSendSto {
  chatId: string,
  chatContent: chatContent
}

interface MessageReceiveDto {
  senderID: string,
  content: object,
  chatID: string,
  sendTime: Date,
  messageID: string
}

interface ClientToServerEvents {
  "message:send": (context: MessageSendSto) => void;
}

interface ServerToClientEvents {
  message: (context: MessageReceiveDto) => void;
  "gone:offline": (uid: string) => void;
  "go:online": (uid: string) => void;
  "onlines": (uids: string[]) => void;
  error: (msg: string, errmsg: string, stack: string) => void;
}

@Injectable({
  providedIn: 'root'
})
export class ChatPortalService {

  private socket!: Socket<ServerToClientEvents, ClientToServerEvents>;
  private messageSubject = new Subject<MessageReceiveDto>();
  private onlineUsersSubject = new BehaviorSubject<Set<string>>(new Set<string>());

  public get messageStream$() {
    return this.messageSubject.asObservable().pipe(
      map(this.mapToMessageDto),
    );
  }

  public get onlineUsers$() {
    return this.onlineUsersSubject.asObservable();
  }

  constructor(
    private auth: AuthorizationService
  ) {
    this.createPortal();
    this.addOnConnect();
    this.addOnMessage();
    this.addSomeoneGoOnline();
    this.addSomeoneGoOffline();
    this.addLoggingToStreamMessage();
    this.addLoggingToOnlineUser();
    this.addOnError();

    window.onbeforeunload = () =>{
      this.socket.disconnect();
    }
  }

  send(chatID: string, context: chatContent) {
    if (!!this.socket && !!context) {
      this.socket.emit("message:send", {
        chatId: chatID,
        chatContent: context
      })
    }
    else {
      console.warn("Socket not connected");
    }
  }

  isUserIdOnline(id: string) {
    return this.onlineUsers$.pipe(map(u => u.has(id)))
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  private createPortal() {
    const token = this.auth.token;
    this.socket = io(enviroment.CHAT_PORTAL_URL, {
      auth: {
        token: `${token?.tokenType} ${token?.accessToken}`
      }
    });
  }

  private addOnConnect() {
    if (!!this.socket) {
      this.socket.on("connect", this.onConnect)
      this.socket.on("onlines", (uids: string[]) => this.addOnlineUsers(...uids))
    }
  }
  private addOnMessage() {
    if (!!this.socket) {
      this.socket.on("message", this.onMessage)
    }
  }

  private addOnError() {
    if (!!this.socket) {
      this.socket.on("error", console.error)
    }
  }

  private addSomeoneGoOffline() {
    if (!!this.socket) {
      this.socket.on("gone:offline", this.removeOflineUsers)
    }
  }
  private addSomeoneGoOnline() {
    if (!!this.socket) {
      this.socket.on("go:online", this.addOnlineUsers)
    }
  }

  private addLoggingToStreamMessage() {
    this.messageStream$.subscribe(console.debug);
  }

  private addLoggingToOnlineUser() {
    this.onlineUsers$.subscribe(console.debug);
  }

  private onConnect = () => {
    console.debug("Socket connected");
  }

  private onMessage = (context: MessageReceiveDto) => {
    this.messageSubject.next(context);
  }

  private mapToMessageDto = (data: MessageReceiveDto): MessageDto => {
    return {
      chatContent: data.content as chatContent,
      chatId: data.chatID,
      messageId: data.messageID,
      sender: data.senderID,
      timestamp: data.sendTime
    }
  }

  private addOnlineUsers = (...users: string[]) => {
    const old = this.onlineUsersSubject.getValue();
    users.forEach(user => old.add(user));
    this.onlineUsersSubject.next(old);
  }
  private removeOflineUsers = (...users: string[]) => {
    const old = this.onlineUsersSubject.getValue();
    users.forEach(user => old.delete(user));
    this.onlineUsersSubject.next(old);
  }
}
