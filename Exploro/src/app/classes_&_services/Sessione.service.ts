import { Injectable } from '@angular/core';
import { Sessione } from './Sessione';

@Injectable({
  providedIn: 'root',
})
export class SessioneService {
  s: Sessione = {
    idUtente: 2, //per il momento ho messo l'id di Carmine perché cosi ogni volta che salvo non devo rifare il login
    cachePrefPerID: [],
    listaAmiciPerID: []
  };
  setIdUtente(i: number): void {
    this.s.idUtente = i;
  };
  setCachePrefPerID(i: number[]): void {
    this.s.cachePrefPerID = i;
  };
  setListaAmiciPerID(i: number[]): void {
    this.s.listaAmiciPerID = i;
  }
  getIdUtente(): number {
    return this.s.idUtente;
  }
  getCachePrefPerID(): number[] {
    return [...this.s.cachePrefPerID];
  }
  getListaAmiciPerID(): number[] {
    return [...this.s.listaAmiciPerID];
  }

  constructor() { }
}
