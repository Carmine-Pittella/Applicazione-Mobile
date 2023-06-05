import { Injectable } from '@angular/core';
import { Geocacher } from './Geocacher';
import { CacheService } from './Cache.service';
import { Cache } from './Cache';

@Injectable({
  providedIn: 'root',
})
export class GeocacherService {
  private cacheSrv: CacheService
  utentiList: Geocacher[] = [
    {
      id: 1,
      nome: 'Fabrizio',
      cognome: 'Paglia',
      username: 'fabri',
      password: 'fabri',
      mail: 'fabrizio.paglia@gmail.com',
      cellulare: 3665904021,
      dataDiNascita: new Date('2000/03/09'),
      livello: 8,
      puntiExp: 99,
      amiciList: [],
      cacheTrovate: [1, 2, 4, 5]
    },
    {
      id: 2,
      nome: 'Carmine',
      cognome: 'Pittella',
      username: 'carmine',
      password: 'carmine',
      mail: 'scimmia@gmail.com',
      cellulare: 365261,
      dataDiNascita: new Date('2000/05/11'),
      livello: 2,
      puntiExp: 25,
      amiciList: [],
      cacheTrovate: [1, 2, 3]
    },
    {
      id: 3,
      nome: 'Matteo',
      cognome: 'Salvatore',
      username: 'matteo',
      password: 'matteo',
      mail: 'MatteoSal@gmail.com',
      cellulare: 36526148,
      dataDiNascita: new Date('2000/01/01'),
      livello: 1,
      puntiExp: 0,
      amiciList: [],
      cacheTrovate: []
    },
  ];

  constructor(private cS: CacheService) { }

  findGeocacherById(i: number): Geocacher {
    let g: Geocacher[] = this.utentiList.filter(u => u.id === i);
    return g[0];
  };

  findcacheTrovateByIdUtente(i: number): number[] {
    let g: Geocacher = this.findGeocacherById(i);
    return [...g.cacheTrovate];
  };

  findUtenteByUsr(username: string): Geocacher {
    let g: Geocacher[] = this.utentiList.filter(u => u.username === username);
    return g[0];
  };

  findAmiciListByIdUtente(i: number): number[] {
    let g: Geocacher = this.findGeocacherById(i);
    return [...g.amiciList];
  };

  findUtenteByUsrPsw(usr: string, psw: string): Geocacher {
    let g: Geocacher[] = this.utentiList.filter(u => u.username === usr);
    let g2: Geocacher[] = g.filter(u => u.password === psw);
    return g2[0];
  }


  findUtenteByExpTot(n: number): Geocacher {
    let g: Geocacher[] = this.utentiList.filter(u => u.livello * 100 + u.puntiExp === n);
    return g[0];
  }

  updateGeocacherByIdUtente(idUtente: number, nuoviDati: Geocacher) {
    this.utentiList[idUtente].nome = nuoviDati.nome;
    this.utentiList[idUtente].cognome = nuoviDati.cognome;
    this.utentiList[idUtente].username = nuoviDati.username;
    this.utentiList[idUtente].mail = nuoviDati.mail;
    this.utentiList[idUtente].cellulare = nuoviDati.cellulare;
    this.utentiList[idUtente].dataDiNascita = nuoviDati.dataDiNascita;
    this.utentiList[idUtente].password = nuoviDati.password;
  }

  getAllGeocacher(): Geocacher[] {
    return [...this.utentiList]
  }

  addGeocacher(utente: Geocacher) {
    utente.id = this.utentiList.length + 1
    utente.livello = 0
    utente.puntiExp = 0
    utente.amiciList = []
    utente.cacheTrovate = []
    this.utentiList.push(utente)
  }

  addCacheTrovata(idUtente: number, idCache: number) {
    let g = this.utentiList.find(u => u.id === idUtente)
    if (g) {
      g.cacheTrovate.push(idCache)
      // aggiorna punteggio
      let x: Cache = this.cS.findCacheById(idCache);
      this.aumentaXP(idUtente, x.difficolta)
    }
  }


  findAllCacheNonTrovateByIDUtente(idU: number, AllCache: Cache[]): Cache[] {
    let alC: number[] = [];
    let ret: Cache[] = [];
    for (let ct = 0; ct < AllCache.length; ct++) {
      alC.push(this.cS.findIdByCache(AllCache[ct]));
    }
    let g: Geocacher = this.findGeocacherById(idU);
    let toRemove = [...g.cacheTrovate];
    let toRetN = alC.filter(function (el) {
      return !toRemove.includes(el);
    });
    for (let fr = 0; fr < toRetN.length; fr++) {
      ret.push(this.cS.findCacheById(toRetN[fr]));
    }
    return [...ret];
  }

  aggiungiAmicizia(chiede: number, riceve: number) {
    let ricevente = this.utentiList.findIndex(u => { return u.id === riceve })
    this.utentiList[ricevente].amiciList.push(chiede);
    let mittente = this.utentiList.findIndex(u => { return u.id === chiede })
    this.utentiList[mittente].amiciList.push(riceve);
    // non è detto che se io accetto la sua richiesta allora anche lui ha accettato la mia (che non ho mandato)
  }

  sonoAmici(g1: number, g2: number): boolean {
    let gtmp = this.utentiList.find(u => { u.id === g1 });
    let arrtmp = gtmp?.amiciList.find(u => { u === g2 });
    if (arrtmp === undefined) {
      return false;
    } else {
      return true;
    }
  }

  getClassifica(): Geocacher[] {
    let sortedList = [...this.utentiList];
    sortedList.sort((a, b) => b.livello * 100 + b.puntiExp - a.livello * 100 + a.puntiExp);
    return [...sortedList];
  }

  getClassificaAmici(id_utente: number): Geocacher[] {
    let utente = this.utentiList.find(u => u.id === id_utente);
    let amiciList: Geocacher[] = utente?.amiciList.map(id => this.findGeocacherById(id))!;
    amiciList.sort((a, b) => b.livello * 100 + b.puntiExp - a.livello * 100 + a.puntiExp);
    return amiciList
  }

  aumentaXP(idUtente: number, puntixp: number) {
    let index = this.utentiList.findIndex(u => u.id === idUtente)
    let xp = this.utentiList[index].puntiExp;
    xp = xp + 2 * puntixp;
    if (xp >= 100) {
      xp = xp - 100;
      this.utentiList[index].livello = this.utentiList[index].livello + 1;
    }
    this.utentiList[index].puntiExp = xp;

    // aumentaXP(idUtente: number, livello: number) {
    //   const geocacher = this.findGeocacherById(idUtente);
    //   const puntiExp = geocacher.puntiExp + livello * 25 + 50;
    //   geocacher.livello += Math.floor(puntiExp / 100);
    //   geocacher.puntiExp = puntiExp % 100;
    // }
    // // livello 1: 75xp livello 2: 100xp livello 3:125 xp




  }
}
