import { Component, OnInit } from '@angular/core';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';
import { Router } from '@angular/router';
import { Geocacher } from 'src/app/classes_&_services/Geocacher';
import { SessioneService } from 'src/app/classes_&_services/Sessione.service';
import { AdminService } from 'src/app/classes_&_services/Admin.service';


// const users = {
//   data: [{ status: "active", age: 14 }, { status: "inactive", age: 7 }, { status: "active", age: 44 }]
// }


// const observable = new Observable((subscribe) => {
//   subscribe.next(users);
// }).pipe(
//   map((value: any) => {
//     return value.data;
//   }),
//   map((value: any) => {
//     return value.filter((u: any) => u.status === "active");
//   }),
//   map((value: any) => {
//     console.log(" questo è l'array filtrato:", value);
//     return value;
//   })
// )
// const observer: any = {
//   next: (value: number): void => {
//     console.log("questo è il valore", value);
//   },
//   error: (err: string): void => {
//     console.log("tipo errore:" + err);
//   },
//   complete: () => {
//     console.log("complete");
//   }
// };
// observable.subscribe(observer);
// //per collegare l'observable all'observer


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userName: string ='';
  password: string='';

  constructor(private geocacherSrv : GeocacherService,
              private router: Router,
              private s: SessioneService,
              private adminSrv: AdminService) { }

  ngOnInit() { }

  Login() {
    let g:Geocacher;
    if (this.geocacherSrv.findUtenteByUsrPsw(this.userName,this.password)===undefined){
      if (this.adminSrv.findAdminByUsrPsw(this.userName,this.password)===undefined){
        //utente non trovato, stampa messaggio di errore
      }else{
        this.s.setIdUtente(this.adminSrv.findAdminByUsrPsw(this.userName,this.password).id);
        this.router.navigate(['/homepage']);
      }
    }else{
      g=this.geocacherSrv.findUtenteByUsrPsw(this.userName,this.password);
      this.s.setIdUtente(g.id);
      this.s.setListaAmiciPerID(g.amiciList);
      this.s.setCachePrefPerID(g.cachePref);
      this.router.navigate(['/homepage']);
    }

  }
}
