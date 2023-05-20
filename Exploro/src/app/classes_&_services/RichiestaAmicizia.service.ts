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


  //metodo per trovare tutte le richieste destinate all'utente con l'id specificato
  findRichiesteByUtente(idUtente: number): RichiestaAmicizia[] {
    // non funziona :(
    let arrtmp: RichiestaAmicizia[] = this.richiesteList.filter(u => { return u.Griceve === idUtente });
    arrtmp = arrtmp.filter(u => u.conferma === false);
    //ritorna tutte le richieste destinate a quest'utente che non sono ancora state ne accettate né declinate
    return [...arrtmp];
  }

  accettaRichiestaDiAmicizia(r: RichiestaAmicizia) {
    let index = this.richiesteList.findIndex(u => { return u.id === r.id });
    console.log(index);
    //this.richiesteList[index].conferma=true;
    this.geocacherSrv.aggiungiAmicizia(r.Gchiede, r.Griceve);
  }

  declinaRichiestaDiAmicizia(r: RichiestaAmicizia) {
    this.richiesteList = this.richiesteList.filter(u => { u.id !== r.id });
  }

  // inviaRichiestaDiAmicizia(gchiede: number, griceve: number): string {
  //   if (this.geocacherSrv.sonoAmici(gchiede, griceve)) {
  //     return "sonogiaAmici";
  //   } else {
  //     let arrtmp = this.richiesteList.filter(u => { u.conferma === false });
  //     arrtmp = arrtmp.filter(u => { u.Gchiede === gchiede });
  //     arrtmp = arrtmp.filter(u => { u.Griceve === griceve });
  //     if (arrtmp === undefined) {
  //       //non esiste una richiesta pendente e posso crearne una
  //       let idq = this.richiesteList[this.richiesteList.length - 1].id + 1;
  //       this.richiesteList.push({ id: idq, Gchiede: gchiede, Griceve: griceve, conferma: false });
  //       return "successo";
  //     } else {
  //       return "unaRichiestagiastatainviata";
  //     }
  //   }
  // }

  inviaRichiestaDiAmicizia(gchiede: number, griceve: number): string {
    if (this.isRichiestaExists(gchiede, griceve)) {//////////////////////////////////
      return "sonogiaAmici";
    } else {
      let nuovaRichiesta = new RichiestaAmicizia
      nuovaRichiesta.id = this.richiesteList.length + 1
      nuovaRichiesta.Gchiede = gchiede
      nuovaRichiesta.Griceve = griceve
      nuovaRichiesta.conferma = false

      this.richiesteList.push(nuovaRichiesta);
      return "successo";
    }
  }

  isRichiestaExists(x: number, y: number): boolean {
    return this.richiesteList.some(richiesta => richiesta.Gchiede === x && richiesta.Griceve === y);
  }

  getRichiestaAmiciziaParameter(gchiede: number, griceve: number): RichiestaAmicizia {
    const richiesta = this.richiesteList.find(richiesta =>
      richiesta.Gchiede === gchiede && richiesta.Griceve === griceve
    );
    return richiesta ? { ...richiesta } : new RichiestaAmicizia();
  }



}




