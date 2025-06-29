import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProvidersComponent } from '../providers/providers.component';
import { AuthService } from '../../services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProvidersComponent,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signupForm: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      passwordCheck: this.fb.group(
        {
          password: ['', [Validators.required]],
          confirmPassword: ['', [Validators.required]],
        },
        {
          validators: this.passwordMatchValidator,
        }
      ),
    });
  }

  passwordMatchValidator(controls: AbstractControl) {
    const password = controls.get('password');
    const confirmPassword = controls.get('confirmPassword');
    // console.log(controls);

    if (password?.value === confirmPassword?.value) {
      return null;
    }
    return {
      passwordMismatch: true,
    };
  }

  onSubmit() {
    if (this.signupForm.status === 'VALID') {
      this.loading = true;
      
      const formData = this.signupForm.value;
      console.log(formData);
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.passwordCheck.password
      }
      this.authService.register(userData).subscribe({
        next: (res) => {
          this.loading = false;
          this.router.navigate(['auth', 'login']);
          this.messageService.add({
            severity: 'success',
            summary: "User successfully created",
          });

        },
        error:(err) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: err.error.message,
          });
          
        }
      })
    }
  }
}
