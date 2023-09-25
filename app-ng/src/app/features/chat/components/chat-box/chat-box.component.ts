import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, filter, map, tap } from 'rxjs';
import { Message, MessageDto } from 'src/app/models/message';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { ChatPortalService } from 'src/app/service/chat-portal.service';
import { ChatService } from 'src/app/service/chat.service';
import { NotificationService } from 'src/app/service/notification.service';
@Component({
  selector: 'ChatBox',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  myId: string = '';
  activedChatID?: string;
  oldestChatID?: string;

  isReadyToLoad = true;
  isOldestMessage = false;

  @ViewChild('parent') parent!: ElementRef<HTMLElement>;

  subscriptions: Subscription = new Subscription();

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private auth: AuthorizationService,
    private chatPortal: ChatPortalService,
    private notify: NotificationService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit() {
    this.myId = this.auth.myId;
    this.route.paramMap
      .pipe(
        map((param) => param.get('chatId') || ''),
        tap(this.resetMessageSetUp),
        tap(this.loadMessages)
      )
      .subscribe();
    this.subscriptMessageNotify();
  }

  private resetMessageSetUp = (activedPpath: string) => {
    this.activedChatID = activedPpath;
    this.messages = [];
    this.isReadyToLoad = true;
    this.isOldestMessage = false;

    this.oldestChatID = undefined;
  };

  loadMessages = (chatId: string | null = null) => {
    let id = this.oldestChatID ?? this.activedChatID ?? chatId;
    if (!id) return;
    this.isReadyToLoad = false;

    this.chatService.getMessages(id).subscribe({
      next: this.onLoadMessageSuccess,
      error: () => {
        this.isReadyToLoad = true;
        this.isOldestMessage = true;
      },
    });
  };

  scrollUp(e: Event) {
    if (!this.isReadyToLoad || this.isOldestMessage) return;
    let el = e.target as HTMLElement;
    if (el.clientHeight - el.scrollHeight + 5 >= el.scrollTop) {
      this.loadMessages();
    }
  }

  private onLoadMessageSuccess = (message: Message[]) => {
    this.oldestChatID = message[message.length - 1].messageID;
    this.messages.push(...message);
    this.isReadyToLoad = true;

    if (
      this.parent.nativeElement.clientHeight ===
      this.parent.nativeElement.scrollHeight
    ) {
      this.loadMessages();
    }
  };

  private subscriptMessageNotify = () => {
    console.debug('subscriptMessageNotify');

    const portal = this.chatPortal.messageStream$
      .pipe(
        tap((m) =>
          console.assert(
            m.chatId == this.activedChatID,
            this.youHaveNewMessage(m)
          )
        ),
        filter(this.fillterActiveMessage),
        map(
          (message) =>
            ({
              chatID: message.chatId,
              content: {
                type: message.chatContent.type,
                data: message.chatContent.value,
              },
              senderID: message.sender,
              sendTime: message.timestamp,
              messageID: message.messageId,
            } as Message)
        ),
        tap(this.pushMessage)
      )
      .subscribe();
    this.subscriptions.add(portal);
  };

  private fillterActiveMessage = (m: MessageDto) => {
    console.log(
      m.chatId == this.activedChatID,
      'new message from chat id ',
      m.chatId,
      ' | now you in ',
      this.activedChatID
    );
    return m.chatId == this.activedChatID;
  };

  private youHaveNewMessage = (m: MessageDto) => {
    // new notification here.
    this.notify.notifyMe(m);
    return (
      'new message from chat id ' + m.chatId,
      ' | now you in ' + this.activedChatID
    );
  };

  private pushMessage = (message: Message, oldMessage: boolean = false) => {
    if (oldMessage) this.messages.push(message);
    else this.messages.unshift(message);
  };
}
