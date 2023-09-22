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
    console.debug("addGroupChat");
    this.chatService.addChat({
      to: this.groupUsers.map(i=>i._id),
      type:"group",
      chatName: this.groupName,
      image: this.imageStr
    }).subscribe({
      next: this.onAddConnectorSeccess,
      error: this.onAddConnectorFalse
    })
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

  private onAddConnectorSeccess = () => { console.log("Add success"); this.close.emit(); }
  private onAddConnectorFalse = (e:unknown) => { console.log("Add False : ",e) }
}
