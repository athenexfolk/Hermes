import { Component } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'PrivatePanel',
  templateUrl: './private-panel.component.html',
  styleUrls: ['./private-panel.component.scss']
})
export class PrivatePanelComponent {
  username = ''
  isSearched = false
  foundProfile: User | null = null

  search() {
    this.isSearched = true
  }

  addConnector(user: User) {

  }
}
