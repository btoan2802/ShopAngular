import { Routes } from '@angular/router';
import { ProductList } from './pages/product-list/product-list';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', component: ProductList },
    { path: 'product/:id', component: ProductDetail },
    { path: 'cart', component: Cart },
    { path: 'checkout', component: Checkout, canActivate: [authGuard] },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
];