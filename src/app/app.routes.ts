import { Routes } from '@angular/router';

export const routes: Routes = [
   
    {
        path:'login',
        loadChildren : ()=>import('./Auth/auth.module').then(m=>m.AuthModule)
    },
    {
        path: 'main',
        loadChildren : ()=>import('./components/components.module').then(m=>m.ComponentsModule)
    }
 ];
