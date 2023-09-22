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

  constructor(
    private router: Router,
    private authService: AuthorizationService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.profileService.getMyProfile().subscribe((res) => (this.myInfo = res));
  }

  closeMainSettings() {
    this.onCloseMainSettings.emit();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth', 'login']);
  }


}
