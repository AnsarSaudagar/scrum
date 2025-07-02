import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TabsModule } from 'primeng/tabs';
import { OrgDialogComponent } from '../org-dialog/org-dialog.component';

@Component({
  selector: 'app-org-nav',
  imports: [ButtonModule, DialogModule, TabsModule, OrgDialogComponent],
  templateUrl: './org-nav.component.html',
  styleUrl: './org-nav.component.css'
})
export class OrgNavComponent {
  visible: boolean = false;
  
  showOrgDialog() {
    this.visible = true;
  }
}
