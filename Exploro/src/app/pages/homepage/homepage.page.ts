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


  constructor(private cacheSrv: CacheService) { }

  ngOnInit() {
    this.listaCache = this.cacheSrv.getAllCacheApprovate()
    console.log(this.listaCache)
  }

  searchBar(event: any) {
    console.log(event)
  }





  // SERVE IN UN SECONDO MOMENTO
  // pinFormatter(value: number) {
  //   return `${value}%`;
  // }
}
