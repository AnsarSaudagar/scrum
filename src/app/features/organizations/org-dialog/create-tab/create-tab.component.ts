import { Component, EventEmitter, Output } from '@angular/core';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { OrganizationsService } from '../../../../core/services/organizations.service';

@Component({
  selector: 'app-create-tab',
  imports: [
    CascadeSelectModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [],
  templateUrl: './create-tab.component.html',
  styleUrl: './create-tab.component.css',
})
export class CreateTabComponent {
  cities: any[] = [];
  selectedCity!: any;
  @Output() onOrgCreated = new EventEmitter<any>();

  orgForm!: FormGroup;
  loading = false;
  planOptions: any[] = [];
  enablePublicJoin = false;
  enableRequireApproval = true;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private organizationService: OrganizationsService
  ) {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

    this.planOptions = [
      { name: 'Free (10 members)', code: 'free' },
      { name: 'Pro (50 members)', code: 'pro' },
      { name: 'Enterprise (Unlimited)', code: 'enterprise' },
    ];

    this.orgForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      plan: [''],
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
    Object.keys(this.orgForm.controls).forEach((key) => {
      this.orgForm.get(key)?.markAsTouched();
    });

    if (this.orgForm.valid) {
      this.loading = true;
      const formData = {
        ...this.orgForm.value,
        allow_public_join: this.enablePublicJoin,
        require_approval: this.enableRequireApproval,
      };

      this.enablePublicJoin = false;
      this.enableRequireApproval = true;

      this.organizationService.createOrganization(formData).subscribe({
        next: (response: any) => {
          this.orgForm.reset();
          this.onOrgCreated.emit(response);
          this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Organization created successfully',
          });
        },
        error: (error: any) => {
          console.error('Error creating organization:', error);
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Please fill in all required fields correctly',
      });
    }
  }
}
