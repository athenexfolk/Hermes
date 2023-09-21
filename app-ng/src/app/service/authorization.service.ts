import { HttpClient, HttpParams } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private baseUrl = new URL(enviroment.API_SERVER_URL);
  private loginUrl = new URL("account/login", this.baseUrl);
  private regUrl = new URL("account/register", this.baseUrl);

  private tokenKey = enviroment.TOKEN_KEY;

  private tokenBehavior = new BehaviorSubject<Token | undefined>(this.localToken);

  get token$() {
    return this.tokenBehavior.asObservable();
  }
  get isLogedIn$() {
    return this.tokenBehavior.asObservable()
      .pipe(map(token => token != undefined));
  }
  get isLogedIn() {
    return this.tokenBehavior.getValue() != undefined;
  }

  constructor(
    private http: HttpClient
  ) {
    // update local token
    this.tokenBehavior.pipe(tap(token=>this.localToken=token),tap(console.log)).subscribe();
  }

  login(username: string, password: string) {
    const params = new HttpParams()
      .set("username", username)
      .set("password", password);

    return this.http.get<Token>(this.loginUrl.toString(), { params }).pipe(
      tap(token=>this.tokenBehavior.next(token))
    );
  }

  logout(){
    this.tokenBehavior.next(undefined);
  }

  private get localToken() {
    const rawtoken = localStorage.getItem(this.tokenKey);
    if (rawtoken)
    try{
      return JSON.parse(rawtoken) as Token;
    } catch{
      this.tokenBehavior.next(undefined);
      return undefined;
    }
    return undefined;
  }

  private set localToken(token:Token|undefined){
    if (token === undefined){
      localStorage.removeItem(this.tokenKey);
    }else{
      const strtoken = JSON.stringify(token);
      localStorage.setItem(this.tokenKey, strtoken);
    }
  }

}
