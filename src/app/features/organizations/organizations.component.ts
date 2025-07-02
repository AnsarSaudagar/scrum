import { Component } from '@angular/core';
import { OrgHeaderComponent } from './org-header/org-header.component';
import { OrgNavComponent } from './org-nav/org-nav.component';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-organizations',
  imports: [OrgHeaderComponent, OrgNavComponent, TagModule],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.css'
})
export class OrganizationsComponent {

}
