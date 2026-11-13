import { Routes } from '@angular/router';
import { ProductList } from './pages/product-list/product-list';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';
import { Register } from './pages/register/register';




export const routes: Routes = [
    { path: 'checkout', component: Checkout, canActivate: [authGuard] },
    { path: '', component: ProductList },
    { path: 'register', component: Register },
    { path: 'product/:id', component: ProductDetail },
    { path: 'cart', component: Cart },
    { path: 'login', component: Login },
    { path: 'checkout', component: Checkout }
];