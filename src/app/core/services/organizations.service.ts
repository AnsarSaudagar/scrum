import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../models/organization.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  apiUrl: string = environment.apiUrl + '/organizations';
  orgsSubject = new BehaviorSubject<Organization[]>([]);
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
          this.orgsSubject.next(organizations);
          return organizations;
        }),
        catchError((error: any) => {
          console.error('Error fetching organizations:', error);
          return throwError(() => error);
        })
      );
  }

  createOrganization(organization: Organization): Observable<Organization> {
    return this.http.post<Organization>(`${this.apiUrl}`, organization, { withCredentials: true }).pipe(
      map((organization: Organization) => {
        return organization;
      }),
      catchError((error: any) => {
        console.error('Error creating organization:', error);
        return throwError(() => error);
      })
    );
  }

  getOrganization(orgId: string | number): Observable<Organization> {
    return this.http.get<Organization>(`${this.apiUrl}/${orgId}`, { withCredentials: true }).pipe(
      map((organization: Organization) => {
        return organization;
      }),
      catchError((error: any) => {
        console.error('Error fetching organization:', error);
        return throwError(() => error);
      })
    );
  }

  getOrganizationByKeyword(keyword: string): Observable<Organization[]> {
    return this.http.get<Organization[]>(`${this.apiUrl}/search?keyword=${keyword}`, { withCredentials: true }).pipe(
      map((organizations: Organization[]) => {
        return organizations;
      }),
      catchError((error: any) => {
        console.error('Error searching organizations:', error);
        return throwError(() => error);
      })
    );
  } 
}
