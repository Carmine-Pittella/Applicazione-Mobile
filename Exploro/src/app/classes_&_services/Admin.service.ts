import { Injectable } from '@angular/core';
import { Admin } from './Admin';
import { Sessione } from './Sessione';
import { Geocacher } from './Geocacher';

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

  utenteMemorizzato: number
  cacheMemorizzata: number

  findAdminByUsrPsw(usr: string, psw: string): Admin {
    let g: Admin[] = this.adminList.filter(u => u.username === usr);
    let g2: Admin[] = g.filter(u => u.password === psw);
    return g2[0];
  }

  // l'admin ne ha bisogno per passare da una schermata all'altra memorizzando l'oggetto che sta esaminando
  MemorizzaUtente(idUtente: number) { this.utenteMemorizzato = idUtente }
  MemorizzaCache(idCache: number) { this.cacheMemorizzata = idCache }

  constructor() { }
}
