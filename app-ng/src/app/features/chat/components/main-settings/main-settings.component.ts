import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'MainSettings',
  templateUrl: './main-settings.component.html',
  styleUrls: ['./main-settings.component.scss'],
})
export class MainSettingsComponent {
  myInfo!: User;

  @Input() openStatus = false;
  @Output() onCloseMainSettings = new EventEmitter();

  isChangeDisplayNamePanelOpen = false;
  isChangeAvatarPanelOpen = false;

  newName = '';
  newAvatar = '';

  constructor(
    private router: Router,
    private authService: AuthorizationService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.profileService.myProfile$.subscribe((res) => (this.myInfo = res));
  }

  closeMainSettings() {
    this.onCloseMainSettings.emit();
  }

  openChangeDisplayNamePanel() {
    this.isChangeDisplayNamePanelOpen = true;
  }

  closeChangeDisplayNamePanel() {
    this.isChangeDisplayNamePanelOpen = false;
    this.newName = '';
  }

  openChangeAvatarPanel() {
    this.isChangeAvatarPanelOpen = true;
  }

  closeChangeAvatarPanel() {
    this.isChangeAvatarPanelOpen = false;
    this.newAvatar = '';
  }

  changeDisplayName() {
    this.profileService.changeDisplayName(this.newName).subscribe(() => {
      this.isChangeDisplayNamePanelOpen = false;
      this.myInfo.displayName = this.newName;
    });
  }

  changeAvatar() {
    this.profileService.changeAvatar(this.newAvatar).subscribe((res) => {
      this.isChangeAvatarPanelOpen = false;
      this.myInfo.avatar = this.newAvatar;
    });
  }

  logout() {
    this.authService.logout();
    // this.router.navigate(['/auth', 'login']);
    // reload for refreshing cached token in appllication.
    location.reload();
  }

  onFileUpload(e: Event) {
    let input = e.target as HTMLInputElement;
    if (!input.files?.item(0)) return;
    let file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newAvatar = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
