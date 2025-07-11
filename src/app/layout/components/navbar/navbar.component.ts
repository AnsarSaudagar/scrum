import { Component } from '@angular/core';
import { OrgDialogComponent } from '../../../features/organizations/org-dialog/org-dialog.component';

@Component({
  selector: 'app-navbar',
  imports: [OrgDialogComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  visible: boolean = false;
  
  showOrgDialog() {
    this.visible = true;
  }
}
