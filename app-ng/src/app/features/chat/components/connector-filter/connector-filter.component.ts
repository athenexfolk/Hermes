import { Component } from '@angular/core';
import { ChatType } from 'src/app/models/chat';

@Component({
  selector: 'ConnectorFilter',
  templateUrl: './connector-filter.component.html',
  styleUrls: ['./connector-filter.component.scss'],
})
export class ConnectorFilterComponent {
  filter: ChatType | null = null;

  get ChatType() {
    return ChatType
  }

  changeFilter(filter: ChatType | null) {
    this.filter = filter;
  }
}
