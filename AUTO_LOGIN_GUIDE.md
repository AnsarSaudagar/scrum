# Auto-Login Implementation Guide

This guide explains the auto-login functionality implemented in your Angular application using HTTP cookies for JWT storage.

## Overview

The auto-login system automatically authenticates users when they visit the application if they have a valid JWT token stored in HTTP cookies on the backend.

## Key Components

### 1. AuthService (`src/app/core/services/auth.service.ts`)

Enhanced with:
- **`checkAuth()`**: Verifies authentication status by calling `/auth/profile` endpoint
- **Authentication state management**: Uses BehaviorSubjects to track user and authentication status
- **Automatic state updates**: Updates authentication state based on API responses
- **Error handling**: Clears authentication state on errors

### 2. AppComponent (`src/app/app.component.ts`)

- **Auto-login on startup**: Calls `checkAuth()` when the application initializes
- **Smart navigation**: Redirects users based on authentication status
- **Loading state**: Shows loading indicator during authentication check

### 3. AuthGuard (`src/app/core/guards/auth.guard.ts`)

- **Route protection**: Prevents access to protected routes for unauthenticated users
- **Auto-authentication**: Attempts to authenticate user before denying access
- **Automatic redirects**: Sends unauthenticated users to login page

### 4. AuthInterceptor (`src/app/core/interceptors/auth.interceptor.ts`)

- **401 handling**: Automatically handles unauthorized responses
- **State cleanup**: Clears authentication state on 401 errors
- **Auto-redirect**: Redirects to login page when session expires

## How It Works

### Application Startup Flow

1. **App initializes** → `AppComponent.ngOnInit()`
2. **Auto-login attempt** → `AuthService.checkAuth()`
3. **API call** → `GET /auth/profile` with `withCredentials: true`
4. **Success**: User data stored, authentication state set to true
5. **Failure**: Authentication state cleared, redirect to login if needed

### Authentication State Management

```typescript
// Observable streams for reactive updates
user$: Observable<any>                    // Current user data
isAuthenticated$: Observable<boolean>     // Authentication status
isLoading$: Observable<boolean>          // Loading state
```

### Cookie Configuration

The implementation uses `withCredentials: true` in HTTP requests to:
- Send HTTP cookies with each request
- Allow the backend to set/read JWT tokens in cookies
- Maintain session across browser refreshes

## Backend Requirements

Your backend should:

1. **Set HTTP cookies** when user logs in successfully
2. **Validate cookies** on protected endpoints
3. **Return user profile** from `/auth/profile` endpoint
4. **Clear cookies** on logout
5. **Return 401** for invalid/expired tokens

### Example Backend Endpoints

```javascript
// Login endpoint - sets HTTP cookie
POST /auth/login
Request: { email: "user@example.com", password: "password123" }
Response: { user: {...}, message: "Login successful" }
Set-Cookie: token=jwt_token; HttpOnly; Secure; SameSite=Strict

// Profile endpoint - validates cookie
GET /auth/profile
Cookie: token=jwt_token
Response: { id: 1, email: "user@example.com", name: "User" }

// Logout endpoint - clears cookie
POST /auth/logout
Response: { message: "Logged out successfully" }
Set-Cookie: token=; expires=Thu, 01 Jan 1970 00:00:00 GMT

// Google OAuth endpoint
GET /auth/google
Response: Redirects to Google OAuth, then back to your app with cookie set
```

## Usage Examples

### Login Component

```typescript
// Regular form-based login
onLogin() {
  this.authService.login(this.loginForm).subscribe({
    next: (response) => {
      console.log('Login successful:', response);
      this.router.navigate(['/']);
    },
    error: (error) => {
      this.errorMessage = error.error?.message || 'Login failed';
    }
  });
}

// Google OAuth login
onClickGoogle() {
  window.location.href = 'http://localhost:7200/auth/google';
}
```

### Protected Routes

```typescript
// app.routes.ts
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]  // Protects this route
    },
    {
        path: 'auth',
        component: AuthenticationComponent,
        children: [...authRoutes]
    }
];
```

### Home Component - User Info Display

```typescript
export class HomeComponent implements OnInit {
  user$ = this.authService.user$;
  isAuthenticated$ = this.authService.isAuthenticated$;

  constructor(private authService: AuthService) {}

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => console.log('Logout successful'),
      error: (error) => console.error('Logout failed:', error)
    });
  }
}
```

### Check Authentication Status

```typescript
// In any component
constructor(private authService: AuthService) {
  // Subscribe to authentication state
  this.authService.isAuthenticated$.subscribe(isAuth => {
    console.log('User authenticated:', isAuth);
  });
  
  // Subscribe to user data
  this.authService.user$.subscribe(user => {
    console.log('Current user:', user);
  });
}

// Get current user synchronously
const currentUser = this.authService.getCurrentUser();

// Check if user is authenticated
const isAuthenticated = this.authService.isAuthenticated();
```

