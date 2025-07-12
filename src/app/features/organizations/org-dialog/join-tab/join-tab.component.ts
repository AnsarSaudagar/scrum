import { Component } from '@angular/core';
import { OrganizationsService } from '../../../../core/services/organizations.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Organization } from '../../../../core/models/organization.model';
import { FirstLetterOfWordsPipe } from '../../../../shared/pipes/first-letter-of-words.pipe';

@Component({
  selector: 'app-join-tab',
  imports: [ReactiveFormsModule, FirstLetterOfWordsPipe],
  templateUrl: './join-tab.component.html',
  styleUrl: './join-tab.component.css'
})
export class JoinTabComponent {
  searchKeyword = new FormControl('');
  constructor(private organizationsService: OrganizationsService) {}
  message = "Enter an organization name to search";
  organizations: Organization[] = [];

  searchOrganizations() {
    if (this.searchKeyword.value === '') {
      this.message = "Enter an organization name to search";
      this.organizations = [];
      return;
    }
    this.organizations = [];
    this.organizationsService.getOrganizationByKeyword(this.searchKeyword.value || '').subscribe((organizations) => {
      this.organizations = organizations;
      if (organizations.length === 0) {
        this.message = "No organizations found";
      }
    });
  }
}
