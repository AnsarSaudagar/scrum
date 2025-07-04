import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TabsModule } from 'primeng/tabs';
import { CreateTabComponent } from './create-tab/create-tab.component';

@Component({
  selector: 'app-org-dialog',
  imports: [TabsModule, DialogModule, CreateTabComponent],
  templateUrl: './org-dialog.component.html',
  styleUrl: './org-dialog.component.css',
})
export class OrgDialogComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

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

  activeTab = 'create';
  tabs = ['Overview', 'Create', 'Join'];
  tabCss =
    'flex-1 py-2 px-4 rounded-lg text-white font-medium transition-all duration-200 cursor-pointer text-sm';
}
