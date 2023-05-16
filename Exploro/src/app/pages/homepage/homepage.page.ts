import { AfterViewInit,Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { Cache } from 'src/app/classes_&_services/Cache';
import { CacheService } from 'src/app/classes_&_services/Cache.service';
import { Geolocation } from '@capacitor/geolocation';
import { ElementRef } from '@angular/core';
import { DataService } from 'src/app/classes_&_services/data.service';
import { Renderer2 } from '@angular/core';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit, AfterViewInit,OnDestroy {

  private mappa = new BehaviorSubject<any>([]); ///MAPPA
  @ViewChild('map') mapElementRef: ElementRef; ///MAPPA
  dirRender: any ///MAPPA
  sub: Subscription ///MAPPA

  listaCache: Cache[] = [];
  filtri: string;
  arrayDistanze: string[] = [];

  constructor(private cacheSrv: CacheService,
    private d: DataService,
    private reneder: Renderer2, //MAP
    ) { }

  ngOnInit() {
    this.listaCache = this.cacheSrv.getAllCacheApprovate();

  }

 ////////////////////////////////////////// FOR MAP //////////////////////////
 ngAfterViewInit(): void {
  Geolocation.getCurrentPosition().then(p => {
    this.getGoogleMaps().then(googleMaps => {
      const mapEl = this.mapElementRef.nativeElement;
      const map = new googleMaps.Map(mapEl, {
        center: { lat: p.coords.latitude, lng: p.coords.longitude },
        zoom: 15
      });

      this.mappa.next(map);
      this.sub=this.mappa.pipe().subscribe( (u:any) =>{
        googleMaps.event.addListenerOnce(u, 'idle', () => {
          this.reneder.addClass(mapEl, 'visible');
        });
        let directionsRenderer = new googleMaps.DirectionsRenderer();
        directionsRenderer.setMap(u);
        //setting dataservice
        this.d.setGoogle(p.coords.latitude, p.coords.longitude, u, directionsRenderer, googleMaps);

        //markers
        const features = this.buildFeatures(googleMaps);
        for (let i = 0; i < features.length; i++) {
          const marker = new googleMaps.Marker({
            position: features[i].position,
            icon: this.buildSVGMArker(googleMaps, features[i]),
            title: "ciao",
            map: u,
          });
          const contentString =
            '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            '<h1 style="color:black;" id="firstHeading" class="firstHeading">' + features[i].nome + "</h1>" +
            '<div id="bodyContent">' +
            "<p style='color:black;'>" + features[i].descr + "</p>" +
            "<p style='color:black;'>" + features[i].lat + "," + features[i].long + "</p>" +
            "</div>"
          "</div>";
          const infowindow = new googleMaps.InfoWindow({
            content: contentString,
            ariaLabel: "Uluru",
          });

          marker.addListener("click", () => {
            u.setZoom(18);
            u.setCenter(marker.getPosition());
            infowindow.open({
              anchor: marker, u,
            });
          });
        }
        //marker  per la posizione attuale
        let markerPosition = new googleMaps.Marker({
          position: new googleMaps.LatLng(p.coords.latitude, p.coords.longitude),
          title: "position",
          map: u,
        });
      });
    }).catch(err => {
      console.log(err)
    });
  });

}

/////////////////////// FOR MAP METHOD //////////////////////////


private getGoogleMaps(): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBpGPMdIrPIJhD2gbDwnWKBSQscYp0EZ4E&callback=initMap';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const loadedGoogleModule = win.google;
      if (loadedGoogleModule && loadedGoogleModule.maps) {
        resolve(loadedGoogleModule.maps);
      } else {
        reject('Google maps SDK not available');
      }
    };
  });
}

buildFeatures(googleMaps: any): any[] {
  let arr: Cache[] = this.cacheSrv.getAllCache();
  let arr2: any[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].statoApprovazione) {
      arr2.push({
        position: new googleMaps.LatLng(arr[i].latitudine, arr[i].longitudine),
        type: arr[i].difficolta,
        nome: arr[i].nome,
        descr: arr[i].descrizione,
        lat: arr[i].latitudine,
        long: arr[i].longitudine
      })
    }
  }
  return [...arr2];
}
buildSVGMArker(googleMaps: any, item: any): any {
  let str: string = "";
  if (item.type === 1) { str = "green" };
  if (item.type === 2) { str = "orange" };
  if (item.type === 3) { str = "red" };
  let svgMarker = {
    path: googleMaps.SymbolPath.BACKWARD_CLOSED_ARROW,
    fillColor: str,
    fillOpacity: 0.9,
    strokeWeight: 0,
    rotation: 0,
    scale: 15,
  }
  return svgMarker;
}

ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
}


