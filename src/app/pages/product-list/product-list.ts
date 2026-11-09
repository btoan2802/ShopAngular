import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  protected readonly products = signal<Product[]>([]);

  constructor(private productService: ProductService) {
    this.productService.getAll()
      .subscribe(data => this.products.set(data));
  }
}