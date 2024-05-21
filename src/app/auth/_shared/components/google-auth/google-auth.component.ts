declare var google: any;

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-auth',
  standalone: true,
  imports: [],
  templateUrl: './google-auth.component.html',
  styleUrl: './google-auth.component.scss',
})
export class GoogleAuthComponent implements OnInit {
  ngOnInit(): void {
    this.gInit();
  }

  gInit() {
    google.accounts.id.initialize({
      client_id:
        '873847186399-o2i49t2fae1cviq82ukkbl4lvu99g22f.apps.googleusercontent.com',
      callback: this.handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.querySelector('.google-btn_'), {
      type: 'icon',
      theme: 'outline',
      size: 'medium',
      shape: 'rectangle',
      width: 80,
    });
  }

  handleCredentialResponse(data: any) {
    console.log(data);
  }

  triggerGoogleSocialAuth() {
    google.accounts.id.prompt();
  }
}
