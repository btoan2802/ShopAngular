import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';
import { OrderService } from '../../services/order';
import { CreateOrderRequest } from '../../models/order.model';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, DecimalPipe, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  private readonly fb = inject(FormBuilder);
  protected readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);

  protected readonly submitting = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly orderId = signal<number | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    customerName: ['', [Validators.required, Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.pattern(/^0\d{9}$/)]],
    address: ['', [Validators.required, Validators.maxLength(300)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set('');

    const request: CreateOrderRequest = {
      ...this.form.getRawValue(),
      items: this.cartService.items().map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };

    this.orderService.create(request).subscribe({
      next: res => {
        this.orderId.set(res.orderId);
        this.cartService.clear();
        this.submitting.set(false);
      },
      error: err => {
        this.errorMessage.set(
          typeof err.error === 'string' ? err.error : 'Đặt hàng thất bại, vui lòng thử lại'
        );
        this.submitting.set(false);
      },
    });
  }
}