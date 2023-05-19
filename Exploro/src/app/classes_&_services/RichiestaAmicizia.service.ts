import { Injectable } from '@angular/core';
import { RichiestaAmicizia } from './RichiestaAmicizia';
import { Geocacher } from './Geocacher';
import { GeocacherService } from './Geocacher.service';

@Injectable({
  providedIn: 'root',
})
export class RichiestaAmiciziaService {
  constructor(private geocacherSrv : GeocacherService) { }

  richiesteList : RichiestaAmicizia[]=[
    {
      id:1,
      Gchiede:{id: 2,nome: 'Carmine',cognome: 'Pittella',username: 'carmine',password: 'carmine',mail: 'scimmia@gmail.com',cellulare: 365261,dataDiNascita: new Date('2000/05/11'),livello: 2,puntiExp: 48,amiciList: [],cacheTrovate: [1, 2, 3]},
      Griceve: {id: 1,nome: 'Fabrizio',cognome: 'Paglia',username: 'fabri',password: 'fabri',mail: 'fabrizio.paglia@gmail.com',cellulare: 3665904021,dataDiNascita: new Date('2000/03/09'),livello: 9,puntiExp: 48,amiciList: [],cacheTrovate: [1,2,4,5]},
      conferma:false
    },
    {
      id:2,
      Gchiede: {id: 3,nome: 'Matteo',cognome: 'Salvatore',username: 'Matteo',password: 'Matteo',mail: 'MatteoSal@gmail.com',cellulare: 36526148,dataDiNascita: new Date('2000/01/01'),livello: 1,puntiExp: 0,amiciList: [],cacheTrovate: []},
      Griceve: {id: 1,nome: 'Fabrizio',cognome: 'Paglia',username: 'fabri',password: 'fabri',mail: 'fabrizio.paglia@gmail.com',cellulare: 3665904021,dataDiNascita: new Date('2000/03/09'),livello: 9,puntiExp: 48,amiciList: [],cacheTrovate: [1,2,4,5]},
      conferma:false
    },
    {
      id:3,
      Gchiede: {id: 3,nome: 'Matteo',cognome: 'Salvatore',username: 'Matteo',password: 'Matteo',mail: 'MatteoSal@gmail.com',cellulare: 36526148,dataDiNascita: new Date('2000/01/01'),livello: 1,puntiExp: 0,amiciList: [],cacheTrovate: []},
      Griceve: {id: 2,nome: 'Carmine',cognome: 'Pittella',username: 'carmine',password: 'carmine',mail: 'scimmia@gmail.com',cellulare: 365261,dataDiNascita: new Date('2000/05/11'),livello: 2,puntiExp: 48,amiciList: [],cacheTrovate: [1, 2, 3]},
      conferma:false
    }
  ]


  //metodo per trovare tutte le richieste destinate all'utente con l'id specificato
  findRichiesteByUtente(idUtente : number):RichiestaAmicizia[]{
    // non funziona :(
    let arrtmp:RichiestaAmicizia[] = this.richiesteList.filter(u=>{return u.Griceve.id===idUtente});
    arrtmp = arrtmp.filter(u=>u.conferma===false);
    //ritorna tutte le richieste destinate a quest'utente che non sono ancora state ne accettate né declinate
    return [...arrtmp];
  }

  accettaRichiestaDiAmicizia(r:RichiestaAmicizia){
    let index = this.richiesteList.findIndex(u=>{return u.id===r.id});
    console.log(index);
    //this.richiesteList[index].conferma=true;
    this.geocacherSrv.aggiungiAmicizia(r.Gchiede,r.Griceve);
  }

  declinaRichiestaDiAmicizia(r:RichiestaAmicizia){
    this.richiesteList = this.richiesteList.filter(u=>{u.id!==r.id});
  }
  inviaRichiestaDiAmicizia(gchiede:Geocacher,griceve:Geocacher):string{
    if(this.geocacherSrv.sonoAmici(gchiede,griceve)){
      return "sonogiaAmici";
    }else{
      let arrtmp = this.richiesteList.filter(u=>{u.conferma===false});
      arrtmp = arrtmp.filter(u=>{u.Gchiede.id===gchiede.id});
      arrtmp = arrtmp.filter(u=>{u.Griceve.id===griceve.id});
      if(arrtmp===undefined){
        //non esiste una richiesta pendente e posso crearne una
        let idq=this.richiesteList[this.richiesteList.length-1].id+1;
        this.richiesteList.push({id:idq, Gchiede:gchiede, Griceve:griceve, conferma:false});
        return "successo";
      }else{
        return "unaRichiestagiastatainviata";
      }
    }
  }
}

