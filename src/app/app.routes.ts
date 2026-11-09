import { Routes } from '@angular/router';
import { ProductList } from './pages/product-list/product-list';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Cart } from './pages/cart/cart';

export const routes: Routes = [
    { path: '', component: ProductList },
    { path: 'product/:id', component: ProductDetail },
    { path: 'cart', component: Cart }
];