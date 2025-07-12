import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CreateTabComponent } from './create-tab/create-tab.component';
import { CustomTabsComponent } from '../../../shared/components/custom-tabs/custom-tabs.component';
import { JoinTabComponent } from './join-tab/join-tab.component';

@Component({
  selector: 'app-org-dialog',
  imports: [DialogModule, CreateTabComponent, CustomTabsComponent, JoinTabComponent],
  templateUrl: './org-dialog.component.html',
  styleUrl: './org-dialog.component.css',
})
export class OrgDialogComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  activeTab = 'create';

// When dialog closes
  onDialogClose() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onOrgCreated(response: any) {
    this.onDialogClose();
  }

  onVisibleChange(isVisible: boolean) {
    this.visible = isVisible;
    this.visibleChange.emit(isVisible);
  }

}
