import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Geocacher } from 'src/app/classes_&_services/Geocacher';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';
import { Utils } from 'src/app/classes_&_services/Utils';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  formValue = {
    nome: '',
    cognome: '',
    dataDiNascita: '',
    cellulare: '',
    mail: '',
    username: '',
    password: '',
    confermaPassword: ''
  };
  isAlertOpen = false;
  public alertButtons = [{
    text: 'OK',
    handler: () => {
      this.isAlertOpen = false;
    }
  }];
  headerAlert: string = ""
  messageAlert: string = ""
  util: Utils = new Utils

  constructor(private alertController: AlertController, private geocacherService: GeocacherService, private router: Router) { }

  ngOnInit() { }

  async Conferma(form: NgForm) {

    if (this.util.formatDate(form.value.dataDiNascita) === undefined) {
      this.headerAlert = "La data inserita non è corretta"
      this.isAlertOpen = true
      return
    }

    if (!/^\d+$/.test(form.value.cellulare)) {
      this.headerAlert = "Il numero di cellulare non è corretto"
      this.isAlertOpen = true
      return
    }
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegEx.test(form.value.mail)) {
      this.headerAlert = "La mail inserita non è corretta"
      this.isAlertOpen = true
      return
    }
    if (this.geocacherService.findUtenteByUsr(form.value.username) != undefined) {
      this.headerAlert = "Questo username non è disponibile"
      this.isAlertOpen = true
      return
    }
    if (form.value.password != form.value.confermaPassword) {
      this.headerAlert = "Le password non corrispondono"
      this.isAlertOpen = true
      return
    }
    let nuovoUtente: Geocacher = new Geocacher
    nuovoUtente.nome = form.value.nome
    nuovoUtente.cognome = form.value.cognome
    nuovoUtente.dataDiNascita = new Date(form.value.dataDiNascita)
    nuovoUtente.cellulare = parseInt(form.value.cellulare)
    nuovoUtente.mail = form.value.mail
    nuovoUtente.username = form.value.username
    nuovoUtente.password = form.value.password
    this.geocacherService.addGeocacher(nuovoUtente)

    this.router.navigate(["login"])
    form.reset()
  }
}


