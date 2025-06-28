import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.apiUrl + '/auth';
  
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  checkAuth(): Observable<any> {
    this.isLoadingSubject.next(true);
    
    return this.http.get(`${this.apiUrl}/profile`, {
      withCredentials: true
    }).pipe(
      tap((user: any) => {
        this.setAuthenticationState(user);
      }),
      catchError((error) => {
        this.clearAuthenticationState();
        return throwError(() => error);
      }),
      tap(() => {
        this.isLoadingSubject.next(false);
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {
      withCredentials: true
    }).pipe(
      tap((response: any) => {
        if (response.user) {
          this.setAuthenticationState(response.user);
        }
      }),
      catchError((error) => {
        this.clearAuthenticationState();
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.clearAuthenticationState();
        this.router.navigate(['/auth/login']);
      }),
      catchError((error) => {
        // Even if logout fails on server, clear local state
        this.clearAuthenticationState();
        this.router.navigate(['/auth/login']);
        return of(null);
      })
    );
  }

  // Register method
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, {
      withCredentials: true
    }).pipe(
      tap((response: any) => {
        if (response.user) {
          this.setAuthenticationState(response.user);
        }
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  // Get current user
  getCurrentUser(): any {
    return this.userSubject.value;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Set authentication state
  private setAuthenticationState(user: any): void {
    this.userSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  // Clear authentication state
  clearAuthenticationState(): void {
    this.userSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  // Get profile (original method, now integrated with state management)
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, {
      withCredentials: true
    }).pipe(
      tap((user: any) => {
        this.setAuthenticationState(user);
      }),
      catchError((error) => {
        this.clearAuthenticationState();
        return throwError(() => error);
      })
    );
  }
}
