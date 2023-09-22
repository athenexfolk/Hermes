import { Component } from '@angular/core';
import { ChatType } from 'src/app/models/chat';
import { ChatContact } from 'src/app/models/chat-contact';
import { MessageType } from 'src/app/models/message';

@Component({
  selector: 'Sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  isMainSettingsOpen = false;

  contacts: ChatContact[] = [
    {
      chatID: '1',
      chatName: 'A',
      lastMassage: {
        chatID: '1',
        senderID: '2',
        sendTime: new Date(),
        content: {
          type: MessageType.TEXT,
          data: 'Hello'
        }
      },
      type: ChatType.PRIVATE,
      colour: '',
      image: ''
    }
  ]

  onOpenMainSettings() {
    this.isMainSettingsOpen = true;
  }

  onCloseMainSettings() {
    this.isMainSettingsOpen = false;
  }
}
