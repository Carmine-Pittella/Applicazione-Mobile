import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertController, AlertInput, IonInput } from '@ionic/angular';
import { Geocacher } from 'src/app/classes_&_services/Geocacher';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';
import { SessioneService } from 'src/app/classes_&_services/Sessione.service';

@Component({
  selector: 'app-modifica-dati',
  templateUrl: './modifica-dati.page.html',
  styleUrls: ['./modifica-dati.page.scss'],
})
export class ModificaDatiPage implements OnInit {
  geocacher: Geocacher = new Geocacher
  nuoviDati: Geocacher = new Geocacher
  confermaNuovaPassword: string
  isAlertOpen = false;
  public alertButtons = ['OK'];

  constructor(private geocacherSrv: GeocacherService, private s: SessioneService, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.geocacher = this.geocacherSrv.findGeocacherById(this.s.getIdUtente())
    this.nuoviDati = { ...this.geocacher };
    this.confermaNuovaPassword = this.nuoviDati.password
  }

  async Conferma(form: NgForm) {
    if (form.value.password != form.value.confermaNuovaPassword) {
      // le password non corrispondono LABEL
      return
    }
    if (form.value.password != this.geocacher.password) {
      const alert = await this.alertController.create({
        header: 'Inserisci la vecchia password per confermare',
        inputs: [
          {
            name: 'vecchiaPassword',
            type: 'password',
            placeholder: 'Vecchia password:'
          }
        ],
        buttons: [
          {
            text: 'Annulla',
            role: 'cancel'
          },
          {
            text: 'OK',
            handler: (data) => {
              if (data.vecchiaPassword != this.geocacher.password) {
                this.isAlertOpen = true
                return
              }
            }
          }
        ]
      });
      await alert.present();
      this.isAlertOpen = false
    }
    this.geocacherSrv.updateGeocacherByIdUtente(this.geocacher.id - 1, this.nuoviDati)
    this.router.navigate(["/profilo"])
  }

}





