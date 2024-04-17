import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../service/authorization.service';
import { environment } from 'src/environments/environment';

const EXCLUDE: { mehtod: string, endpoint: string }[] = [
  { mehtod: "GET", endpoint: `${environment.apiOrigin}/account/login` },
  { mehtod: "POST", endpoint: `${environment.apiOrigin}/account/register` }
]

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthorizationService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.debug("############## auth intercept ##############");
    const isExcluded = !!EXCLUDE.find(i=>i.mehtod==request.method && i.endpoint==request.url);
    const token = this.auth.token;

    if (isExcluded || token == undefined)
      return next.handle(request);

    const newReq = request.clone({
      headers: new HttpHeaders({
        "Authorization": `${token.tokenType} ${token.accessToken}`
      })
    });

    return next.handle(newReq);
  }
}
