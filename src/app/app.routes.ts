import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'product', loadChildren: () => import('./components/pages/product/product.module').then(m => m.ProductModule)
    },
];
