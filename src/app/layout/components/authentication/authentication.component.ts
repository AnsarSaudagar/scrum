import { Component } from '@angular/core';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authentication',
  imports: [RouterOutlet, LogoComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

}
