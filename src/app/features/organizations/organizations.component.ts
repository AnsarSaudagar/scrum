import { Component } from '@angular/core';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { OrgHeaderComponent } from './org-header/org-header.component';

@Component({
  selector: 'app-organizations',
  imports: [OrgHeaderComponent],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.css'
})
export class OrganizationsComponent {

}
