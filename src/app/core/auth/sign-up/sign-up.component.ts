import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProvidersComponent } from '../providers/providers.component';
import { AuthService } from '../../services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, FormsModule, RouterModule, ProvidersComponent, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})


export class SignUpComponent {
  signupForm : FormGroup;
  
  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      passwordCheck : this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
      }, {
        validators: this.passwordMatchValidator
      })
    });
  }

  passwordMatchValidator(controls: AbstractControl) {
    const password = controls.get('password');
    const confirmPassword = controls.get('confirmPassword');
  
    if(password?.value !== confirmPassword?.value) {
      return {
        passwordMismatch: true
      }
    }
    return null;
  }

  onSubmit(){
    console.log(this.signupForm);
  }
}
