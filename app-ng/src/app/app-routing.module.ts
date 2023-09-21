import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebugServiceComponent } from './dev/debug-service/debug-service.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: 'debug', component: DebugServiceComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
