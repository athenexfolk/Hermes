import { Component, Input } from '@angular/core';
import { ChatContact } from 'src/app/models/chat-contact';

@Component({
  selector: 'ChatContactList',
  templateUrl: './chat-contact-list.component.html',
  styleUrls: ['./chat-contact-list.component.scss']
})
export class ChatContactListComponent {
  @Input() chatContacts: ChatContact[] = []
}
