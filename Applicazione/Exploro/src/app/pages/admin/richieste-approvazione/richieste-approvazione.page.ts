import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { AdminService } from 'src/app/classes_&_services/Admin.service';
import { Cache } from 'src/app/classes_&_services/Cache';
import { CacheService } from 'src/app/classes_&_services/Cache.service';


@Component({
  selector: 'app-richieste-approvazione',
  templateUrl: './richieste-approvazione.page.html',
  styleUrls: ['./richieste-approvazione.page.scss'],
})
export class RichiesteApprovazionePage implements OnInit, ViewWillEnter {
  richiesteApprovazione: Cache[]
  richiesteSelezionate: number[]

  constructor(private cacheSrv: CacheService, private adminSrv: AdminService, private router: Router) { }

  ngOnInit() {
    this.richiesteApprovazione = []
  }
  ionViewWillEnter(): void {
    this.richiesteApprovazione = this.cacheSrv.getAllCacheNonApprovate()
    this.richiesteSelezionate = []
  }

  Visualizza(id_cache: number) {
    this.router.navigateByUrl("/admin/richieste-approvazione/dettagli-cache?idCache=" + id_cache);
  }

  AgreeDeleteRichieste(scelta: string) {
    if (scelta === "accetta") {
      this.adminSrv.AccettaRichiesteCache(this.richiesteSelezionate)
    }
    else {
      this.adminSrv.RifiutaRichiesteCache(this.richiesteSelezionate)
    }
    this.ionViewWillEnter()
  }

  Lallero(event: any, id_cache: number) {
    if (event.detail.checked) {
      this.richiesteSelezionate.push(id_cache);
    } else {
      let index = this.richiesteSelezionate.indexOf(id_cache);
      this.richiesteSelezionate.splice(index, 1);
    }
  }



}
