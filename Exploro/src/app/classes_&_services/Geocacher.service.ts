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
    },
  ];
  constructor() {}
}
