import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { ChatContact } from 'src/app/models/chat-contact';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'ChatInterface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.scss'],
})
export class ChatInterfaceComponent {
  isChatSettingsOpen = false;

  chatContact: ChatContact | null = null;

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params) => {
        let chatId = params.get('chatId') || '';
        return this.chatService.chatContacts$.pipe(
          map((contacts) =>
            contacts.find((contact) => contact.chatID === chatId)
          )
        );
      })
    ).subscribe(contact => this.chatContact = contact || null);
  }

  onToggleChatSettings() {
    this.isChatSettingsOpen = !this.isChatSettingsOpen;
  }
}
