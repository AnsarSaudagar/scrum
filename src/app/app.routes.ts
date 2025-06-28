import { Routes } from '@angular/router';
import { authRoutes } from './core/auth/auth.routes';
import { AuthenticationComponent } from './layout/components/authentication/authentication.component';
import { HomeComponent } from './layout/components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'auth',
        component: AuthenticationComponent,
        children: [
            ...authRoutes
        ]
    }
];
