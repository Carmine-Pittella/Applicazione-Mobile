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

  accettaRichiestaDiAmicizia(r: RichiestaAmicizia) {
    let index = this.richiesteList.findIndex(u => { return u.id === r.id });
    this.richiesteList[index].conferma = true;
    this.geocacherSrv.aggiungiAmicizia(r.Gchiede, r.Griceve);
  }

  declinaRichiestaDiAmicizia(r: RichiestaAmicizia) {
    let index = this.richiesteList.findIndex(u => { return u.id === r.id });
    this.richiesteList.splice(index, 1)
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
    let richiesta = this.richiesteList.find(richiesta =>
      (richiesta.Gchiede === gchiede && richiesta.Griceve === griceve) ||
      (richiesta.Gchiede === griceve && richiesta.Griceve === gchiede)
    );
    return richiesta ? { ...richiesta } : new RichiestaAmicizia();
  }

  getListaRichiesteParameter(gchiede: number, griceve: number): RichiestaAmicizia[] {
    let richiesteFiltrate = this.richiesteList.filter(u => { return u.conferma === false });
    richiesteFiltrate = richiesteFiltrate.filter(richiesta => {
      if (gchiede === 0 && griceve === 0) {
        return true; // Accetta qualsiasi valore di richiesta.Gchiede e richiesta.Griceve
      }
      if (gchiede === 0 && richiesta.Griceve === griceve) {
        return true; // Accetta qualsiasi valore di richiesta.Gchiede
      }
      if (griceve === 0 && richiesta.Gchiede === gchiede) {
        return true; // Accetta qualsiasi valore di richiesta.Griceve
      }
      return richiesta.Gchiede === gchiede && richiesta.Griceve === griceve;
    });
    return richiesteFiltrate.map(richiesta => ({ ...richiesta }));
  }


}




