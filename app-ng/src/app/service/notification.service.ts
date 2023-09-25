import { Injectable } from '@angular/core';
import { MessageDto } from '../models/message';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private prifile: ProfileService
  ) { }

  notifyMe(data: MessageDto) {
    if (data.chatContent.type.toString() === 'welcome_message') return;
    this.prifile.getProfile(data.sender).subscribe(u => {

      const opt: NotificationOptions = {
        body: data.chatContent.type.toString() === 'text' ? data.chatContent.value : undefined,
        image: data.chatContent.type.toString() === 'image' ? data.chatContent.value : undefined,
        icon: u.avatar
      }
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        const notification = new Notification(u.displayName,opt);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            const notification = new Notification(u.displayName,opt);
          }
        });
      }

    });
  }
}
