import { Component } from '@angular/core';
import { SessioneService } from './classes_&_services/Sessione.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private sessionSrv: SessioneService) { }

  Logout() {
    console.log("salve")
    this.sessionSrv.setIdUtente(0)
    this.sessionSrv.setCachePrefPerID([])
    this.sessionSrv.setListaAmiciPerID([])
  }
}
