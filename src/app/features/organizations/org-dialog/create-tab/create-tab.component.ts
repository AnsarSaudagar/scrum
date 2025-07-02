import { Component } from '@angular/core';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-create-tab',
  imports: [CascadeSelectModule ,DropdownModule, FormsModule, ButtonModule],
  templateUrl: './create-tab.component.html',
  styleUrl: './create-tab.component.css'
})
export class CreateTabComponent {
  cities: any[] = [];
  selectedCity!: any;

  constructor() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }
}
