import { Injectable } from '@angular/core';
import { Sessione } from './Sessione';

@Injectable({
  providedIn: 'root',
})
export class SessioneService {
  s : Sessione={
    idUtente : 0,
    cachePrefPerID : [],
    ListaAmiciPerID : []
  }
  constructor() {}
}
