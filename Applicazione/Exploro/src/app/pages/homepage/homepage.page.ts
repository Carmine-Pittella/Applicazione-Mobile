import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Cache } from 'src/app/classes_&_services/Cache';
import { CacheService } from 'src/app/classes_&_services/Cache.service';
import { Geolocation } from '@capacitor/geolocation';
import { ElementRef } from '@angular/core';
import { DataService } from 'src/app/classes_&_services/data.service';
import { Renderer2 } from '@angular/core';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { Subscription } from 'rxjs';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';
import { SessioneService } from 'src/app/classes_&_services/Sessione.service';
import { RichiestaAmicizia } from 'src/app/classes_&_services/RichiestaAmicizia';
import { RichiestaAmiciziaService } from 'src/app/classes_&_services/RichiestaAmicizia.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit, AfterViewInit, OnDestroy, ViewWillEnter {
  difficoltaSelezionata: number
  private mappa = new BehaviorSubject<any>([]); ///MAPPA
  @ViewChild('map') mapElementRef: ElementRef; ///MAPPA
  dirRender: any ///MAPPA
  sub: Subscription ///MAPPA
  numeroNot = 0;
  listaRichieste: RichiestaAmicizia[] = [];

  listaCache: Cache[] = [];
  filtri: string;
  arrayDistanze: string[] = [];

  constructor(private cacheSrv: CacheService, private d: DataService,
    private richiestaSrv: RichiestaAmiciziaService,
    private reneder: Renderer2, //MAP
    private geocacherSrv: GeocacherService, //MAP
    private sessioneSrv: SessioneService //MAP
  ) { }

  ngOnInit() {
    this.listaCache = this.cacheSrv.getAllCacheApprovate();
    this.listaRichieste = this.richiestaSrv.getListaRichiesteParameter(0, this.sessioneSrv.returnIdByJson(localStorage.getItem("geocacher")));
    this.numeroNot = this.listaRichieste.length;
    let el = document.getElementById("badgeNotifiche");
    if (el !== null) {
      if (this.numeroNot !== 0) {
        el.innerHTML = this.numeroNot.toString()
      } else {
        el.style.display = "none"
      }
    }

  }
  ionViewWillEnter() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.listaCache = this.cacheSrv.getAllCacheApprovate()
    Geolocation.getCurrentPosition().then(p => {
      this.getGoogleMaps().then(googleMaps => {
        const mapEl = this.mapElementRef.nativeElement;
        const map = new googleMaps.Map(mapEl, {
          center: { lat: p.coords.latitude, lng: p.coords.longitude },
          zoom: 15
        });

        this.mappa.next(map);
        this.sub = this.mappa.pipe().subscribe((u: any) => {
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

  //////////////////////////// FOR MAP //////////////////////////
  ngAfterViewInit(): void {

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
    let arr: Cache[] = this.listaCache;
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
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  // utilizzato sia per tracciare la rotta sia per aggiornare i marker in base ai filtri
  // tutte le cache lt = -10000
  // solo cache trovate = -10001
  //solo cache non trovate = -10002
  calculateAndDisplayRoute(lt: number, lg: number) {
    Geolocation.getCurrentPosition().then(p => {
      this.getGoogleMaps().then(googleMaps => {
        const mapEl = this.mapElementRef.nativeElement;
        const map = new googleMaps.Map(mapEl, {
          center: { lat: p.coords.latitude, lng: p.coords.longitude },
          zoom: 15
        });
        if (this.sub) {
          this.sub.unsubscribe();
        }
        this.mappa = new BehaviorSubject<any>([]);
        this.mappa.next(map);
        this.mappa.pipe().subscribe((u: any) => {
          googleMaps.event.addListenerOnce(u, 'idle', () => {
            this.reneder.addClass(mapEl, 'visible');
          });
          let directionsRenderer = new googleMaps.DirectionsRenderer();
          directionsRenderer.setMap(u);

          // tutte le cache lt = -10000
          // solo cache trovate = -10001
          //solo cache non trovate = -10002
          if (lt === -10000 || lt === -10001 || lt === -10002) {
            if (lt === -10000) {
              this.listaCache = this.cacheSrv.getAllCacheApprovate();
            } if (lt === -10001) {
              let arrIdCache = this.geocacherSrv.findcacheTrovateByIdUtente(this.sessioneSrv.returnIdByJson(localStorage.getItem("geocacher")));
              console.log(arrIdCache);
              let arrC: Cache[] = [];
              for (let y = 0; y < arrIdCache.length; y++) {

                arrC.push(this.cacheSrv.findCacheById(arrIdCache[y]));
              }
              this.listaCache = [...arrC];
            } if (lt === -10002) {
              this.listaCache =
                this.geocacherSrv.findAllCacheNonTrovateByIDUtente(this.sessioneSrv.returnIdByJson(localStorage.getItem("geocacher")), this.cacheSrv.getAllCacheApprovate())
            }
          } else {
            let directionsService = new googleMaps.DirectionsService();
            directionsService
              .route({
                origin: { lat: p.coords.latitude, lng: p.coords.longitude },
                destination: { lat: lt, lng: lg },
                travelMode: googleMaps.TravelMode.DRIVING,
              })
              .then((response: any) => {
                directionsRenderer.setDirections(response);
              })
              .catch((e: any) => window.alert("Directions request failed due to" + e));
          }

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

  /*****************************************/
  Filtri(event: any) {
    this.listaCache = this.cacheSrv.getCacheFiltered(event.target.value, 0, 0)
  }
  completamentoDatiDistanze() {
    for (let f = 0; f < this.listaCache.length; f++) {
      this.d.calculateDistRoute(this.d.google.gmp, this.listaCache[f].latitudine, this.listaCache[f].longitudine).
        then((w: any) => {
          this.arrayDistanze.push(w)
        });
    }
    for (let f = 0; f < this.arrayDistanze.length; f++) {
    }
  }
  // Selezione Checkbox
  onCheckboxChange(event: any, valore: number) {
    if (event.detail.checked) {
      this.difficoltaSelezionata = valore;
    } else {
      this.difficoltaSelezionata = 0;
    }
    if (this.difficoltaSelezionata != 0) {
      this.calculateAndDisplayRoute(-10000 - (valore - 1), 0);
    }
  }
  /*****************************************/
}





