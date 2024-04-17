import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent {
  isMobileSidebarOpen = true;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.closeMobileSidebar()
      // if(this.route.snapshot.paramMap.get('chatId')){
      //   this.isMobileSidebarOpen = false
      // }
    })
  }

  openMobileSidebar() {
    this.isMobileSidebarOpen = true;
  }

  closeMobileSidebar() {
    this.isMobileSidebarOpen = false;
  }
}