## Available Methods

### AuthService Methods

```typescript
// Authentication methods
checkAuth(): Observable<any>              // Auto-login check
login(credentials): Observable<any>       // Login user
logout(): Observable<any>                 // Logout user
register(userData): Observable<any>       // Register new user
getProfile(): Observable<any>             // Get user profile

// State methods
getCurrentUser(): any                     // Get current user (sync)
isAuthenticated(): boolean               // Check auth status (sync)
clearAuthenticationState(): void         // Clear auth state

// Observable streams
user$: Observable<any>                   // User data stream
isAuthenticated$: Observable<boolean>    // Auth status stream
isLoading$: Observable<boolean>          // Loading state stream
```

## Flow Diagrams

### Auto-Login Flow
```
App Start → AppComponent.ngOnInit() → performAutoLogin()
    ↓
AuthService.checkAuth() → HTTP GET /auth/profile (withCredentials: true)
    ↓
Success: setAuthenticationState(user) → Navigate to intended route
    ↓
Failure: clearAuthenticationState() → Navigate to /auth/login
```

### Login Flow
```
User submits form → AuthService.login(credentials)
    ↓
HTTP POST /auth/login (withCredentials: true)
    ↓
Backend sets HTTP cookie → Returns user data
    ↓
setAuthenticationState(user) → Navigate to home
```

### Route Protection Flow
```
User navigates to protected route → AuthGuard.canActivate()
    ↓
Check isAuthenticated() → true: Allow access
    ↓
false: Call checkAuth() → Success: Allow access
    ↓
Failure: Redirect to /auth/login
```

## Security Best Practices

### Frontend Security
- All HTTP requests use `withCredentials: true`
- No JWT tokens stored in localStorage/sessionStorage
- Automatic session cleanup on 401 responses
- Protected routes with authentication guards

### Backend Security Requirements
```javascript
// Cookie configuration
res.cookie('token', jwtToken, {
  httpOnly: true,        // Prevents XSS attacks
  secure: true,          // HTTPS only
  sameSite: 'strict',    // CSRF protection
  maxAge: 24 * 60 * 60 * 1000  // 24 hours
});
```

## Testing the Implementation

### 1. Test Auto-Login
```bash
# Start your backend server
# Navigate to your app
# Login with valid credentials
# Refresh the page - you should remain logged in
```

### 2. Test Session Expiration
```bash
# Login to the app
# Stop backend server (simulate server restart)
# Try to navigate - should redirect to login
```

### 3. Test Route Protection
```bash
# Open app in incognito mode
# Try to access / - should redirect to /auth/login
# Login - should redirect back to /
```

### 4. Test Logout
```bash
# Login to the app
# Click logout button
# Check that you're redirected to login
# Try to access protected routes - should be blocked
```

## Troubleshooting

### Common Issues

1. **CORS Issues**
   ```javascript
   // Backend CORS configuration
   app.use(cors({
     origin: 'http://localhost:4200',
     credentials: true
   }));
   ```

2. **Cookie Not Being Set**
   - Check if backend is setting `Set-Cookie` header
   - Verify `withCredentials: true` in frontend requests
   - Ensure same domain for frontend and backend

3. **Auto-login Not Working**
   - Check browser dev tools for cookie presence
   - Verify `/auth/profile` endpoint returns user data
   - Check console for authentication errors

4. **Infinite Redirects**
   - Ensure auth routes don't have AuthGuard
   - Check route configuration for circular redirects

### Debug Tips

```typescript
// Add debugging to AuthService
checkAuth(): Observable<any> {
  console.log('🔍 Checking authentication...');
  this.isLoadingSubject.next(true);
  
  return this.http.get(`${this.apiUrl}/profile`, {
    withCredentials: true
  }).pipe(
    tap((user: any) => {
      console.log('✅ Auto-login successful:', user);
      this.setAuthenticationState(user);
    }),
    catchError((error) => {
      console.log('❌ Auto-login failed:', error);
      this.clearAuthenticationState();
      return throwError(() => error);
    })
  );
}
```

## Benefits

1. **Seamless User Experience**: Users don't need to log in repeatedly
2. **Secure**: JWT tokens stored in HTTP-only cookies (not accessible via JavaScript)
3. **Automatic**: No manual session management required
4. **Reactive**: UI updates automatically based on authentication state
5. **Error Handling**: Graceful handling of expired sessions and network errors
6. **Mobile Friendly**: Works across browser refreshes and mobile app switches

## Migration Notes

If you're migrating from localStorage-based authentication:

1. **Remove localStorage calls** from existing auth code
2. **Update API calls** to include `withCredentials: true`
3. **Update backend** to use HTTP cookies instead of Authorization headers
4. **Test thoroughly** across different browsers and scenarios

This implementation provides a robust, secure, and user-friendly authentication system that handles auto-login seamlessly using HTTP cookies. 