import { Component, EventEmitter, Output } from '@angular/core';
import { filter } from 'rxjs';
import { ChatType } from 'src/app/models/chat';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { ChatService } from 'src/app/service/chat.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'GroupPanel',
  templateUrl: './group-panel.component.html',
  styleUrls: ['./group-panel.component.scss'],
})
export class GroupPanelComponent {
  isSearched = false;
  groupName = '';
  username = '';
  groupUsers: User[] = [];
  foundProfile: User | null = null;
  myId = '';

  imageStr: string = '';

  @Output() close = new EventEmitter();

  constructor(
    private profileService: ProfileService,
    private authService: AuthorizationService,
    private chatService: ChatService
  ) {
    this.profileService
      .getMyProfile()
      .subscribe((me) => this.groupUsers.push(me));
    this.myId = this.authService.myId;
  }

  search() {
    if (this.username === '') return;
    this.isSearched = true;
    this.profileService
      .getProfile(this.username)
      .pipe(filter((user) => user._id !== this.myId))
      .subscribe({
        next: (user) => {
          this.foundProfile = user;
          this.isSearched = true;
        },
        error: (err) => {
          this.foundProfile = null;
          this.isSearched = true;
        },
      });
  }

  addConnectorToGroup(user: User) {
    if (this.groupUsers.find((existedUser) => existedUser._id === user._id))
      return;
    this.groupUsers.push(user);
  }

  removeConnectorFromGroup(index: number) {
    this.groupUsers.splice(index, 1);
  }

  addGroupChat() {
    this.chatService
      .addChat({
        type: ChatType.GROUP,
        chatName: this.groupName,
        to: this.groupUsers.map((user) => user._id),
        image : this.imageStr
      })
      .subscribe(() => {
        this.close.emit();
      });
  }

  onFileUpload(e: Event) {
    let input = e.target as HTMLInputElement;
    if (!input.files?.item(0)) return;
    let file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageStr = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
