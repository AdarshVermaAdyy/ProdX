import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'product',
        loadChildren : ()=>import('./product/product.module').then(m=>m.ProductModule)
    }
 ];
