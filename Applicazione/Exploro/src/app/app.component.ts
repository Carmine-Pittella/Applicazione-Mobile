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
    localStorage.removeItem("geocacher");
  }
}
