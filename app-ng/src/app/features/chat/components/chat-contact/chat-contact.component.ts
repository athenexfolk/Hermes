import { Component, Input } from '@angular/core';
import { ChatContact } from 'src/app/models/chat-contact';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'ChatContact',
  templateUrl: './chat-contact.component.html',
  styleUrls: ['./chat-contact.component.scss'],
})
export class ChatContactComponent {
  @Input() data!: ChatContact;
  profile!: User;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService
      .getProfile(this.data.lastMassage.senderID)
      .subscribe((profile) => (this.profile = profile));
  }
}
