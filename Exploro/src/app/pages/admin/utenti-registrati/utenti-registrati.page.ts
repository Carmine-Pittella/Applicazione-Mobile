import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/classes_&_services/Admin.service';
import { Geocacher } from 'src/app/classes_&_services/Geocacher';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';
import { SchedautenteComponent } from 'src/app/component/schedautente/schedautente.component';

@Component({
  selector: 'app-utenti-registrati',
  templateUrl: './utenti-registrati.page.html',
  styleUrls: ['./utenti-registrati.page.scss'],
})
export class UtentiRegistratiPage implements OnInit {
  listaUtenti: Geocacher[] = []

  constructor(private geocacherService: GeocacherService, private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.listaUtenti = this.geocacherService.getAllGeocacher()
  }


  FiltraRisultati(event: any) {
    if (event.target.value != "") {
      this.listaUtenti = this.listaUtenti.filter(c => c.nome.toLowerCase().includes(event.target.value.toLowerCase()));
    }
    else {
      this.listaUtenti = this.geocacherService.getAllGeocacher()
    }
  }

  ScegliUtente(utente: Geocacher) {
    this.adminService.MemorizzaUtente(utente.id)
    this.router.navigate(['/admin/utenti-registrati/scheda-utente']);
  }
}


