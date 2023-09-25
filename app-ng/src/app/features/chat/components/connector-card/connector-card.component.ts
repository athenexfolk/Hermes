import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'ConnectorCard',
  templateUrl: './connector-card.component.html',
  styleUrls: ['./connector-card.component.scss']
})
export class ConnectorCardComponent {
  @Input() info!: User
  @Output() addAction = new EventEmitter<User>();

  onAdd() {
    this.addAction.emit(this.info);
  }
}
