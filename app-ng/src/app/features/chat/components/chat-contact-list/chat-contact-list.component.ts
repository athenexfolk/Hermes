import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay, of, tap } from 'rxjs';
import { ChatContact } from 'src/app/models/chat-contact';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { ChatPortalService } from 'src/app/service/chat-portal.service';

@Component({
  selector: 'ChatContactList',
  templateUrl: './chat-contact-list.component.html',
  styleUrls: ['./chat-contact-list.component.scss']
})
export class ChatContactListComponent implements OnInit, OnDestroy {

  @Input() chatContacts: ChatContact[] = []

  onlineUsers!: Set<string>;

  subscriotpion!: Subscription;

  constructor(
    private chatPoartal: ChatPortalService,
    private authService: AuthorizationService
  ) { }

  ngOnDestroy(): void {
    this.subscriotpion.unsubscribe();
  }

  ngOnInit(): void {
    this.listenToUserStatus();
  }

  private listenToUserStatus() {
    this.subscriotpion=this.chatPoartal.onlineUsers$.pipe(
      tap(u=>this.onlineUsers = u)
    ).subscribe();
  }

  checkStatus(contact:ChatContact): boolean {
    const found = contact.members.filter(i=>i._id != this.authService.myId);
    let status = found.reduce((a,b)=>a || this.onlineUsers.has(b._id), false);
    return status;
  }

}
