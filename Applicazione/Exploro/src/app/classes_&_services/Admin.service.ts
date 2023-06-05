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
      username: 'fabri314',
      password: 'fabri314',
    },
  ];

  constructor(private cacheSrv: CacheService) { }

  addAdmin(usr: string, psw: string): boolean {
    if (this.findAdminByUsrPsw(usr, psw) === undefined) {
      let newAdmin = new Admin()
      newAdmin.id = this.adminList[this.adminList.length - 1].id - 1
      newAdmin.username = usr
      newAdmin.password = psw
      this.adminList.push(newAdmin)
      return true
    }
    return false
  }

  findAdminByUsrPsw(usr: string, psw: string): Admin {
    return this.adminList.find(u => u.username === usr && u.password === psw)!;
  }

  AccettaRichiesteCache(lista_id_cache: number[]) {
    for (let i = 0; i < lista_id_cache.length; i++) {
      this.cacheSrv.findCacheById(lista_id_cache[i]).statoApprovazione = true
    }
  }

  RifiutaRichiesteCache(lista_id_cache: number[]) {
    this.cacheSrv.RifiutaRichiesteCache(lista_id_cache)
  }



}
