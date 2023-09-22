import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'OwnerPanel',
  templateUrl: './owner-panel.component.html',
  styleUrls: ['./owner-panel.component.scss'],
})
export class OwnerPanelComponent {
  myInfo: any;
  @Output() onOpenMainSettings = new EventEmitter();

  openMainSettings() {
    this.onOpenMainSettings.emit();
  }
}
