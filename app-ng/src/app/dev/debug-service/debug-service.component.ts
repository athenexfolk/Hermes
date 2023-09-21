import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { AuthorizationService } from 'src/app/service/authorization.service';

@Component({
  selector: 'app-debug-service',
  templateUrl: './debug-service.component.html',
  styleUrls: ['./debug-service.component.scss']
})
export class DebugServiceComponent implements OnInit {

  line: Object[] = [];
  isLogin: boolean = false;
  time = Date.now();

  constructor(
    private auth: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.login();
    this.auth.isLogedIn$.subscribe(i=>this.isLogin=i);
    setInterval(()=>{
      this.time = Date.now();
    }, 1000)
  }

  login() {
    const user = "anirut";
    const password = "1234";
    this.auth.login(user, password).pipe(
      tap(this.print)
    ).subscribe({
      error: err => this.print(err.error)
    });

    setTimeout(() => {
      // this.auth.logout();
    }, 5000);
  }

  print = (data: any) => {
    console.log(data);
    this.line.push(data);
  }

}
