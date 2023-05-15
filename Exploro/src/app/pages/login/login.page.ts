import { Component, OnInit } from '@angular/core';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';
import { Router } from '@angular/router';
import { Geocacher } from 'src/app/classes_&_services/Geocacher';
import { SessioneService } from 'src/app/classes_&_services/Sessione.service';
import { AdminService } from 'src/app/classes_&_services/Admin.service';


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

  Login() {
    let g: Geocacher;
    if (this.geocacherSrv.findUtenteByUsrPsw(this.username, this.password) === undefined) {
      if (this.adminSrv.findAdminByUsrPsw(this.username, this.password) === undefined) {
        this.labelErrore = "Username o password errati !"
      } else {
        this.s.setIdUtente(this.adminSrv.findAdminByUsrPsw(this.username, this.password).id);
        this.router.navigate(['/homepage']);
      }
    } else {
      this.labelErrore = "Username o password errati !"
      g = this.geocacherSrv.findUtenteByUsrPsw(this.username, this.password);
      this.s.setIdUtente(g.id);
      this.s.setListaAmiciPerID(g.amiciList);
      this.s.setCachePrefPerID(g.cachePref);
      this.router.navigate(['/homepage']);
    }
  }
}
