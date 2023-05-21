import { Component, OnInit } from '@angular/core';
import { RichiestaAmicizia } from 'src/app/classes_&_services/RichiestaAmicizia';
import { RichiestaAmiciziaService } from 'src/app/classes_&_services/RichiestaAmicizia.service';
import { SessioneService } from 'src/app/classes_&_services/Sessione.service';
import { AlertController } from '@ionic/angular';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';

@Component({
  selector: 'app-amici',
  templateUrl: './amici.page.html',
  styleUrls: ['./amici.page.scss'],
})
export class AmiciPage implements OnInit {
  listRichieste: RichiestaAmicizia[] = []
  Gchiede: string[] = []
  id_utente: number

  constructor(private richiestaSrv: RichiestaAmiciziaService,
    private sessioneSrv: SessioneService,
    private alertController: AlertController,
    private geocacherSrv: GeocacherService) { }

  ngOnInit() {
    this.id_utente = this.sessioneSrv.returnIdByJson(localStorage.getItem("geocacher"));
    this.listRichieste = [...this.richiestaSrv.getListaRichiesteParameter(0, this.id_utente)];
    this.Gchiede = this.listRichieste.map(richiesta => {
      const geocacher = this.geocacherSrv.findGeocacherById(richiesta.Gchiede);
      return geocacher ? geocacher.username : '';
    });
  }


  AccettaRichiesta(richiesta: RichiestaAmicizia) {
    this.richiestaSrv.accettaRichiestaDiAmicizia(richiesta)
    this.listRichieste = [...this.richiestaSrv.getListaRichiesteParameter(0, this.id_utente)];
  }

  RifiutaRichiesta(richiesta: RichiestaAmicizia) {
    this.richiestaSrv.declinaRichiestaDiAmicizia(richiesta)
    this.listRichieste = [...this.richiestaSrv.getListaRichiesteParameter(0, this.id_utente)];
  }


}


