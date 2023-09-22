import { Component, Input } from '@angular/core';
import { ChatContact } from 'src/app/models/chat-contact';

@Component({
  selector: 'ChatContact',
  templateUrl: './chat-contact.component.html',
  styleUrls: ['./chat-contact.component.scss']
})
export class ChatContactComponent {
  @Input() data!: ChatContact

}
