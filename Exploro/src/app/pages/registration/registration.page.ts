import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  async Conferma() {
    console.log('ciao');
    // Check validazione di tutti i campi
  }
}