calculateAndDisplayRoute(lt: number,lg: number) {
  Geolocation.getCurrentPosition().then(p => {
    this.getGoogleMaps().then(googleMaps => {
      const mapEl = this.mapElementRef.nativeElement;
      const map = new googleMaps.Map(mapEl, {
        center: { lat: p.coords.latitude, lng: p.coords.longitude },
        zoom: 15
      });
      if(this.sub){
        this.sub.unsubscribe();
      }
      this.mappa =  new BehaviorSubject<any>([]);
      this.mappa.next(map);
      this.mappa.pipe().subscribe( (u:any) =>{
        googleMaps.event.addListenerOnce(u, 'idle', () => {
          this.reneder.addClass(mapEl, 'visible');
        });
        let directionsRenderer = new googleMaps.DirectionsRenderer();
        directionsRenderer.setMap(u);
        let directionsService = new googleMaps.DirectionsService();
        console.log("eskere1")
        directionsService
        .route({
          origin: { lat:  p.coords.latitude, lng:  p.coords.longitude},
          destination: { lat: lt, lng: lg },
          travelMode: googleMaps.TravelMode.DRIVING,
        })
        .then((response: any) => {
          directionsRenderer.setDirections(response);
          console.log("eskere2")
          // console.log(response.routes[0].legs[0].distance); {text: '607 km', value: 606599} esempio di risposta
        })
        .catch((e: any) => window.alert("Directions request failed due to" + e));
        console.log("eskere3")
        //markers
        const features = this.buildFeatures(googleMaps);
        for (let i = 0; i < features.length; i++) {
          const marker = new googleMaps.Marker({
            position: features[i].position,
            icon: this.buildSVGMArker(googleMaps, features[i]),
            title: "ciao",
            map: u,
          });
          const contentString =
            '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            '<h1 style="color:black;" id="firstHeading" class="firstHeading">' + features[i].nome + "</h1>" +
            '<div id="bodyContent">' +
            "<p style='color:black;'>" + features[i].descr + "</p>" +
            "<p style='color:black;'>" + features[i].lat + "," + features[i].long + "</p>" +
            "</div>"
          "</div>";
          const infowindow = new googleMaps.InfoWindow({
            content: contentString,
            ariaLabel: "Uluru",
          });

          marker.addListener("click", () => {
            u.setZoom(18);
            u.setCenter(marker.getPosition());
            infowindow.open({
              anchor: marker, u,
            });
          });
        }
        console.log("eskere4")
        //marker  per la posizione attuale
        let markerPosition = new googleMaps.Marker({
          position: new googleMaps.LatLng(p.coords.latitude, p.coords.longitude),
          title: "position",
          map: u,
        });
        console.log("eskere5")
      });
    }).catch(err => {
      console.log(err)
    });
  });

}



/////////////////////////////////////////////////


  Filtri(event: any) {
    this.listaCache = this.cacheSrv.getCacheFiltered(event.target.value, 0, 0)
  }

  displayCheckBox(){

  }
  completamentoDatiDistanze() {
    for (let f = 0; f < this.listaCache.length; f++) {
      this.d.calculateDistRoute(this.d.google.gmp, this.listaCache[f].latitudine, this.listaCache[f].longitudine).
        then((w: any) => {
          this.arrayDistanze.push(w)
        });
    }
    for (let f = 0; f < this.arrayDistanze.length; f++) {
      console.log(this.arrayDistanze[f]);
    }
  }

  // SERVE IN UN SECONDO MOMENTO
  pinFormatter(value: number) {
    return `${value} km`;
  }
}
/*
tracciaPercorso(latitude: number, longitude: number) {
    console.log("sjhdbclsncdolsidc");
    this.d.setTracciato(latitude, longitude);
    console.log(this.d.tracciato.lat);
    console.log(this.d.tracciato.lng);
    // devo ricaricare il component map o l'intera pagina ma non ci riesco. BESTIAAAAAA!
  }
*/
