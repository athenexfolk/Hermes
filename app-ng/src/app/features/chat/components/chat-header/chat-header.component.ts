import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatContact } from 'src/app/models/chat-contact';

@Component({
  selector: 'ChatHeader',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent {
  @Input() forContact!: ChatContact

  @Output() onToggleChatSettings = new EventEmitter();

  toggleChatSettings() {
    this.onToggleChatSettings.emit()
  }
}
