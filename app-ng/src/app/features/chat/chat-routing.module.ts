import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { PlainPageComponent } from './pages/plain-page/plain-page.component';
import { ChatInterfaceComponent } from './components/chat-interface/chat-interface.component';

const routes: Routes = [
  {
    path: '',
    component: ChatPageComponent,
    children: [
      {
        path: '',
        component: PlainPageComponent,
      },
      {
        path: ':chatId',
        component: ChatInterfaceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
