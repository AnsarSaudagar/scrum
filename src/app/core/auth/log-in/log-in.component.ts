import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProvidersComponent } from '../providers/providers.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-log-in',
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule, 
    ProvidersComponent,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // Getter methods for form controls
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      
      const formData = this.loginForm.value;
      console.log(formData);
      
      this.authService.login(formData).subscribe({
        next: (res) => {
          this.loading = false;
          this.router.navigate(['/']);
          this.messageService.add({
            severity: 'success',
            summary: "Successfully logged in",
          });
        },
        error: (err) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: err.error.message || 'Login failed',
          });
        }
      });
    }
  }
}
