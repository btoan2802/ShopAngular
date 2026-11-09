import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
    readonly items = signal<CartItem[]>([]);

    readonly totalQuantity = computed(() =>
        this.items().reduce((sum, item) => sum + item.quantity, 0)
    );
    readonly totalPrice = computed(() =>
        this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    );

    add(product: Product): void {
        const existing = this.items().find(item => item.product.id === product.id);

        if (existing) {
            this.items.update(items =>
                items.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            this.items.update(items => [...items, { product, quantity: 1 }]);
        }
    }
    remove(productId: number): void {
        this.items.update(items => items.filter(item => item.product.id !== productId));
    }
}