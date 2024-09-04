import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';

export const routes: Routes = [
   
    {
        path:'login',
        loadChildren : ()=>import('./Auth/auth.module').then(m=>m.AuthModule)
    },
    {
        path: 'master',
        loadChildren : ()=>import('./master/master.module').then(m=>m.MasterModule)
    }
 ];
