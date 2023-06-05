import { Injectable } from '@angular/core';
import { Geocacher } from './Geocacher';

@Injectable({
  providedIn: 'root',
})
export class SessioneService {

  returnIdByJson(jsonString: any): number {
    let v: any = JSON.parse(jsonString);
    return v.id;
  }
  returnListaAmiciByJson(jsonString: any): number[] {
    let v: Geocacher = JSON.parse(jsonString);
    return [...v.amiciList];
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
