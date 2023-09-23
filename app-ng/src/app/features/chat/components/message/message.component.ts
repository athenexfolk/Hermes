import { Component, Input } from '@angular/core';
import { Message, MessageType } from 'src/app/models/message';

@Component({
  selector: 'Message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() isSelf = false;
  @Input() msg!: Message;

  get MessageType() {
    return MessageType;
  }
}
