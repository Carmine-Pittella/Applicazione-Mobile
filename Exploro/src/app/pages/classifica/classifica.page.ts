import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { Geocacher } from 'src/app/classes_&_services/Geocacher';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';
import { SessioneService } from 'src/app/classes_&_services/Sessione.service';

@Component({
  selector: 'app-classifica',
  templateUrl: './classifica.page.html',
  styleUrls: ['./classifica.page.scss'],
})
export class ClassificaPage implements ViewWillEnter {
  listaUtenti: Geocacher[] = []
  idUtente: number

  constructor(private geocacherSrv: GeocacherService, private sessioneSrv: SessioneService, private router: Router) { }

  ionViewWillEnter() {
    this.listaUtenti = [...this.geocacherSrv.getClassifica()]
    this.idUtente = this.sessioneSrv.returnIdByJson(localStorage.getItem("geocacher"))
  }

  TipoClassifica(event: any) {
    if (event.detail.value === "globale") {
      this.listaUtenti = [...this.geocacherSrv.getClassifica()]
    }
    else {
      this.listaUtenti = [...this.geocacherSrv.getClassificaAmici(this.idUtente)]
    }
  }

  VisualizzaUtente(utente: Geocacher) {
    this.router.navigateByUrl("/classifica/dettagli-utente?idUtente=" + utente.id);
  }
}


