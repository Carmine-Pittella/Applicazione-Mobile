import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit() {}
  onRegister() {
    // complimenti, questo metodo ora è diventato inutle
  }
}
