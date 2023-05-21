import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ElementRef,ViewChild} from '@angular/core';
import { Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-creazione-cache',
  templateUrl: './creazione-cache.page.html',
  styleUrls: ['./creazione-cache.page.scss'],
})
export class CreazioneCachePage implements OnInit,AfterViewInit {
  @ViewChild('mapPicker') mapElementRef: ElementRef; //MAPPA
  private mappa = new BehaviorSubject<any>([]); //MAPPA
  markerPosition:any = undefined; //MAPPA
  selectedCoords:any = {lat:0,lng:0}; //MAPPA
  sub: Subscription //MAPPA
  constructor( private reneder: Renderer2) { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.getGoogleMaps().then(googleMaps => {
      const mapEl = this.mapElementRef.nativeElement;
      const map = new googleMaps.Map(mapEl, {
        center: { lat: 43, lng: 13 },
        zoom: 10
      });
      this.mappa.next(map);
      this.sub = this.mappa.pipe().subscribe((u: any) => {
        googleMaps.event.addListenerOnce(u, 'idle', () => {
          this.reneder.addClass(mapEl, 'visible');
        });
        u.addListener("click",(event:any)=>{
          this.selectedCoords = {
            lat : event.latLng.lat(),
            lng : event.latLng.lng()
          }
          console.log( this.selectedCoords);
          this.reloadMap(this.selectedCoords.lat,this.selectedCoords.lng);
        })
      })
    }).catch(err => {
      console.log(err)
    });

  }
  private reloadMap(latitude:number,longitude:number){
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.getGoogleMaps().then(googleMaps => {
      const mapEl = this.mapElementRef.nativeElement;
      const map = new googleMaps.Map(mapEl, {
        center: { lat: latitude, lng: longitude },
        zoom: 10
      });
      this.mappa=  new BehaviorSubject<any>([]);
      this.mappa.next(map);
      this.sub = this.mappa.pipe().subscribe((u: any) => {
        googleMaps.event.addListenerOnce(u, 'idle', () => {
          this.reneder.addClass(mapEl, 'visible');
        });
        this.markerPosition = new googleMaps.Marker({
          position: new googleMaps.LatLng( latitude, longitude),
          title: "position",
          map: u,
        });
        u.addListener("click",(event:any)=>{
          this.selectedCoords = {
            lat : event.latLng.lat(),
            lng : event.latLng.lng()
          }
          console.log( this.selectedCoords);
          this.reloadMap(this.selectedCoords.lat,this.selectedCoords.lng);
        })
      })
    })

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



}
