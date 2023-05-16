import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cache } from 'src/app/classes_&_services/Cache';
import { CacheService } from 'src/app/classes_&_services/Cache.service';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';
import { SessioneService } from 'src/app/classes_&_services/Sessione.service';

@Component({
  selector: 'app-dettagli-cache',
  templateUrl: './dettagli-cache.page.html',
  styleUrls: ['./dettagli-cache.page.scss'],
})
export class DettagliCachePage implements OnInit {
  cache: Cache = new Cache
  cacheTrovata: boolean = true


  constructor(private router: Router, private cacheService: CacheService, private sessioneService: SessioneService, private utenteService: GeocacherService) { }

  ngOnInit() {
    let idCache = parseInt(this.router.getCurrentNavigation()?.finalUrl?.queryParams['idCache'])
    this.cache = this.cacheService.findCacheById(idCache)

    if (this.utenteService.findGeocacherById(this.sessioneService.getIdUtente()).cacheTrovate.includes(this.cache.id)) {
      console.log("si")
      this.cacheTrovata = true
    } else {
      console.log("no")
      this.cacheTrovata = false
    }

    // if()
  }

}
