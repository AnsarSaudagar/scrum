import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  imports: [],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  constructor(private authService: AuthService) {}

  onClickGoogle() {
    window.location.href = 'http://localhost:7200/auth/google';
  }
}
