import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cache } from 'src/app/classes_&_services/Cache';
import { CacheService } from 'src/app/classes_&_services/Cache.service';
import { Geocacher } from 'src/app/classes_&_services/Geocacher';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';
import { Utils } from 'src/app/classes_&_services/Utils';

@Component({
  selector: 'app-scheda-utente',
  templateUrl: './scheda-utente.page.html',
  styleUrls: ['./scheda-utente.page.scss'],
})
export class SchedaUtentePage implements OnInit {
  utente: Geocacher = new Geocacher
  util: Utils = new Utils
  listaCacheUtente: Cache[]

  constructor(private router: Router, private geocacherService: GeocacherService, private cacheSrv: CacheService) {
  }

  ngOnInit() {
    this.listaCacheUtente = []
    const idUtente = parseInt(this.router.getCurrentNavigation()?.finalUrl?.queryParams['idUtente']);
    this.utente = this.geocacherService.findGeocacherById(idUtente);
    const listaCacheID = this.utente.cacheTrovate;
    this.listaCacheUtente = listaCacheID.map(cacheId => this.cacheSrv.findCacheById(cacheId));
  }
}
