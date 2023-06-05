import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Geocacher } from 'src/app/classes_&_services/Geocacher';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';
import { RichiestaAmicizia } from 'src/app/classes_&_services/RichiestaAmicizia';
import { RichiestaAmiciziaService } from 'src/app/classes_&_services/RichiestaAmicizia.service';
import { SessioneService } from 'src/app/classes_&_services/Sessione.service';
import { Utils } from 'src/app/classes_&_services/Utils';

@Component({
  selector: 'app-dettagli-utente',
  templateUrl: './dettagli-utente.page.html',
  styleUrls: ['./dettagli-utente.page.scss'],
})
export class DettagliUtentePage implements OnInit {
  utenteSel: Geocacher = new Geocacher
  util: Utils = new Utils
  richiesta: RichiestaAmicizia
  sonoIo: boolean

  constructor(private router: Router, private geocacherSrv: GeocacherService, private alertController: AlertController, private amiciziaSrv: RichiestaAmiciziaService, private sessioneSrv: SessioneService) { }

  ngOnInit() {
    let idUtenteSel = parseInt(this.router.getCurrentNavigation()?.finalUrl?.queryParams['idUtente'])
    this.utenteSel = this.geocacherSrv.findGeocacherById(idUtenteSel)
    let idUtentePrinc = this.sessioneSrv.returnIdByJson(localStorage.getItem("geocacher"))
    this.richiesta = this.amiciziaSrv.getRichiestaAmiciziaParameter(idUtentePrinc, idUtenteSel)
    this.sonoIo = idUtenteSel === idUtentePrinc
  }

  async InviaRichiestaAmicizia() {
    const alert = await this.alertController.create({
      header: 'Vuoi mandare una richiesta di amicizia a: ' + this.utenteSel.username + " ?",
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: (data) => {
            let geo = this.sessioneSrv.returnIdByJson(localStorage.getItem("geocacher"))
            this.amiciziaSrv.inviaRichiestaDiAmicizia(geo, this.utenteSel.id)
            this.richiesta.conferma = false
          }
        }
      ],
      backdropDismiss: false // Per impedire la chiusura dell'alert facendo clic sullo sfondo
    });
    await alert.present();
  }
}
