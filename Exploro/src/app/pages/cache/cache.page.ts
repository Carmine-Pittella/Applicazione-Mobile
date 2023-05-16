import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cache } from 'src/app/classes_&_services/Cache';
import { CacheService } from 'src/app/classes_&_services/Cache.service';

@Component({
  selector: 'app-cache',
  templateUrl: './cache.page.html',
  styleUrls: ['./cache.page.scss'],
})
export class CachePage implements OnInit {
  listaCache: Cache[] = []
  listaCacheFiltrate: Cache[] = []

  constructor(private cacheService: CacheService, private router: Router) { }

  ngOnInit() {
    this.listaCache = this.cacheService.getAllCacheApprovate()
    this.listaCacheFiltrate = [...this.listaCache]
  }

  FiltraRisultati(event: any) {
    if (event.target.value != "") {
      this.listaCacheFiltrate = this.listaCache.filter(c => c.nome.toLowerCase().includes(event.target.value.toLowerCase()));
    }
    else {
      this.listaCacheFiltrate = [...this.listaCache]
    }
  }

  ScegliCache(cache: Cache) {
    this.router.navigateByUrl("/cache/dettagli-cache?idCache=" + cache.id);
  }

}
