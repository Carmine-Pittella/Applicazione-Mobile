import { Injectable } from '@angular/core';
import { RichiestaAmicizia } from './RichiestaAmicizia';
import { Geocacher } from './Geocacher';
import { GeocacherService } from './Geocacher.service';

@Injectable({
  providedIn: 'root',
})
export class RichiestaAmiciziaService {
  constructor(private geocacherSrv: GeocacherService) { }

  richiesteList: RichiestaAmicizia[] = [
    {
      id: 1,
      Gchiede: 2,
      Griceve: 1,
      conferma: false
    },
    {
      id: 2,
      Gchiede: 3,
      Griceve: 1,
      conferma: false
    },
    {
      id: 3,
      Gchiede: 3,
      Griceve: 2,
      conferma: false
    }
  ]

  // ora dovrebbe funzionare, restituisce solo le richieste da approvare, quelle già approvate
  // stanno nella lista di amici del Geocacher in questione tanto.
  findRichiesteByUtente(idUtente: number): RichiestaAmicizia[] {
    let richiesteFiltrate: RichiestaAmicizia[] = [];
    richiesteFiltrate = this.richiesteList.filter(richiesta =>
      richiesta.Griceve === idUtente && !richiesta.conferma
    );
    return richiesteFiltrate;
  }

  accettaRichiestaDiAmicizia(r: RichiestaAmicizia) {
    let index = this.richiesteList.findIndex(u => { return u.id === r.id });
    this.richiesteList[index].conferma=true;
    this.geocacherSrv.aggiungiAmicizia(r.Gchiede, r.Griceve);
  }

  declinaRichiestaDiAmicizia(r: RichiestaAmicizia) {
    let newarr = this.richiesteList.filter(u => { return u.id !== r.id });
    this.richiesteList=[...newarr];
  }


  inviaRichiestaDiAmicizia(gchiede: number, griceve: number): string {
    if (this.isRichiestaExists(gchiede, griceve)) {
      return "Richiesta di amicizia esistente";
    } else {
      let nuovaRichiesta = new RichiestaAmicizia
      nuovaRichiesta.id = this.richiesteList[this.richiesteList.length - 1].id + 1
      nuovaRichiesta.Gchiede = gchiede
      nuovaRichiesta.Griceve = griceve
      nuovaRichiesta.conferma = false
      this.richiesteList.push(nuovaRichiesta);
      return "Richiesta inviata con successo";
    }
  }

  private isRichiestaExists(x: number, y: number): boolean {
    return this.richiesteList.some(richiesta => richiesta.Gchiede === x && richiesta.Griceve === y);
  }

  getRichiestaAmiciziaParameter(gchiede: number, griceve: number): RichiestaAmicizia {
    const richiesta = this.richiesteList.find(richiesta =>
      richiesta.Gchiede === gchiede && richiesta.Griceve === griceve
    );
    return richiesta ? { ...richiesta } : new RichiestaAmicizia();
  }

  private getIndexRichiestaById(idRichiesta: number): number {
    const index = this.richiesteList.findIndex(r => r.id === idRichiesta);
    if (index !== -1) {
      return index;
    } else {
      throw new Error(`RichiestaAmicizia con id ${idRichiesta} non trovata.`);
      // caso molto improbabile
    }
  }

}




