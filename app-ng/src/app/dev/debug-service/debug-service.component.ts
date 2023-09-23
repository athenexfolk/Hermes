import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { ChatType } from 'src/app/models/chat';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { ChatPortalService } from 'src/app/service/chat-portal.service';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-debug-service',
  templateUrl: './debug-service.component.html',
  styleUrls: ['./debug-service.component.scss']
})
export class DebugServiceComponent implements OnInit {

  line: Object[] = [];
  isLogin: boolean = false;
  time = Date.now();

  constructor(
    private auth: AuthorizationService,
    private chat: ChatService,
    private chat_portal: ChatPortalService
  ) { }

  ngOnInit(): void {
    // update isLogin
    this.auth.isLoggedIn$
      .subscribe(i => this.isLogin = i);

    // update time
    setInterval(() => {
      this.time = Date.now();
    }, 1000)
  }

  login() {
    const user = "anirut";
    const password = "1234";

    this.auth.login(user, password).pipe(
      tap(this.print)
    ).subscribe({
      error: err => this.print(err.error)
    });
  }

  logout(){
    this.auth.logout();
  }

  register(){
    this.auth.register({
      id: `anirut${Math.floor(Math.random() *1000)}`,
      avatar: "",
      displayname:"hi",
      password: "1234",
    }).subscribe();

  }

  getchats(){
    this.chat.getChats().subscribe();
  }

  getchat(){
    this.chat.getMessages("650c0b302b86aac7c5dbaf4f").subscribe();
  }

  addChat(){
    this.chat.addChat({
      to:["saksit"],
      type: ChatType.GROUP,
      chatName: "de nada",
      colour:"green",
      image:"sealook"
    }).subscribe();
  }

  print = (data: any) => {
    console.info(data);
    this.line.push(data);
  }

}
