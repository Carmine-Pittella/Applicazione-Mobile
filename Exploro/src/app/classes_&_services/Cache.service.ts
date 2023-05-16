import { Injectable } from '@angular/core';
import { Cache } from './Cache';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  CacheList: Cache[] = [
    {
      id: 1,
      nome: 'cac',
      descrizione: 'Questa è la descrizione della cache numero 1 bla bla',
      latitudine: 42.351985,
      longitudine: 13.399413,
      difficolta: 1,
      statoApprovazione: true,
      parolaOrdine: "antani"
    },
    {
      id: 2,
      nome: 'cach',
      descrizione: 'Questa è la descrizione della cache numero 2 bla bla',
      latitudine: 42.357346,
      longitudine: 13.419150,
      difficolta: 2,
      statoApprovazione: true,
      parolaOrdine: "antani1"
    },
    {
      id: 3,
      nome: 'cache',
      descrizione: 'Questa è la descrizione della cache numero 3 bla bla',
      latitudine: 42.350626,
      longitudine: 13.416250,
      difficolta: 3,
      statoApprovazione: true,
      parolaOrdine: "antani2"
    },
    {
      id: 4,
      nome: 'cache1',
      descrizione: 'Questa è la descrizione della cache numero 4 bla bla',
      latitudine: 42.360626,
      longitudine: 13.416750,
      difficolta: 1,
      statoApprovazione: true,
      parolaOrdine: "antani3"
    },
    {
      id: 5,
      nome: 'cache2',
      descrizione: 'Questa è la descrizione della cache numero 5 bla bla',
      latitudine: 42.450626,
      longitudine: 13.416250,
      difficolta: 2,
      statoApprovazione: true,
      parolaOrdine: "antani4"
    }


  ];
  findIdByCache(c:Cache){
    return c.id;
  }
  getAllCache(): Cache[] {
    return [...this.CacheList];
  }

  getAllCacheApprovate(): Cache[] {
    let c: Cache[] = this.CacheList.filter(c => c.statoApprovazione === true);
    return [...c];
  }

  findCacheById(i: number): Cache {
    let c: Cache[] = this.CacheList.filter(c => c.id === i);
    return c[0];
  }

  getCacheFiltered(Fnome: string, Fdifficolta: number, Fdistanza: number): Cache[] {
    let cacheFiltrate: Cache[] = []
    for (let cache of this.CacheList) {
      if (cache.statoApprovazione === true &&
        (Fnome === "" || cache.nome.toLowerCase().includes(Fnome.toLowerCase())) &&
        (Fdifficolta === 0 || cache.difficolta === Fdifficolta) &&
        (Fdistanza === 0 || this.CalcolaDistanza(cache.latitudine, cache.longitudine, "miaPosizione") <= Fdistanza)) {
        cacheFiltrate.push(cache)
      }
    }
    return [...cacheFiltrate]
  }


  private CalcolaDistanza(lat: number, long: number, miaPosizione: any): number {
    return 0
  }

  constructor() { }
}
