import { Component } from '@angular/core';
import { OrgDialogComponent } from '../../../features/organizations/org-dialog/org-dialog.component';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-navbar',
  imports: [OrgDialogComponent, BadgeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  visible: boolean = false;
  
  showOrgDialog() {
    this.visible = true;
  }
}
