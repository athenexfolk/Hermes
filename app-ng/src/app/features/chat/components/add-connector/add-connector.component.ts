import { Component } from '@angular/core';
import { ChatType } from 'src/app/models/chat';

@Component({
  selector: 'AddConnector',
  templateUrl: './add-connector.component.html',
  styleUrls: ['./add-connector.component.scss'],
})
export class AddConnectorComponent {
  isPanelOpen = false;

  chatType: ChatType = ChatType.PRIVATE;

  openAddModal() {
    this.isPanelOpen = true;
  }
  
  closeAddModal() {
    this.isPanelOpen = false;
  }

  get ChatType() {
    return ChatType;
  }

  changeChatType(type: ChatType) {
    this.chatType = type;
  }
}
