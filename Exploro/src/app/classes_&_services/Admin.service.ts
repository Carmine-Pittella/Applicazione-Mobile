import { Injectable } from '@angular/core';
import { Admin } from './Admin';
import { CacheService } from './Cache.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  adminList: Admin[] = [
    {
      id: -1,
      nome: 'Fabrizio',
      cognome: 'Paglia',
      username: 'fabri314',
      password: 'fabri314',
      mail: 'fabriPaglia@gmail.com',
      cellulare: 3665905874,
      dataDiNascita: new Date('2000/03/09'),
      livello: 10,
      puntiExp: 99,
    },
  ];

  constructor(private cacheSrv: CacheService) { }

  findAdminByUsrPsw(usr: string, psw: string): Admin {
    let g: Admin[] = this.adminList.filter(u => u.username === usr);
    let g2: Admin[] = g.filter(u => u.password === psw);
    return g2[0];
  }

  AccettaRichiesteCache(lista_id_cache: number[]) {
    for (let i = 0; i < lista_id_cache.length; i++) {
      this.cacheSrv.findCacheById(lista_id_cache[i]).statoApprovazione = true
    }
  }

  RifiutaRichiesteCache(lista_id_cache: number[]) {
    console.log("prima di cancellare (allCache):" + this.cacheSrv.getAllCache())
    this.cacheSrv.RifiutaRichiesteCache(lista_id_cache)
    console.log("dopo aver cancellato (allCache):" + this.cacheSrv.getAllCache())
  }



}
