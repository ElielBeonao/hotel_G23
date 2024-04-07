import { Routes } from '@angular/router';
import { SidebarLayoutComponent } from './shared/layouts/sidebar-layout/sidebar-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { UserRouteAccessService } from './core/auth/ user-route-access-service';

export const routes: Routes = [
    {
        path: '',
        component: SidebarLayoutComponent,
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'home',
                loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
            },

            {
                path: 'admin',
                loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
            },
            {
                path: 'customer',
                loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
            }
        ]
    },
    {
        path:'',
        component: MainLayoutComponent,
        children: [
            {
                path: 'authentication',
                loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
            },
        ]
    }
    // {
    //     path: '**',
    //     redirectTo: 'error/404'
    // },
    
];
