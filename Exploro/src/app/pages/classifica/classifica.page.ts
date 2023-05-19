import { Component, OnInit } from '@angular/core';
import { Geocacher } from 'src/app/classes_&_services/Geocacher';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';
import { SessioneService } from 'src/app/classes_&_services/Sessione.service';

@Component({
  selector: 'app-classifica',
  templateUrl: './classifica.page.html',
  styleUrls: ['./classifica.page.scss'],
})
export class ClassificaPage implements OnInit {
  listaUtenti: Geocacher[] = []
  idUtente: number


  constructor(private geocacherSrv: GeocacherService, private sessioneSrv: SessioneService) { }

  ngOnInit() {
    this.listaUtenti = [...this.geocacherSrv.getClassifica()]
    this.idUtente = this.sessioneSrv.returnIdByJson(localStorage.getItem("geocacher"))
  }

  TipoClassifica(event: any) {
    if (event.detail.value === "globale") {
      let g: Geocacher = this.listaUtenti[0]
      for (let index = 0; index < 50; index++) {
        this.listaUtenti.push(g)
      }
    }
  }

}
