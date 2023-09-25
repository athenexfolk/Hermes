import { Component, EventEmitter, Output } from '@angular/core';
import { ChatType } from 'src/app/models/chat';

@Component({
  selector: 'ConnectorFilter',
  templateUrl: './connector-filter.component.html',
  styleUrls: ['./connector-filter.component.scss'],
})
export class ConnectorFilterComponent {
  filter: ChatType | null = null;

  @Output() onChangeFilter = new EventEmitter<ChatType | null>();

  get ChatType() {
    return ChatType
  }

  changeFilter(filter: ChatType | null) {
    this.filter = filter;
    this.onChangeFilter.emit(filter)
  }
}
