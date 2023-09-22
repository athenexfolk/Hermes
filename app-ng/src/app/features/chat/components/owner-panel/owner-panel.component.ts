import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'OwnerPanel',
  templateUrl: './owner-panel.component.html',
  styleUrls: ['./owner-panel.component.scss'],
})
export class OwnerPanelComponent {
  myInfo!: User;
  @Output() onOpenMainSettings = new EventEmitter();

  constructor(private profileService: ProfileService) {}

  openMainSettings() {
    this.onOpenMainSettings.emit();
  }

  ngOnInit() {
    this.profileService.getMyProfile().subscribe((res) => (this.myInfo = res));
  }
}
