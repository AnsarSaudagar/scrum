import { Routes } from '@angular/router';
import { authRoutes } from './core/auth/auth.routes';
import { AuthenticationComponent } from './layout/components/authentication/authentication.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        component: AuthenticationComponent,
        children: [
            ...authRoutes
        ]
    }
];
