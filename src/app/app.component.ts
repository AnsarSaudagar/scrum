import { Component } from '@angular/core';
import { AuthenticationComponent } from './layout/components/authentication/authentication.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'scrum';
}
