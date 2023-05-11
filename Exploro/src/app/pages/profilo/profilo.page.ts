import { Component, OnInit } from '@angular/core';
import { Geocacher } from 'src/app/classes_&_services/Geocacher';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {

  utente: Geocacher = new Geocacher();
  progress = 20


  constructor() { }

  ngOnInit() {
  }

}
