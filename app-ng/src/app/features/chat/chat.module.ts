import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { ComponentsComponent } from './components/components.component';


@NgModule({
  declarations: [
    ChatPageComponent,
    ComponentsComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
