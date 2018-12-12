import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.attemptAuth(this.username, this.password)
      .subscribe(data => {
        this.tokenStorage.saveToken(data.token);
        this.router.navigate(['/dashboard']);
      });
  }

}
