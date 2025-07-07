import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-providers',
  imports: [],
  templateUrl: './providers.component.html',
  styleUrl: './providers.component.css'
})
export class ProvidersComponent {
  onClickGoogle() {
    window.location.href =  environment.apiUrl + '/auth/google';
  }
}
