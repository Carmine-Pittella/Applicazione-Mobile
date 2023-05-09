import { Injectable } from '@angular/core';

import { GeocacherService } from 'src/app/classes_&_services/Geocacher.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private geocacherSrv:GeocacherService) {}
}
