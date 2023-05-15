import { AfterViewInit, Component, Injectable, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Admin } from 'src/app/classes_&_services/Admin';
import { CacheService } from 'src/app/classes_&_services/Cache.service';
import { Cache } from 'src/app/classes_&_services/Cache';
import { Geolocation } from '@capacitor/geolocation';
import { DataService } from 'src/app/classes_&_services/data.service';
import { Observable } from 'rxjs';





@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('map') mapElementRef: ElementRef;

  constructor(private reneder: Renderer2, private cacheSrv: CacheService, private d: DataService) { }

  mappa: any;
  dirRender: any

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    Geolocation.getCurrentPosition().then(p => {
      this.getGoogleMaps().then(googleMaps => {
        const mapEl = this.mapElementRef.nativeElement;
        const map = new googleMaps.Map(mapEl, {
          center: { lat: p.coords.latitude, lng: p.coords.longitude },
          zoom: 15
        });
        this.mappa = new Observable((subscribe) => {
          subscribe.next(map);
        });
        console.log("primaObs");
        console.log(this.mappa);
        console.log("dopoObs");
        googleMaps.event.addListenerOnce(map, 'idle', () => {
          this.reneder.addClass(mapEl, 'visible');
        });


        let directionsRenderer = new googleMaps.DirectionsRenderer();
        this.d.setGoogle(p.coords.latitude, p.coords.longitude, map, directionsRenderer, googleMaps);
        directionsRenderer.setMap(map);
        if (this.d.tracciato === undefined) {
        } else {
          directionsRenderer =
            this.calculateAndDisplayRoute(googleMaps, this.d.tracciato.lat, this.d.tracciato.lng, directionsRenderer, p.coords.latitude, p.coords.longitude);
          console.log(directionsRenderer);
        }

        //markers
        const features = this.buildFeatures(googleMaps);
        for (let i = 0; i < features.length; i++) {
          const marker = new googleMaps.Marker({
            position: features[i].position,
            icon: this.buildSVGMArker(googleMaps, features[i]),
            title: "ciao",
            map: map,
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
            map.setZoom(18);
            map.setCenter(marker.getPosition());
            infowindow.open({
              anchor: marker, map,
            });
          });
        }
        //marker  per la posizione attuale
        let markerPosition = new googleMaps.Marker({
          position: new googleMaps.LatLng(p.coords.latitude, p.coords.longitude),
          title: "position",
          map: map,
        });
        //

      }).catch(err => {
        console.log(err)
      });
    });

  }


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
  calculateAndDisplayRoute(
    googleMaps: any,
    lt: number,
    lg: number,
    directionsRenderer: any,
    partenzaL: number,
    partenzaLg: number
  ): any {
    let directionsService = new googleMaps.DirectionsService();
    let antani = undefined;

    directionsService
      .route({
        origin: { lat: partenzaL, lng: partenzaLg },
        destination: { lat: lt, lng: lg },
        travelMode: googleMaps.TravelMode.DRIVING,
      })
      .then((response: any) => {
        directionsRenderer.setDirections(response);
        antani = response;
        // console.log(response.routes[0].legs[0].distance); {text: '607 km', value: 606599} esempio di risposta
      })
      .catch((e: any) => window.alert("Directions request failed due to" + e));
    return directionsRenderer;
  }





}

