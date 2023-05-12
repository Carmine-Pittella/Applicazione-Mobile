import { Injectable } from '@angular/core';
import { Cache } from './Cache';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  CacheList: Cache[] = [
    {
      id: 1,
      nome: 'cache1',
      descrizione: 'Questa è la descrizione della cache numero 1 bla bla',
      latitudine: 42.351985,
      longitudine: 13.399413,
      difficoltà: 1,
      statoApprovazione: true,
      parolaOrdine: "antani"
    },
    {
      id: 2,
      nome: 'cache2',
      descrizione: 'Questa è la descrizione della cache numero 2 bla bla',
      latitudine: 42.357346,
      longitudine: 13.419150,
      difficoltà: 2,
      statoApprovazione: true,
      parolaOrdine: "antani1"
    },
    {
      id: 3,
      nome: 'cache3',
      descrizione: 'Questa è la descrizione della cache numero 3 bla bla',
      latitudine: 42.350626,
      longitudine: 13.416250,
      difficoltà: 3,
      statoApprovazione: true,
      parolaOrdine: "antani2"
    },
    {
      id: 4,
      nome: 'cache4',
      descrizione: 'Questa è la descrizione della cache numero 4 bla bla',
      latitudine: 42.360626,
      longitudine: 13.416750,
      difficoltà: 1,
      statoApprovazione: true,
      parolaOrdine: "antani3"
    },
    {
      id: 5,
      nome: 'cache5',
      descrizione: 'Questa è la descrizione della cache numero 5 bla bla',
      latitudine: 42.450626,
      longitudine: 13.416250,
      difficoltà: 2,
      statoApprovazione: true,
      parolaOrdine: "antani4"
    }
  ];
  getAllCache(): Cache[] {
    return [...this.CacheList];
  }
  findCacheById(i: number): Cache {
    let c: Cache[] = this.CacheList.filter(c => c.id === i);
    return c[0];
  }

  constructor() { }
}
