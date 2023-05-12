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
  util: Utils = new Utils

  constructor(private geocacherSrv: GeocacherService, private s: SessioneService) { }

  ngOnInit() {
    this.geocacher = this.geocacherSrv.findGeocacherById(this.s.getIdUtente())
  }
}
