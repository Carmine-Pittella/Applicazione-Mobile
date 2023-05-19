import { Component, OnInit } from '@angular/core';
import { RichiestaAmicizia } from 'src/app/classes_&_services/RichiestaAmicizia';
import { RichiestaAmiciziaService } from 'src/app/classes_&_services/RichiestaAmicizia.service';
import { SessioneService } from 'src/app/classes_&_services/Sessione.service';
import { AlertController } from '@ionic/angular';
import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';

@Component({
  selector: 'app-amici',
  templateUrl: './amici.page.html',
  styleUrls: ['./amici.page.scss'],
})
export class AmiciPage implements OnInit {
  alertButtons:any;

  constructor(private richiestaSrv : RichiestaAmiciziaService,
    private sessioneSrv :SessioneService,
    private alertController: AlertController,
    private gprova: GeocacherService) { }

  ngOnInit() {
    let tmp = this.richiestaSrv.findRichiesteByUtente(this.sessioneSrv.returnIdByJson(localStorage.getItem("geocacher")));
    if(tmp!==undefined){
      let arrInputs=[];
      for(let c=0;c<tmp.length;c++){
        let richiestatmp = tmp[c];
        let str = richiestatmp.Gchiede.username;
        let i = tmp[c]
        arrInputs.push({type:"checkbox",label:str,value:i,checked:false});
      }
      this.displayAlert([...arrInputs]);
    }


  }

  async displayAlert(arr : any[]){
    const alert = await this.alertController.create({
      header: 'Richieste di amicizia',
      message: "seleziona l'username per accettare",
      inputs:arr,
      buttons: [{
        text: 'Okay',
        handler: data => {
          console.log('Checkbox data:', data);
          if (data !== undefined){
            for(let i=0;i<data.length;i++){
              this.richiestaSrv.accettaRichiestaDiAmicizia(data[i]);
            }
          }
          let newG = this.gprova.findGeocacherById(this.sessioneSrv.returnIdByJson(localStorage.getItem("geocacher")));
          localStorage.removeItem("geocacher");
          localStorage.setItem("geocacher",JSON.stringify(newG));
        }
      }]

    });

    await alert.present();
    let result = await alert.onDidDismiss();
  }

}


