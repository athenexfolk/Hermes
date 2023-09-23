import { Component } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'ChatInterface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.scss']
})
export class ChatInterfaceComponent {
  isChatSettingsOpen = false;

  // chat

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.chatContacts$.subscribe(chatContacts => chatContacts)
  }

  onToggleChatSettings() {
    this.isChatSettingsOpen =!this.isChatSettingsOpen;
  }
}
