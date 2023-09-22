import { Component } from '@angular/core';
import { filter } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'PrivatePanel',
  templateUrl: './private-panel.component.html',
  styleUrls: ['./private-panel.component.scss'],
})
export class PrivatePanelComponent {
  username = '';
  isSearched = false;
  foundProfile: User | null = null;
  myId = '';

  constructor(
    private profileService: ProfileService,
    private authService: AuthorizationService
  ) {
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

  addConnector(user: User) {
    
  }
}
