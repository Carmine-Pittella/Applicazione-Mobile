import { Component, OnInit } from '@angular/core';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';
import { Router } from '@angular/router';
import { Geocacher } from 'src/app/classes_&_services/Geocacher';
import { SessioneService } from 'src/app/classes_&_services/Sessione.service';
import { AdminService } from 'src/app/classes_&_services/Admin.service';
import { NgForm } from '@angular/forms';
import { Admin } from 'src/app/classes_&_services/Admin';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';
  labelErrore: string = '';

  constructor(private geocacherSrv: GeocacherService,
    private router: Router,
    private s: SessioneService,
    private adminSrv: AdminService) { }

  ngOnInit() { }

  Login(form: NgForm) {

    let g: Geocacher;
    if (this.geocacherSrv.findUtenteByUsrPsw(this.username, this.password) === undefined) {
      if (this.adminSrv.findAdminByUsrPsw(this.username, this.password) === undefined) {
        this.labelErrore = "Username o password errati !"
      } else {
        let a:Admin = this.adminSrv.findAdminByUsrPsw(this.username, this.password);
        localStorage.setItem("geocacher",JSON.stringify(a));
        this.labelErrore = ""
        this.router.navigate(['/admin']);
        form.reset()
      }
    } else {
      g = this.geocacherSrv.findUtenteByUsrPsw(this.username, this.password);
      //prova per parametri di sessione da modificare
      localStorage.setItem("geocacher",JSON.stringify(g));
      /////////////////////////////////////////////////
      this.labelErrore = ""
      this.router.navigate(['/homepage']);
      form.reset()
    }
  }
}
