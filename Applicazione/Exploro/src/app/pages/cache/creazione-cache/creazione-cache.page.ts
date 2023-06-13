import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';
import { Cache } from 'src/app/classes_&_services/Cache';
import { CacheService } from 'src/app/classes_&_services/Cache.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';
import { Directory } from '@capacitor/filesystem/dist/esm/definitions';

const IMAGE_DIR = "../../assets/foto/";
interface LocalFile {
  name: string,
  path: string,
  data: string
}

@Component({
  selector: 'app-creazione-cache',
  templateUrl: './creazione-cache.page.html',
  styleUrls: ['./creazione-cache.page.scss'],
})
export class CreazioneCachePage implements OnInit, AfterViewInit {

  @ViewChild('mapPicker') mapElementRef: ElementRef; //MAPPA
  private mappa = new BehaviorSubject<any>([]); //MAPPA
  markerPosition: any = undefined; //MAPPA
  selectedCoords: any = { lat: 0, lng: 0 }; //MAPPA
  sub: Subscription //MAPPA
  selectedImage: any = undefined; //PHOTO
  images: LocalFile[] = []; //PHOTO

  cacheAggiunta: Cache = { id: 0, nome: '', descrizione: '', latitudine: 0, longitudine: 0, difficolta: 1, statoApprovazione: true, parolaOrdine: "", img: "" }
  isCoordinateSelected: boolean = false

  constructor(private reneder: Renderer2, private router: Router, private cacheSrv: CacheService,
    private platform: Platform, //PHOTO
    private loadingCtrl: LoadingController //PHOTO
  ) { }

  ngOnInit() {
  }


  Conferma() {
    this.cacheAggiunta.latitudine = this.selectedCoords.lat
    this.cacheAggiunta.longitudine = this.selectedCoords.lng
    this.cacheAggiunta.statoApprovazione = false
    if (this.selectedImage === undefined) {
      this.cacheAggiunta.img = "../../assets/foto/default.png"
    } else {
      this.cacheAggiunta.img = this.selectedImage.webPath
    }
    this.cacheSrv.addCache(this.cacheAggiunta)
    this.router.navigateByUrl("cache")
  }

  SelezionaDifficolta(event: any) {
    this.cacheAggiunta.difficolta = parseInt(event.target.value)
  }

  // ALERT PER CONFERMARE L'INVIO
  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Yes',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.Conferma();
      },
    },
  ];

  // METODI PER LA MAPPA
  ngAfterViewInit() {
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
        u.addListener("click", (event: any) => {
          this.selectedCoords = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          }
          this.isCoordinateSelected = true
          this.reloadMap(this.selectedCoords.lat, this.selectedCoords.lng);
        })
      })
    }).catch(err => {
      console.log(err)
    });
  }

  private reloadMap(latitude: number, longitude: number) {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.getGoogleMaps().then(googleMaps => {
      const mapEl = this.mapElementRef.nativeElement;
      const map = new googleMaps.Map(mapEl, {
        center: { lat: latitude, lng: longitude },
        zoom: 10
      });
      this.mappa = new BehaviorSubject<any>([]);
      this.mappa.next(map);
      this.sub = this.mappa.pipe().subscribe((u: any) => {
        googleMaps.event.addListenerOnce(u, 'idle', () => {
          this.reneder.addClass(mapEl, 'visible');
        });
        this.markerPosition = new googleMaps.Marker({
          position: new googleMaps.LatLng(latitude, longitude),
          title: "position",
          map: u,
        });
        u.addListener("click", (event: any) => {
          this.selectedCoords = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          }
          console.log(this.selectedCoords);
          this.reloadMap(this.selectedCoords.lat, this.selectedCoords.lng);
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


  //////////////////////////////////////PHOTO PART //////////////////////////////////////////////////////


  isPlatformWeb(): boolean {
    if (Capacitor.getPlatform() == "web") return true;
    return false;
  }
  scattaFoto(): Promise<Photo> {
    return new Promise((resolve, reject) => {
      resolve(Camera.getPhoto({
        quality: 90,
        //allowEditing: true,
        source: CameraSource.Prompt,
        saveToGallery: true,
        resultType: this.isPlatformWeb() ? CameraResultType.DataUrl : CameraResultType.Uri
      }));
      reject("non funziona :(");

    })

  }
  scattaFoto1() {
    this.scattaFoto().then(image => {
      this.selectedImage = image;
      if (this.isPlatformWeb()) {
        this.selectedImage.webPath = image.dataUrl
      }
      else {
        //this.saveImage(image);
      }
    })
  }


}
