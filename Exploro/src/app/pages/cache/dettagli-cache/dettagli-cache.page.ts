import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Cache } from 'src/app/classes_&_services/Cache';
import { CacheService } from 'src/app/classes_&_services/Cache.service';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';
import { SessioneService } from 'src/app/classes_&_services/Sessione.service';

@Component({
  selector: 'app-dettagli-cache',
  templateUrl: './dettagli-cache.page.html',
  styleUrls: ['./dettagli-cache.page.scss'],
})
export class DettagliCachePage implements OnInit {
  cache: Cache = new Cache
  cacheTrovata: boolean = true
  isAlertOpen = false;
  public alertButtons = ['OK'];
  headerAlert: string
  messageAlert: string
  selezionato: boolean

  constructor(private router: Router, private cacheService: CacheService, private sessioneSrv: SessioneService, private utenteService: GeocacherService, private alertController: AlertController) { }

  ngOnInit() {
    let idCache = parseInt(this.router.getCurrentNavigation()?.finalUrl?.queryParams['idCache'])
    this.cache = this.cacheService.findCacheById(idCache)

    if (this.utenteService.findGeocacherById(this.sessioneSrv.returnIdByJson(localStorage.getItem("geocacher"))).cacheTrovate.includes(this.cache.id)) {
      this.cacheTrovata = true
    } else {
      this.cacheTrovata = false
    }
  }

  async VerificaParolaOrdine() {
    const alert = await this.alertController.create({
      header: 'Inserisci la parola d`ordine per continuare:',
      inputs: [
        {
          name: 'parolaOrdine',
          type: 'text',
          placeholder: 'Parola d`ordine:'
        }
      ],
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: (data) => { this.selezionato = false }
        },
        {
          text: 'OK',
          handler: (data) => {
            if (data.parolaOrdine != this.cache.parolaOrdine) {
              this.headerAlert = "Parola d`ordine sbagliata"
              this.messageAlert = "la parola d`ordine inserita non corrisponde"
              this.isAlertOpen = true
              this.selezionato = false
              return
            }
            else {
              this.setCacheTrovata()
              return
            }
          }
        }
      ],
      backdropDismiss: false // Per impedire la chiusura dell'alert facendo clic sullo sfondo
    });
    await alert.present();
    this.isAlertOpen = false
  }


  setCacheTrovata() {
    this.utenteService.addCacheTrovata(this.sessioneSrv.returnIdByJson(localStorage.getItem("geocacher")), this.cache.id)
    this.selezionato = true
    this.cacheTrovata = !this.cacheTrovata
  }

}




