import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Message } from 'src/app/models/message';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { ChatService } from 'src/app/service/chat.service';
@Component({
  selector: 'ChatBox',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent {
  messages: Message[] = [];
  myId: string = '';

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private auth: AuthorizationService
  ) {}

  ngOnInit() {
    this.myId = this.auth.myId;
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          let chatId = params.get('chatId') || '';
          return this.chatService.getMessages(chatId);
        })
      )
      .subscribe();

      this.chatService.messages$.subscribe(messages => this.messages = messages)
  }
}
