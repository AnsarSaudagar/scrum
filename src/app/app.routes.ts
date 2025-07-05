import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { AuthenticationComponent } from './layout/components/authentication/authentication.component';
import { HomeComponent } from './layout/components/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { OrganizationsComponent } from './features/organizations/organizations.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: OrganizationsComponent,
            },
            {
                path: 'organizations',
                component: OrganizationsComponent
            }
        ]
    },
    {
        path: 'auth',
        component: AuthenticationComponent,
        children: [
            ...authRoutes
        ]
    }
];
