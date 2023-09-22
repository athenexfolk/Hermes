import { Component } from '@angular/core';

@Component({
  selector: 'ChatInterface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.scss']
})
export class ChatInterfaceComponent {
  isChatSettingsOpen = false;

  onToggleChatSettings() {
    this.isChatSettingsOpen =!this.isChatSettingsOpen;
  }
}
