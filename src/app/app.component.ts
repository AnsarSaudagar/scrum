import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'scrum';
  isLoading$: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.performAutoLogin();
  }

  private performAutoLogin(): void {
    this.authService.checkAuth().subscribe({
      next: (user) => {
        console.log('Auto-login successful:', user);
        const currentUrl = this.router.url;
        if (currentUrl.includes('/auth/')) {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.log('Auto-login failed, user needs to log in manually');
        const currentUrl = this.router.url;
        if (!currentUrl.includes('/auth/') && currentUrl !== '/') {
          this.router.navigate(['/auth/login']);
        }
      }
    });
  }
}
