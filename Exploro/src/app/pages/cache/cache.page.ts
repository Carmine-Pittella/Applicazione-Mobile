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
  difficoltaSelezionata = 0;
  searchbarText: string = ""

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
    this.searchbarText = event.target.value
  }

  ScegliCache(cache: Cache) {
    this.router.navigateByUrl("/cache/dettagli-cache?idCache=" + cache.id);
  }

  onCheckboxChange(event: any, valore: number) {
    this.listaCacheFiltrate = [...this.listaCache]
    if (event.detail.checked) {
      this.difficoltaSelezionata = valore;
    } else {
      this.difficoltaSelezionata = 0;
    }
    if (this.difficoltaSelezionata != 0) {
      this.listaCacheFiltrate = this.listaCacheFiltrate.filter(c => c.difficolta === this.difficoltaSelezionata);
    }
    else {
      this.FiltraRisultati(this.searchbarText)
    }
  }
}
