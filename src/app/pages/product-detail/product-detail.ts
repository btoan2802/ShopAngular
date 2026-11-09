import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ProductService } from '../../services/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-detail',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  protected readonly product = signal<Product | null>(null);
  protected readonly errorMessage = signal('');

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    this.productService.getById(id)
      .subscribe({
        next: data => this.product.set(data),
        error: err => {
          if (err.status === 404) {
            this.errorMessage.set('Không tìm thấy sản phẩm này');
          } else {
            this.errorMessage.set('Không kết nối được máy chủ, vui lòng thử lại sau');
          }
        }
      });
  }
  addToCart(): void {
    const p = this.product();
    if (p) {
      this.cartService.add(p);
    }
  }
}