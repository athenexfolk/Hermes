import { Component, Input } from '@angular/core';
import { MessageType } from 'src/app/models/message';
import { ChatPortalService } from 'src/app/service/chat-portal.service';

@Component({
  selector: 'TextBox',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
})
export class TextBoxComponent {
  @Input() chatId = '';
  msg = '';
  img = '';

  constructor(private chatPortal: ChatPortalService) {}

  checkEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }

  sendMessage() {
    if (this.msg.length) {
      this.chatPortal.send(this.chatId, {
        type: MessageType.TEXT,
        value: this.msg,
      });

      this.msg = '';
    }
  }

  sendImage() {
    if (this.img.length) {
      this.chatPortal.send(this.chatId, {
        type: MessageType.IMAGE,
        value: this.img,
      });
      this.img = '';
    }
  }

  onFileUpload(e: Event) {
    let input = e.target as HTMLInputElement;
    if (!input.files?.item(0)) return;
    let file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.img = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  clearImage() {
    this.img = '';
  }
}
