import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ProductService } from '../../services/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SanPham } from '../../models/san-pham';

@Component({
  selector: 'app-product-detail',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  protected readonly sanPham = signal<SanPham | null>(null);
  protected readonly loi = signal('');

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');

    this.productService.getById(id)
      .subscribe({
        next: data => this.sanPham.set(data),
        error: err => {
          if (err.status === 404) {
            this.loi.set('Không tìm thấy sản phẩm này');
          } else {
            this.loi.set('Không kết nối được máy chủ, vui lòng thử lại sau');
          }
        }
      });
  }
}