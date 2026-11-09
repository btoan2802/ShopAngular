import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
    private readonly storageKey = 'cart';
    readonly items = signal<CartItem[]>(this.loadFromStorage());

    readonly totalQuantity = computed(() =>
        this.items().reduce((sum, item) => sum + item.quantity, 0)
    );
    readonly totalPrice = computed(() =>
        this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    );

    constructor() {
        effect(() => {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items()));
        });
    }

    private loadFromStorage(): CartItem[] {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : [];
    }

    add(product: Product): void {
        const existing = this.items().find(item => item.product.id === product.id);

        if (existing) {
            this.increase(product.id);
        } else {
            this.items.update(items => [...items, { product, quantity: 1 }]);
        }
    }
    remove(productId: number): void {
        this.items.update(items => items.filter(item => item.product.id !== productId));
    }
    increase(productId: number): void {
        this.items.update(items =>
            items.map(item =>
                item.product.id === productId && item.quantity < item.product.stock
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    }

    decrease(productId: number): void {
        this.items.update(items =>
            items
                .map(item =>
                    item.product.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    }
    clear(): void {
        this.items.set([]);
    }
}