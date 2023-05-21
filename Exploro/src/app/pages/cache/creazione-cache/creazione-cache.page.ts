import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ElementRef,ViewChild} from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-creazione-cache',
  templateUrl: './creazione-cache.page.html',
  styleUrls: ['./creazione-cache.page.scss'],
})
export class CreazioneCachePage implements OnInit,AfterViewInit {
  @ViewChild('mapPicker') mapElementRef: ElementRef;
  constructor( private reneder: Renderer2) { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.getGoogleMaps().then(googleMaps => {
      const mapEl = this.mapElementRef.nativeElement;
      const map = new googleMaps.Map(mapEl, {
        center: { lat: 0, lng: 0 },
        zoom: 15
      });
      googleMaps.event.addListenerOnce(map, 'idle', () => {
        this.reneder.addClass(mapEl, 'visible');
      });
    }).catch(err => {
      console.log(err)
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

}
