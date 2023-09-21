import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebugServiceComponent } from './dev/debug-service/debug-service.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: 'debug', component: DebugServiceComponent, canActivate: [authGuard] },
  {
    path: '',
    loadChildren: () =>
      import('./features/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
