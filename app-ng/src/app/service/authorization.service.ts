import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment.dev';
import { Token } from './model/token';
import { RegisterRequestDto } from './model/registerRequestDto';
import { RegisterResponseDto } from './model/registerResponseDto';
import { Response } from './model/response';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private baseUrl = new URL(enviroment.API_SERVER_URL);
  private loginUrl = new URL('account/login', this.baseUrl);
  private regUrl = new URL('account/register', this.baseUrl);

  private tokenKey = enviroment.TOKEN_KEY;

  private tokenBehavior: BehaviorSubject<Token | null>;

  get token() {
    return this.tokenBehavior.getValue();
  }
  get token$() {
    return this.tokenBehavior.asObservable();
  }

  get isLoggedIn() {
    return !!this.tokenBehavior.getValue();
  }
  get isLoggedIn$() {
    return this.tokenBehavior.asObservable().pipe(map((token) => !!token));
  }

  constructor(private http: HttpClient) {
    this.tokenBehavior = new BehaviorSubject<Token | null>(this.localToken);
    this.tokenBehavior
      .pipe(
        tap((token) => {
          this.localToken = token;
          console.debug(
            `Login status is ${!!token ? 'Logged in' : 'Not logged in'}`
          );
        })
      )
      .subscribe();
  }

  login(username: string, password: string) {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.get<Token>(this.loginUrl.toString(), { params }).pipe(
      tap((token) => this.tokenBehavior.next(token)),
      tap(console.log),
      tap((i) => console.debug('login success'))
    );
  }

  logout() {
    this.tokenBehavior.next(null);
    console.debug('logout success');
  }

  register(data: RegisterRequestDto) {
    return this.http
      .post<Response<RegisterResponseDto>>(this.regUrl.toString(), data)
      .pipe(
        tap((res) => console.debug(res.msg)),
        map((res) => res.data!)
      );
  }

  private get localToken() {
    const rawtoken = localStorage.getItem(this.tokenKey);
    if (rawtoken) {
      let token = JSON.parse(rawtoken) as Token;
      // this.tokenBehavior.next(token);
      return token;
    }
    return null;
  }

  private set localToken(token: Token | null) {
    if (!token) {
      localStorage.removeItem(this.tokenKey);
    } else {
      const strToken = JSON.stringify(token);
      localStorage.setItem(this.tokenKey, strToken);
    }
  }
}
