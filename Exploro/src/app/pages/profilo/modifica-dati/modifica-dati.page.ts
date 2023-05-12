import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, IonInput } from '@ionic/angular';
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
  alertInputs = [{ placeholder: 'Vecchia password:' }];
  isAlertOpen = false;


  constructor(private geocacherSrv: GeocacherService, private s: SessioneService, private alertController: AlertController) { }

  ngOnInit() {
    this.geocacher = this.geocacherSrv.findGeocacherById(this.s.getIdUtente())
    this.nuoviDati = { ...this.geocacher };
    this.confermaNuovaPassword = this.nuoviDati.password
  }

  Conferma(form: NgForm) {
    // if (form.value.password != form.value.confermaNuovaPassword) {
    //   console.log("le password non corrisondono")
    //   // le password non corrisondono
    //   return
    // }
    // if (form.value.password != this.geocacher.password) {
    //   //serve confermare le modifiche

    // }

    this.isAlertOpen = true


  }


  alertButtons = [
    {
      text: "Cancel", role: "cancel", handler: () => {
        this.isAlertOpen = false;
      },
    },
    {
      text: "OK", role: "confirm", handler: () => {
        this.isAlertOpen = false;
      },
    },
  ];

}

