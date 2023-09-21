import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChatInterfaceComponent } from './components/chat-interface/chat-interface.component';
import { BrandComponent } from './components/brand/brand.component';
import { AddConnectorComponent } from './components/add-connector/add-connector.component';
import { ConnectorCardComponent } from './components/connector-card/connector-card.component';
import { ChatContactComponent } from './components/chat-contact/chat-contact.component';
import { ChatContactListComponent } from './components/chat-contact-list/chat-contact-list.component';
import { PlainPageComponent } from './pages/plain-page/plain-page.component';


@NgModule({
  declarations: [
    ChatPageComponent,
    SidebarComponent,
    ChatInterfaceComponent,
    BrandComponent,
    AddConnectorComponent,
    ConnectorCardComponent,
    ChatContactComponent,
    ChatContactListComponent,
    PlainPageComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
