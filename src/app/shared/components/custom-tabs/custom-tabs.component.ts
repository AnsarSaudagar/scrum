import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-tabs',
  imports: [],
  templateUrl: './custom-tabs.component.html',
  styleUrl: './custom-tabs.component.css'
})
export class CustomTabsComponent {
  @Input() activeTab!: string;
  @Input() tabs!: string[];
  tabCss =
    'flex-1 py-2 px-4 rounded-lg text-white font-medium transition-all duration-200 cursor-pointer text-sm';

  @Output() activeTabChange = new EventEmitter<string>();

  onTabClick(tab: string) {
    this.activeTabChange.emit(tab);
  }
}
