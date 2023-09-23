import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'ChatHeader',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent {
  forContact: any

  @Output() onToggleChatSettings = new EventEmitter();

  toggleChatSettings() {
    this.onToggleChatSettings.emit()
  }
}
