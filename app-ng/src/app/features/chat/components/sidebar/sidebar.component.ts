import { Component } from '@angular/core';
import { ChatType } from 'src/app/models/chat';
import { ChatContact } from 'src/app/models/chat-contact';
import { MessageType } from 'src/app/models/message';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'Sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  chatContacts: ChatContact[] = [];

  filteredChatContacts: ChatContact[] = [];
  isMainSettingsOpen = false;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts().subscribe((res) => {
      this.chatContacts = res;
      this.filteredChatContacts = res;
    });
  }

  onOpenMainSettings() {
    this.isMainSettingsOpen = true;
  }

  onCloseMainSettings() {
    this.isMainSettingsOpen = false;
  }

  onChangeFilter(filter: ChatType | null) {
    if (!filter) {
      this.filteredChatContacts = this.chatContacts;
    } else {
      if (filter === ChatType.PRIVATE) {
        this.filteredChatContacts = this.chatContacts.filter(
          (contact) => contact.type === ChatType.PRIVATE
        );
      } else {
        this.filteredChatContacts = this.chatContacts.filter(
          (contact) => contact.type === ChatType.GROUP
        );
      }
    }
  }
}
