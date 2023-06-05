import { Component, OnInit } from '@angular/core';
import { RichiestaAmicizia } from 'src/app/classes_&_services/RichiestaAmicizia';
import { RichiestaAmiciziaService } from 'src/app/classes_&_services/RichiestaAmicizia.service';
import { SessioneService } from 'src/app/classes_&_services/Sessione.service';
import { AlertController, ViewWillEnter } from '@ionic/angular';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';
import { Geocacher } from 'src/app/classes_&_services/Geocacher';

@Component({
  selector: 'app-amici',
  templateUrl: './amici.page.html',
  styleUrls: ['./amici.page.scss'],
})
export class AmiciPage implements OnInit, ViewWillEnter {
  listRichieste: RichiestaAmicizia[]
  listaAmicizie: Geocacher[]
  Gchiede: string[]
  id_utente: number

  constructor(private richiestaSrv: RichiestaAmiciziaService,
    private sessioneSrv: SessioneService,
    private alertController: AlertController,
    private geocacherSrv: GeocacherService) { }

  ngOnInit() {
    this.listRichieste = []
    this.listaAmicizie = []
    this.Gchiede = []
  }

  ionViewWillEnter(): void {
    this.id_utente = this.sessioneSrv.returnIdByJson(localStorage.getItem("geocacher"));
    this.listRichieste = [...this.richiestaSrv.getListaRichiesteParameter(0, this.id_utente)];
    this.Gchiede = this.listRichieste.map(richiesta => {
      const geocacher = this.geocacherSrv.findGeocacherById(richiesta.Gchiede);
      return geocacher ? geocacher.username : '';
    });
    this.ListaAmicizie()
  }

  private ListaAmicizie() {
    // lista di amici dell'utente
    this.listaAmicizie = []
    this.geocacherSrv.findGeocacherById(this.id_utente).amiciList.forEach((id: number) => {
      let amico: Geocacher = this.geocacherSrv.findGeocacherById(id)
      this.listaAmicizie.push(amico)
    })
  }

  AccettaRichiesta(richiesta: RichiestaAmicizia) {
    this.richiestaSrv.accettaRichiestaDiAmicizia(richiesta)
    this.listRichieste = [...this.richiestaSrv.getListaRichiesteParameter(0, this.id_utente)];
    this.ListaAmicizie()
  }

  RifiutaRichiesta(richiesta: RichiestaAmicizia) {
    this.richiestaSrv.declinaRichiestaDiAmicizia(richiesta)
    this.listRichieste = [...this.richiestaSrv.getListaRichiesteParameter(0, this.id_utente)];
  }


}


