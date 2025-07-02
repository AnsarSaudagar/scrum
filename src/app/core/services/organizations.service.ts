import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../models/organization.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  apiUrl: string = environment.apiUrl + '/organizations';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getOrganizations(): Observable<Organization[]> {
    return this.http
      .get<Organization[]>(`${this.apiUrl}`, { withCredentials: true })
      .pipe(
        map((organizations: Organization[]) => {
          this.authService.user$.subscribe((user: any) => {
            organizations.forEach((organization: Organization) => {
              organization.is_owner = organization.owner_id === user.userId;
            });
          });
          return organizations;
        }),
        catchError((error: any) => {
          console.error('Error fetching organizations:', error);
          return throwError(() => error);
        })
      );
  }
}
