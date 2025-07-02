import { Component } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { DividerModule } from 'primeng/divider';
import { OrganizationsService } from '../../../core/services/organizations.service';
import { Organization } from '../../../core/models/organization.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-org-cards',
  imports: [ProgressBarModule, DividerModule, DatePipe],
  templateUrl: './org-cards.component.html',
  styleUrl: './org-cards.component.css',
})
export class OrgCardsComponent {
  organizations: Organization[] = [];

  constructor(private organizationsService: OrganizationsService) {}

  ngOnInit(): void {
    this.organizationsService.getOrganizations().subscribe({
      next: (data: Organization[]) => {
        this.organizations = data;
      },
      error: (error: any) => {
        console.error('Error fetching organizations:', error);
      },
    });
  }
}
