import { Component } from '@angular/core';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-tab',
  imports: [CascadeSelectModule, DropdownModule, FormsModule, ButtonModule, ReactiveFormsModule, CommonModule],
  providers: [MessageService],
  templateUrl: './create-tab.component.html',
  styleUrl: './create-tab.component.css'
})
export class CreateTabComponent {
  cities: any[] = [];
  selectedCity!: any;

  orgForm!: FormGroup;
  loading = false;
  planOptions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];

    this.planOptions = [
      { name: 'Free (10 members)', code: 'free' },
      { name: 'Pro (50 members)', code: 'pro' },
      { name: 'Enterprise (Unlimited)', code: 'enterprise' }
    ];

    this.orgForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      plan: ['', [Validators.required]],
      description: ['', [Validators.maxLength(500)]],
      allow_public_join: [false],
      require_approval: [true],
    });
  }

  // Getter methods for form controls
  get name() {
    return this.orgForm.get('name');
  }

  get plan() {
    return this.orgForm.get('plan');
  }

  get description() {
    return this.orgForm.get('description');
  }

  onCreateOrg() {
    // Mark all fields as touched to show validation errors
    Object.keys(this.orgForm.controls).forEach(key => {
      this.orgForm.get(key)?.markAsTouched();
    });

    if (this.orgForm.valid) {
      this.loading = true;
      console.log(this.orgForm.value);
      
      // Simulate API call
      setTimeout(() => {
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Organization created successfully',
        });
      }, 2000);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Please fill in all required fields correctly',
      });
    }
  }
}
