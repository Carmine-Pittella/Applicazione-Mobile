import { Injectable } from '@angular/core';
import { Sessione } from './Sessione';

@Injectable({
  providedIn: 'root',
})
export class SessioneService {
  s: Sessione = {
    idUtente: 2, //per il momento ho messo l'id di Carmine perché cosi ogni volta che salvo non devo rifare il login
    listaAmiciPerID: [],
  };
  setIdUtente(i: number): void {
    this.s.idUtente = i;
  };
  setListaAmiciPerID(i: number[]): void {
    this.s.listaAmiciPerID = i;
  }
  getIdUtente(): number {
    return this.s.idUtente;
  }
  getListaAmiciPerID(): number[] {
    return [...this.s.listaAmiciPerID];
  }

  google: any = {
    lat: 0,
    lng: 0,
    map: undefined,
    dirRend: undefined,
    gmp: undefined
  }
  setGoogle(l1: number, l2: number, m: any, d: any, g: any) {
    this.google = {
      lat: l1,
      lng: l2,
      map: m,
      dirRend: d,
      gmp: g
    }
  }
  getGoogle() {
    return this.google;
  }
  calculateDistRoute(googleMaps: any, lt: number, lg: number): any {
    let directionsService = new googleMaps.DirectionsService();
    const t = directionsService
      .route({
        origin: { lat: this.google.lat, lng: this.google.lng },
        destination: { lat: lt, lng: lg },
        travelMode: googleMaps.TravelMode.DRIVING,
      })
      .then((response: any) => {
        return response.routes[0].legs[0].distance.text;
        // console.log(response.routes[0].legs[0].distance); {text: '607 km', value: 606599} esempio di risposta
      })
    for (; t === undefined;) {
    }
    return t;
  }
  tracciato: any = undefined;
  setTracciato(x: number, y: number) {
    this.tracciato = {
      lat: x,
      lng: y
    };
  }
  delTracciato() {
    this.tracciato = undefined;
  }
  getTracciato() {
    return this.tracciato;
  }

  constructor() { }
}
