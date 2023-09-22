import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'MainSettings',
  templateUrl: './main-settings.component.html',
  styleUrls: ['./main-settings.component.scss']
})
export class MainSettingsComponent {
  myInfo: any;

  @Input() openStatus = false
  @Output() onCloseMainSettings = new EventEmitter();

  closeMainSettings() {
    this.onCloseMainSettings.emit();
  }

  handleLogout() {}
}
