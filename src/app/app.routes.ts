import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'auth',
        loadChildren : ()=>import('./Auth/auth.module').then(m=>m.AuthModule),
        data : {breadcrumb : 'Auth'}
    },
    {
        path: 'main',
        loadChildren : ()=>import('./components/components.module').then(m=>m.ComponentsModule),
        data : {breadcrumb : 'Main'}
    }
 ];
