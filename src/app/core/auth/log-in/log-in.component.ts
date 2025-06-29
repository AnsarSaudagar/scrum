import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProvidersComponent } from '../providers/providers.component';

@Component({
  selector: 'app-log-in',
  imports: [CommonModule, FormsModule, RouterModule, ProvidersComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  

  
}
