import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { Cache } from 'src/app/classes_&_services/Cache';
import { CacheService } from 'src/app/classes_&_services/Cache.service';

@Component({
  selector: 'app-lista-cache',
  templateUrl: './lista-cache.page.html',
  styleUrls: ['./lista-cache.page.scss'],
})
export class ListaCachePage implements OnInit, ViewWillEnter {
  listaCache: Cache[]
  listaCacheFiltrate: Cache[]

  constructor(private cacheService: CacheService, private router: Router) { }


  ngOnInit() {
    this.listaCache = []
    this.listaCacheFiltrate = []
  }

  ionViewWillEnter(): void {
    this.listaCache = this.cacheService.getAllCache()
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

  Visualizza(id_cache: number) {
    this.router.navigateByUrl("/admin/richieste-approvazione/dettagli-cache?idCache=" + id_cache);
  }
}

