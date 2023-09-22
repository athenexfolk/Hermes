import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  username = '';
  image = '';
  displayName = '';
  password = '';

  step: number = 1;

  isUsernameValid = false;
  isSearched = false;

  constructor(
    private profileService: ProfileService,
    private authService: AuthorizationService,
    private router: Router
  ) {}

  checkUsernameValidity() {
    if (!this.username.length) return;
    this.profileService.getProfile(this.username).subscribe({
      next: (user) => {
        this.isSearched = true;
        this.isUsernameValid = false;
      },
      error: (err) => {
        this.isSearched = true;
        this.isUsernameValid = true;
        this.goNextStep();
      },
    });
  }

  goNextStep() {
    if (this.step > 3) return;
    this.step++;
  }

  goPreviousStep() {
    if (this.step < 1) return;
    this.step--;
  }

  onFileUpload(e: Event) {
    let input = e.target as HTMLInputElement;
    if (!input.files?.item(0)) return;
    let file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  register() {
    this.authService
      .register({
        id: this.username,
        displayname: this.displayName,
        avatar: this.image,
        password: this.password,
      })
      .subscribe(() => {
        this.router.navigate(['/auth', 'login']);
      });
  }
}
