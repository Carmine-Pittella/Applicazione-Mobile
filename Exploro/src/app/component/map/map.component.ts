import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent  implements OnInit,AfterViewInit {
  @ViewChild('map') mapElementRef: ElementRef;

  constructor(private reneder: Renderer2) { }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getGoogleMaps().then(googleMaps=>{
      const mapEl = this.mapElementRef.nativeElement;
      const map = new googleMaps.Map(mapEl,{
        center:{lat:42.349745 , lng: 13.399413},
        zoom:16
      });

      googleMaps.event.addListenerOnce(map,'idle',()=>{
        this.reneder.addClass(mapEl,'visible');
      });
    }).catch(err=>{
      console.log(err)
    });

  }
  private getGoogleMaps() :Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if(googleModule && googleModule.maps){
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve,reject)=>{
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBpGPMdIrPIJhD2gbDwnWKBSQscYp0EZ4E&callback=initMap';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = ()=>{
        const loadedGoogleModule = win.google;
        if(loadedGoogleModule && loadedGoogleModule.maps){
          resolve(loadedGoogleModule.maps);
        }else{
          reject('Google maps SDK not available');
        }
      };
    });
  }
}
