import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, filter, map, switchMap, tap } from 'rxjs';
import { ChatContact } from 'src/app/models/chat-contact';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'ChatInterface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.scss'],
})
export class ChatInterfaceComponent implements OnInit, OnDestroy {
  isChatSettingsOpen = true;

  chatContact: ChatContact | null = null;

  acctiveChatId?: string;

  subsctiption: Subscription;

  constructor(private chatService: ChatService, private route: ActivatedRoute) {
    this.subsctiption = new Subscription();
  }
  ngOnDestroy(): void {
    this.subsctiption.unsubscribe();
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        // tap(()=>this.subsctiption.unsubscribe()),
        map((params) => params.get('chatId') || ''),
        filter(chatId => !!chatId),
        tap((path) => (this.acctiveChatId = path)),
        // tap(console.log),
        tap(this.loadContactByPath)
      )
      .subscribe();
  }

  onToggleChatSettings() {
    this.isChatSettingsOpen = !this.isChatSettingsOpen;
  }

  private loadContactByPath = (path: string) => {
    const contact$ = this.chatService.chatContacts$.subscribe((c) => {
      this.chatContact =
        c.find((c) => c.chatID === this.acctiveChatId ?? path) ?? null;
    });
    this.subsctiption.add(contact$);
  };
}
