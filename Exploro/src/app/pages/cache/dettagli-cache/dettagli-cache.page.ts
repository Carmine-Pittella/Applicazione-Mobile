import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Cache } from 'src/app/classes_&_services/Cache';
import { CacheService } from 'src/app/classes_&_services/Cache.service';
import { Feedback } from 'src/app/classes_&_services/Feedback';
import { FeedbackService } from 'src/app/classes_&_services/FeedbackService';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';
import { SessioneService } from 'src/app/classes_&_services/Sessione.service';

@Component({
  selector: 'app-dettagli-cache',
  templateUrl: './dettagli-cache.page.html',
  styleUrls: ['./dettagli-cache.page.scss'],
})
export class DettagliCachePage implements OnInit {
  cache: Cache
  cacheTrovata: boolean = true
  isAlertOpen = false;
  public alertButtons = ['OK'];
  headerAlert: string
  messageAlert: string
  selezionato: boolean
  feedback: Feedback = new Feedback
  listaFeedbackCache: Feedback[] = []

  constructor(private router: Router,
    private cacheService: CacheService,
    private sessioneSrv: SessioneService,
    private utenteService: GeocacherService,
    private alertController: AlertController,
    private feedbackSrv: FeedbackService) { }

  ngOnInit() {
    this.cache = new Cache
    let idCache = parseInt(this.router.getCurrentNavigation()?.finalUrl?.queryParams['idCache'])
    this.cache = this.cacheService.findCacheById(idCache)
    if (this.utenteService.findGeocacherById(this.sessioneSrv.returnIdByJson(localStorage.getItem("geocacher"))).cacheTrovate.includes(this.cache.id)) {
      this.cacheTrovata = true
    } else {
      this.cacheTrovata = false
    }
    let id_utente_sessione = this.sessioneSrv.returnIdByJson(localStorage.getItem("geocacher"))
    this.feedback = this.feedbackSrv.getFeedbackByUtenteCache(id_utente_sessione, this.cache.id)
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

  InviaFeedback(form: NgForm) {
    this.feedback.id_utente = this.sessioneSrv.returnIdByJson(localStorage.getItem("geocacher"))
    this.feedback.id_cache = this.cache.id
    this.feedbackSrv.aggiungiFeedback(this.feedback)
    this.CheckFeedbackGiaLasciato()

  }

  CheckFeedbackGiaLasciato(): boolean {
    let id_utente_sessione = this.sessioneSrv.returnIdByJson(localStorage.getItem("geocacher"))
    return this.feedbackSrv.isFeedbackLasciato(id_utente_sessione, this.cache.id)
  }

  ApriTuttiFeedback() {
    this.listaFeedbackCache = this.feedbackSrv.getListaFeedbackPerCache(this.cache.id)
  }

}




