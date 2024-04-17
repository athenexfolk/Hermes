import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseUser, User } from '../models/user';
import { BehaviorSubject, Observable, filter, map, switchMap, tap } from 'rxjs';
import { AuthorizationService } from './authorization.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = new URL(environment.apiOrigin);
  private profileUrl = new URL('api/profile', this.baseUrl);
  private displayNameUrl = new URL('api/profile/displayname', this.baseUrl);
  private avatarUrl = new URL('api/profile/avatar', this.baseUrl);


  myProfile: BehaviorSubject<User>;

  constructor(private http: HttpClient, private auth: AuthorizationService) {
    this.myProfile = new BehaviorSubject<User>({
      _id: '',
      displayName: '',
      avatar: '',
    });

    this.auth.isLoggedIn$
      .pipe(
        filter((i) => i),
        switchMap((i) => this.getMyProfile())
      )
      .subscribe();
  }

  get myProfile$() {
    return this.myProfile.asObservable();
  }

  getMyProfile() {
    return this.http.get<ResponseUser>(this.profileUrl.toString()).pipe(
      map(
        (ruser) =>
          ({
            _id: ruser.username,
            displayName: ruser.displayname,
            avatar: ruser.avatar,
          } as User)
      ),
      tap((me) => this.myProfile.next(me))
    );
  }

  getProfile(id: string) {
    return this.http
      .get<ResponseUser>(`${this.profileUrl.toString()}/${id}`)
      .pipe(
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

  changeDisplayName(newDisplayName: string) {
    return this.http
      .patch(`${this.displayNameUrl.toString()}/${newDisplayName}`, {})
      .pipe(tap(() => this.getMyProfile().subscribe()));
  }

  changeAvatar(newAvatar: string) {
    return this.http
      .patch(this.avatarUrl.toString(), {
        'b64-img': newAvatar
      })
      .pipe(tap(() => this.getMyProfile().subscribe()));
  }
}
