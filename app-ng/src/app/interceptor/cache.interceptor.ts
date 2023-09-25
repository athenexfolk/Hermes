import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CacheProfileInterceptor implements HttpInterceptor {

  private cache = new Map<URL, Observable<HttpEvent<unknown>>>();
  private baseUrl = new URL(environment.apiOrigin);

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const url = new URL(request.urlWithParams);

    if (request.method !== 'GET') {
      return next.handle(request);
    }

    if (!request.url.startsWith(new URL('/profile',this.baseUrl).toString()))
      return next.handle(request);

    console.debug("CacheInterceptor intercept : ", request.urlWithParams);

    if (!this.cache.has(url)) {
      const response = next.handle(request).pipe(
        finalize(() => this.cache.delete(url)),
        shareReplay({ refCount: true, bufferSize: 1 })
      );
      this.cache.set(url, response);
    }

    return this.cache.get(url)!;
  }
}
