import { Component } from '@angular/core';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { OrgHeaderComponent } from './org-header/org-header.component';
import { ButtonModule } from 'primeng/button';
import { OrgNavComponent } from './org-nav/org-nav.component';

@Component({
  selector: 'app-organizations',
  imports: [OrgHeaderComponent, OrgNavComponent],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.css'
})
export class OrganizationsComponent {

}
