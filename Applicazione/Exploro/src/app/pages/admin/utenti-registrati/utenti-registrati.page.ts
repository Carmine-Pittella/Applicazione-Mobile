import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { AdminService } from 'src/app/classes_&_services/Admin.service';
import { Geocacher } from 'src/app/classes_&_services/Geocacher';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';

@Component({
  selector: 'app-utenti-registrati',
  templateUrl: './utenti-registrati.page.html',
  styleUrls: ['./utenti-registrati.page.scss'],
})
export class UtentiRegistratiPage implements OnInit, ViewWillEnter {
  listaUtenti: Geocacher[]
  listaUtentiFiltrata: Geocacher[]

  constructor(private geocacherService: GeocacherService, private adminService: AdminService, private router: Router) { }


  ngOnInit() {
    this.listaUtenti = []
    this.listaUtentiFiltrata = []
  }

  ionViewWillEnter(): void {
    this.listaUtenti = this.geocacherService.getAllGeocacher()
    this.listaUtentiFiltrata = [...this.listaUtenti]
  }

  FiltraRisultati(event: any) {
    if (event.target.value != "") {
      this.listaUtentiFiltrata = this.listaUtenti.filter(c =>
        c.nome.toLowerCase().includes(event.target.value.toLowerCase()) ||
        c.cognome.toLowerCase().includes(event.target.value.toLowerCase())
      );

    }
    else {
      this.listaUtentiFiltrata = [...this.listaUtenti]
    }
  }

  ScegliUtente(utente: Geocacher) {
    this.router.navigateByUrl("/admin/utenti-registrati/scheda-utente?idUtente=" + utente.id);
  }
}




