import { Component } from '@angular/core';
import { AuthenticationComponent } from './layout/components/authentication/authentication.component';

@Component({
  selector: 'app-root',
  imports: [AuthenticationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'scrum';
}
