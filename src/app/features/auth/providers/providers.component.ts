import { Component } from '@angular/core';

@Component({
  selector: 'app-providers',
  imports: [],
  templateUrl: './providers.component.html',
  styleUrl: './providers.component.css'
})
export class ProvidersComponent {
  onClickGoogle() {
    window.location.href = 'http://localhost:7200/auth/google';
  }
}
