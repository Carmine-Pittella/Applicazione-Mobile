import { Component, OnInit } from '@angular/core';
import { Cache } from 'src/app/classes_&_services/Cache';
import { CacheService } from 'src/app/classes_&_services/Cache.service';
import { Input } from '@angular/core';
import { MapComponent } from 'src/app/component/map/map.component';
import { SessioneService } from 'src/app/classes_&_services/Sessione.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ComponentFactoryResolver } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { DataService } from 'src/app/classes_&_services/data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  listaCache: Cache[] = [];
  filtri: string;
  arrayDistanze: string[]=[];

  constructor(private cacheSrv: CacheService,
    private router: Router,
    private navController:NavController,
    private componentFactoryResolver: ComponentFactoryResolver,
    private d:DataService,
    private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.listaCache = this.cacheSrv.getAllCacheApprovate();

  }

  Filtri(event: any) {
    this.listaCache = this.cacheSrv.getCacheFiltered(event.target.value, 0, 0)
  }
  completamentoDatiDistanze(){
    for(let f=0;f<this.listaCache.length;f++){
      this.d.calculateDistRoute(this.d.google.gmp,this.listaCache[f].latitudine,this.listaCache[f].longitudine).
        then((w:any)=>{
          this.arrayDistanze.push(w)});
    }
    for(let f=0;f<this.arrayDistanze.length;f++){
      console.log(this.arrayDistanze[f]);
    }
  }
  tracciaPercorso(latitude:number,longitude:number){
    console.log("sjhdbclsncdolsidc");
    this.d.setTracciato(latitude,longitude);
    console.log(this.d.tracciato.lat);
    console.log(this.d.tracciato.lng);
   // devo ricaricare il component map o l'intera pagina ma non ci riesco. BESTIAAAAAA!
  }

  // SERVE IN UN SECONDO MOMENTO
  pinFormatter(value: number) {
    return `${value} km`;
  }
}
