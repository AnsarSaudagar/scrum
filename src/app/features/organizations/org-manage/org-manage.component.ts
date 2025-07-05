import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-org-manage',
  imports: [],
  templateUrl: './org-manage.component.html',
  styleUrl: './org-manage.component.css'
})
export class OrgManageComponent {
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      console.log(params);
    });
  } 
}
