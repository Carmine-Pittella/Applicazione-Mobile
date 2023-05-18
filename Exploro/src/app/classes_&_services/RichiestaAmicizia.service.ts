import { Injectable } from '@angular/core';
import { RichiestaAmicizia } from './RichiestaAmicizia';
import { Geocacher } from './Geocacher';
import { GeocacherService } from './Geocacher.service';

@Injectable({
  providedIn: 'root',
})
export class RichiestaAmiciziaService {
  constructor(private geocacherSrv : GeocacherService) { }

  richiesteList : RichiestaAmicizia[]=[];


  //metodo per trovare tutte le richieste destinate all'utente con l'id specificato
  findRichiesteByUtente(idUtente : number){
    let arrtmp = this.richiesteList.filter(u=>{u.Griceve.id===idUtente});
    arrtmp = arrtmp.filter(u=>{u.conferma===false});

    //ritorna tutte le richieste destinate a quest'utente che non sono ancora state ne accettate né declinate
    return [...arrtmp];
  }

  accettaRichiestaDiAmicizia(r:RichiestaAmicizia){
    let index = this.richiesteList.findIndex(u=>{u.id===r.id});
    this.richiesteList[index].conferma=true;
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

