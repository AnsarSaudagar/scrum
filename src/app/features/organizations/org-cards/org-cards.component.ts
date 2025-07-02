import { Component } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-org-cards',
  imports: [ProgressBarModule, DividerModule],
  templateUrl: './org-cards.component.html',
  styleUrl: './org-cards.component.css'
})
export class OrgCardsComponent {

}
