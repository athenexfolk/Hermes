import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { enviroment } from 'src/enviroment/enviroment.dev';
import { HttpClient } from '@angular/common/http';
import { ResponseUser, User } from '../models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = new URL(enviroment.API_SERVER_URL);
  private profileUrl = new URL('/profile', this.baseUrl);

  constructor(
    private http: HttpClient,
    private authService: AuthorizationService
  ) {}

  getMyProfile() {
    return this.http.get<ResponseUser>(this.profileUrl.toString()).pipe(
      map(
        (ruser) =>
          ({
            _id: ruser.username,
            displayName: ruser.displayname,
            avatar: ruser.avatar,
          } as User)
      )
    );
  }
}
