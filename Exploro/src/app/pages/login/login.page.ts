import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';


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

  email: string
  password: string

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() { }

  Login() {
    console.log("Email: " + this.email + "  Password: " + this.password)
    this.router.navigate(['/homepage']);
  }
}
