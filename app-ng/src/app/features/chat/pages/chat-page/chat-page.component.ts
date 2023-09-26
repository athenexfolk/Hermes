import { Component } from '@angular/core';
import { ActivatedRoute, EventType, NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent {
  isMobileSidebarOpen = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.pipe(filter(e=>e.type == EventType.Scroll)).subscribe(() => {
      console.log(this.router.url);
      const url = this.router.url;
      if(url=='/') this.openMobileSidebar()
      else this.closeMobileSidebar()
    })
  }

  openMobileSidebar() {
    this.isMobileSidebarOpen = true;
  }

  closeMobileSidebar() {
    this.isMobileSidebarOpen = false;
  }
}
