import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/classes_&_services/Admin.service';

@Component({
  selector: 'app-aggiungi-admin',
  templateUrl: './aggiungi-admin.page.html',
  styleUrls: ['./aggiungi-admin.page.scss'],
})
export class AggiungiAdminPage implements OnInit {
  labelErrore: string
  labelSuccesso: string
  username: string
  password: string
  confermaPassword: string

  constructor(private adminSrv: AdminService) { }

  ngOnInit() {
    this.labelErrore = ""
    this.labelSuccesso = ""
    this.username = ""
    this.password = ""
    this.confermaPassword = ""
  }

  AddAdmin(form: NgForm) {
    if (this.password != this.confermaPassword) {
      this.labelErrore = "Le password non corrispondono"
      this.labelSuccesso = ""
    }
    else {
      if (this.adminSrv.addAdmin(this.username, this.password)) {
        this.labelSuccesso = "Amministratore aggiunto con successo !"
        this.labelErrore = ""
      }
      else {
        this.labelErrore = "Questo username è già occupato"
        this.labelSuccesso = ""
      }
    }
    form.reset()
  }
}
