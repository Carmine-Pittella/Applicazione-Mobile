import { Component, OnInit } from '@angular/core';
import { Geocacher } from 'src/app/classes_&_services/Geocacher';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';
import { SessioneService } from 'src/app/classes_&_services/Sessione.service';
import { Utils } from 'src/app/classes_&_services/Utils';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {
  geocacher: Geocacher = new Geocacher();
  nome: string
  util: Utils

  constructor(private geocacherSrv: GeocacherService, private s: SessioneService) { }

  ngOnInit() {
    this.geocacher = this.geocacherSrv.findGeocacherById(this.s.getIdUtente())
  }


  formatDate(dateString: Date) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }


}
