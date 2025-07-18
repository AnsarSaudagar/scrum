import { Component } from '@angular/core';
import { OrgHeaderComponent } from './org-header/org-header.component';
import { OrgNavComponent } from './org-nav/org-nav.component';
import { TagModule } from 'primeng/tag';
import { OrgCardsComponent } from './org-cards/org-cards.component';
import { OrgExplainComponent } from './org-explain/org-explain.component';

@Component({
  selector: 'app-organizations',
  imports: [OrgHeaderComponent, OrgNavComponent, OrgCardsComponent, TagModule, OrgExplainComponent],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.css'
})
export class OrganizationsComponent {

}
