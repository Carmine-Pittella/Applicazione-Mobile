import { Injectable } from '@angular/core';
import { Geocacher } from './Geocacher';

@Injectable({
  providedIn: 'root',
})
export class GeocacherService {
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
      livello: 9,
      puntiExp: 48,
      amiciList: [],
      cachePref: [2, 3]
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
      puntiExp: 48,
      amiciList: [],
      cachePref: [1, 2, 3]
    },
    {
      id: 3,
      nome: 'Matteo',
      cognome: 'Salvatore',
      username: 'Matteo',
      password: 'Matteo',
      mail: 'MatteoSal@gmail.com',
      cellulare: 36526148,
      dataDiNascita: new Date('2000/01/01'),
      livello: 1,
      puntiExp: 0,
      amiciList: [],
      cachePref: []
    },
  ];

  constructor() { }

  findGeocacherById(i: number): Geocacher {
    let g: Geocacher[] = this.utentiList.filter(u => u.id === i);
    return g[0];
  };

  findCachePrefByIdUtente(i: number): number[] {
    let g: Geocacher = this.findGeocacherById(i);
    return [...g.cachePref];
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

  findTop3Utenti(): Geocacher[] {
    let cont: number = 3;
    let arr: number[] = [];
    let arrU: Geocacher[] = this.utentiList;
    let toRet: Geocacher[] = [];
    for (let i = 0; i < arrU.length; i++) {
      arr.push((arrU[i].livello) * 100 + arrU[i].puntiExp);
    }
    for (let i = 0; i < 3; i++) {
      let u: Geocacher = this.findUtenteByExpTot(Math.max(...arr));
      toRet.push(u);
      arrU = arrU.filter(a => a.id !== u.id);
    }
    return [...arrU];
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
    // ovviamente ho dovuto fare uno ad uno perché altre variabili come livello, xp, lista ecc
    // sono tutti NULL nell'oggetto nuoviDati. non essendo modificabili dalla pagina.
  }

  getAllGeocacher(): Geocacher[] {
    return [...this.utentiList]
  }

  addGeocacher(utente: Geocacher) {
    utente.id = this.utentiList.length + 1
    utente.livello = 0
    utente.puntiExp = 0
    utente.amiciList = []
    utente.cachePref = []
    this.utentiList.push(utente)
  }
}
