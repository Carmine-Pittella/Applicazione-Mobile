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
      descrizione: '',
      latitudine: 42.349745,
      longitudine: 13.399413,
      difficoltà:1,
      statoApprovazione:true
    },
    {
      id: 2,
      nome: 'cache2',
      descrizione: '',
      latitudine: 42.357346,
      longitudine:  13.419150,
      difficoltà:2,
      statoApprovazione:true
    },
    {
      id: 3,
      nome: 'cache3',
      descrizione: '',
      latitudine: 42.350626,
      longitudine: 13.416250,
      difficoltà:3,
      statoApprovazione:true
    }
  ];
  getAllCache():Cache[]{
    return[...this.CacheList];
  }

  constructor() {}
}
