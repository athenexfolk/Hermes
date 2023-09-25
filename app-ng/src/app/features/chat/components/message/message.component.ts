import { Component, Input } from '@angular/core';
import { Message, MessageType } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'Message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() isSelf = false;
  @Input() msg!: Message;

  senderProfile!: User;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService
      .getProfile(this.msg.senderID)
      .subscribe((profile) => (this.senderProfile = profile));
  }

  get MessageType() {
    return MessageType;
  }
}
