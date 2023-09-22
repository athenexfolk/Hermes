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
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ConnectorFilterComponent } from './components/connector-filter/connector-filter.component';
import { MainSettingsComponent } from './components/main-settings/main-settings.component';
import { OwnerPanelComponent } from './components/owner-panel/owner-panel.component';
import { ChatHeaderComponent } from './components/chat-header/chat-header.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { TextBoxComponent } from './components/text-box/text-box.component';
import { MessageComponent } from './components/message/message.component';
import { ChatSettingsComponent } from './components/chat-settings/chat-settings.component';
import { PrivatePanelComponent } from './components/private-panel/private-panel.component';
import { GroupPanelComponent } from './components/group-panel/group-panel.component';


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
    PlainPageComponent,
    SearchBarComponent,
    ConnectorFilterComponent,
    MainSettingsComponent,
    OwnerPanelComponent,
    ChatHeaderComponent,
    ChatBoxComponent,
    TextBoxComponent,
    MessageComponent,
    ChatSettingsComponent,
    PrivatePanelComponent,
    GroupPanelComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
