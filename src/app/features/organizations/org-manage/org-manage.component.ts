import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationsService } from '../../../core/services/organizations.service';
import { MessageService } from 'primeng/api';
import { Organization } from '../../../core/models/organization.model';
import { CustomTabsComponent } from '../../../shared/components/custom-tabs/custom-tabs.component';

@Component({
  selector: 'app-org-manage',
  imports: [CustomTabsComponent],
  templateUrl: './org-manage.component.html',
  styleUrl: './org-manage.component.css',
})
export class OrgManageComponent implements OnInit {
  org: Organization | null = null;  
  tabs : string[] = ['overview', 'members', 'settings', 'analytics', 'activity'];
  activeTab : string = 'overview';
  
  constructor(
    private route: ActivatedRoute,
    private orgService: OrganizationsService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const orgId = this.route.snapshot.paramMap.get('id');

    if (orgId) {
      this.orgService.getOrganization(orgId).subscribe({
        next: (org) => {
          this.org = org;
        },
        error: (error) => {
          
          this.router.navigate(['/organizations']);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Organization not found' });
        },
      });
      
    }
  }

  goBack() {
    this.router.navigate(['/organizations']);
  }

  onTabChange(tab: string) {
    this.activeTab = tab;
  }
}
