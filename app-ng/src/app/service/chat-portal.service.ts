import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { enviroment } from 'src/enviroment/enviroment.dev';
import { AuthorizationService } from './authorization.service';
import { map, Subject, tap } from 'rxjs';
import { chatContent, MessageDto } from '../models/message';

interface MessageSendSto {
  chatId: string,
  chatContent: string
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
}

@Injectable({
  providedIn: 'root'
})
export class ChatPortalService {

  private socket!: Socket<ServerToClientEvents, ClientToServerEvents>;
  private messageSubject = new Subject<MessageReceiveDto>();

  public get messageStream$() {
    return this.messageSubject.asObservable().pipe(
      map(this.mapToMessageDto),
    );
  }

  constructor(
    private auth: AuthorizationService
  ) {
    this.createPortal();
    this.addOnConnect();
    this.addOnMessage();
    this.addLoggin();
  }

  send(chatID: string, context: object) {
    if (!!this.socket && !!context) {
      this.socket.emit("message:send", {
        chatId: chatID,
        chatContent: JSON.stringify(context)
      })
    }
    else {
      console.warn("Socket not connected");
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
    }
  }
  private addOnMessage() {
    if (!!this.socket) {
      this.socket.on("message", this.onMessage)
    }
  }

  private addLoggin() {
    this.messageStream$.subscribe(console.debug);
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
}
