import { Component, Input } from '@angular/core';
import { ChatContact } from 'src/app/models/chat-contact';

@Component({
  selector: 'ChatSettings',
  templateUrl: './chat-settings.component.html',
  styleUrls: ['./chat-settings.component.scss']
})
export class ChatSettingsComponent {
  @Input() forContact!: ChatContact
}
