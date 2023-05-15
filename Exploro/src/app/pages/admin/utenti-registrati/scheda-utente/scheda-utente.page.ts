import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geocacher } from 'src/app/classes_&_services/Geocacher';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';
import { Utils } from 'src/app/classes_&_services/Utils';

@Component({
  selector: 'app-scheda-utente',
  templateUrl: './scheda-utente.page.html',
  styleUrls: ['./scheda-utente.page.scss'],
})
export class SchedaUtentePage implements OnInit {
  utente: Geocacher = new Geocacher
  util: Utils = new Utils

  constructor(private router: Router, private geocacherService: GeocacherService) {
  }

  ngOnInit() {
    let idUtente = parseInt(this.router.getCurrentNavigation()?.finalUrl?.queryParams['idUtente'])
    this.utente = this.geocacherService.findGeocacherById(idUtente)
  }
}
