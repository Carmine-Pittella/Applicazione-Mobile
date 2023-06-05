import { Injectable } from '@angular/core';
import { Cache } from './Cache';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  percorso: string = "../../assets/foto/"
  CacheList: Cache[] = [
    {
      id: 1,
      nome: 'cac',
      descrizione: 'Questa è la descrizione della cache numero 1 bla bla',
      latitudine: 42.351985,
      longitudine: 13.399413,
      difficolta: 1,
      statoApprovazione: true,
      parolaOrdine: "antani",
      img: "../../assets/foto/default.png"
    },
    {
      id: 2,
      nome: 'cach',
      descrizione: 'Questa è la descrizione della cache numero 2 bla bla',
      latitudine: 42.357346,
      longitudine: 13.419150,
      difficolta: 2,
      statoApprovazione: true,
      parolaOrdine: "antani1",
      img: "../../assets/foto/default.png"
    },
    {
      id: 3,
      nome: 'cache',
      descrizione: 'Questa è la descrizione della cache numero 3 bla bla',
      latitudine: 42.350626,
      longitudine: 13.416250,
      difficolta: 3,
      statoApprovazione: true,
      parolaOrdine: "antani2",
      img: "../../assets/foto/default.png"
    },
    {
      id: 4,
      nome: 'cache1',
      descrizione: 'Questa è la descrizione della cache numero 4 bla bla',
      latitudine: 42.360626,
      longitudine: 13.416750,
      difficolta: 1,
      statoApprovazione: true,
      parolaOrdine: "antani3",
      img: "../../assets/foto/default.png"
    },
    {
      id: 5,
      nome: 'cache2',
      descrizione: 'Questa è la descrizione della cache numero 5 bla bla',
      latitudine: 42.450626,
      longitudine: 13.416250,
      difficolta: 2,
      statoApprovazione: true,
      parolaOrdine: "antani4",
      img: "../../assets/foto/default.png"
    },
    {
      id: 6,
      nome: 'aaab',
      descrizione: 'Questa è la descrizione della cache numero 6 bla bla',
      latitudine: 42.450626,
      longitudine: 13.476250,
      difficolta: 2,
      statoApprovazione: true,
      parolaOrdine: "aaab6",
      img: "../../assets/foto/default.png"
    },
    {
      id: 7,
      nome: 'aaac',
      descrizione: 'Questa è la descrizione della cache numero 7 bla bla',
      latitudine: 42.450626,
      longitudine: 13.676250,
      difficolta: 1,
      statoApprovazione: true,
      parolaOrdine: "aaac7",
      img: "../../assets/foto/default.png"
    },
    {
      id: 8,
      nome: 'aa7b',
      descrizione: 'Questa è la descrizione della cache numero 8 bla bla',
      latitudine: 42.430726,
      longitudine: 13.476258,
      difficolta: 2,
      statoApprovazione: false,
      parolaOrdine: "aawwwer",
      img: "../../assets/foto/default.png"
    },
    {
      id: 9,
      nome: 'ca7b',
      descrizione: 'Questa è la descrizione della cache numero 9 bla bla',
      latitudine: 42.439426,
      longitudine: 13.470258,
      difficolta: 3,
      statoApprovazione: false,
      parolaOrdine: "aawqrwer",
      img: "../../assets/foto/cimitero.png"
    }
  ];

  findIdByCache(c: Cache) {
    return c.id;
  }
  getAllCache(): Cache[] {
    return [...this.CacheList];
  }
  getAllCacheApprovate(): Cache[] {
    let c: Cache[] = this.CacheList.filter(c => c.statoApprovazione === true);
    return [...c];
  }
  getAllCacheNonApprovate(): Cache[] {
    let c: Cache[] = this.CacheList.filter(c => c.statoApprovazione === false);
    return [...c];
  }
  findCacheById(i: number): Cache {
    let c: Cache[] = this.CacheList.filter(c => c.id === i);
    return c[0];
  }

  addCache(cache: Cache) {
    cache.id = this.CacheList[this.CacheList.length - 1].id + 1
    //cache.img = this.percorso + cache.img
    this.CacheList.push(cache)
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

  RifiutaRichiesteCache(lista_id_cache: number[]) {
    this.CacheList = this.CacheList.filter(cache => !lista_id_cache.includes(cache.id));
  }



  private CalcolaDistanza(lat: number, long: number, miaPosizione: any): number {
    return 0
  }

  constructor() { }
}
