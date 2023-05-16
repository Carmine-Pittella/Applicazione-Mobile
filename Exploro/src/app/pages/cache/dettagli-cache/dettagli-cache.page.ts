import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cache } from 'src/app/classes_&_services/Cache';
import { CacheService } from 'src/app/classes_&_services/Cache.service';

@Component({
  selector: 'app-dettagli-cache',
  templateUrl: './dettagli-cache.page.html',
  styleUrls: ['./dettagli-cache.page.scss'],
})
export class DettagliCachePage implements OnInit {
  cache: Cache = new Cache

  constructor(private router: Router, private cacheService: CacheService) { }

  ngOnInit() {
    let idCache = parseInt(this.router.getCurrentNavigation()?.finalUrl?.queryParams['idCache'])
    this.cache = this.cacheService.findCacheById(idCache)
  }

}
