import { Component, OnInit } from '@angular/core';
import { Cache } from 'src/app/classes_&_services/Cache';
import { CacheService } from 'src/app/classes_&_services/Cache.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  listaCache: Cache[] = []
  filtri: string

  constructor(private cacheSrv: CacheService) { }

  ngOnInit() {
    this.listaCache = this.cacheSrv.getAllCacheApprovate()
  }

  Filtri(event: any) {
    this.listaCache = this.cacheSrv.getCacheFiltered(event.target.value, 0, 0)
  }
}
