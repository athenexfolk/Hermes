import { Component } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'GroupPanel',
  templateUrl: './group-panel.component.html',
  styleUrls: ['./group-panel.component.scss']
})
export class GroupPanelComponent {
  isSearched = false;
  groupName = ''
  username = ''
  groupUsers: User[] = [];
  foundProfile: User | null = null;

  search() {

  }

  addConnectorToGroup(user: User) {
    this.groupUsers.push(user);
  }

}
