import { Injectable } from '@angular/core';
import { Geocacher } from './Geocacher';

@Injectable({
  providedIn: 'root',
})
export class GeocacherService {
  utentiList: Geocacher[] = [
    {
      id: 2,
      nome: 'Carmine',
      cognome: 'Pittella',
      username: 'Carmine',
      password: 'Carmine',
      mail: 'scimmia@gmail.com',
      cellulare: 365261,
      dataDiNascita: new Date('2000/05/11'),
      livello: 2,
      puntiExp: 48,
      amiciList:[],
      cachePref:[]
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
      amiciList:[],
      cachePref:[1,2,3]
    },
  ];

  findGeocacherById(i:number):Geocacher{
   let g :Geocacher[] = this.utentiList.filter(u=>u.id===i);
    return g[0];
  };

  findCachePrefByIdUtente(i:number):number[]{
    let g:Geocacher = this.findGeocacherById(i);
    return [...g.cachePref];
  };

  findAmiciListByIdUtente(i:number):number[]{
    let g:Geocacher = this.findGeocacherById(i);
    return [...g.amiciList];
  };

  findUtenteByUsrPsw(usr:string,psw:string) :Geocacher {
    let g: Geocacher[]= this.utentiList.filter(u=>u.username===usr);
    let g2: Geocacher[]= g.filter(u=>u.password===psw);
    return g2[0];
  }
  constructor() {}
}
