import { Component, OnInit, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-admin-products',
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})
export class AdminProducts implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);

  protected readonly products = signal<Product[]>([]);
  protected readonly editingId = signal<number | null>(null);
  protected readonly submitting = signal(false);
  protected readonly successMessage = signal('');
  protected readonly errorMessage = signal('');

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getAll().subscribe(data => this.products.set(data));
  }

  startEdit(product: Product): void {
    this.editingId.set(product.id);
    this.successMessage.set('');
    this.errorMessage.set('');
    this.form.setValue({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.form.reset();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    const request = this.form.getRawValue();
    const id = this.editingId();
    const call$ = id === null
      ? this.productService.create(request)
      : this.productService.update(id, request);

    call$.subscribe({
      next: () => {
        this.successMessage.set(id === null ? 'Đã thêm sản phẩm' : 'Đã cập nhật sản phẩm');
        this.cancelEdit();
        this.submitting.set(false);
        this.loadProducts();
      },
      error: () => {
        this.errorMessage.set('Lưu thất bại, vui lòng kiểm tra lại');
        this.submitting.set(false);
      },
    });
  }

  remove(product: Product): void {
    if (!confirm(`Xoá sản phẩm "${product.name}"?`)) {
      return;
    }

    this.successMessage.set('');
    this.errorMessage.set('');

    this.productService.delete(product.id).subscribe({
      next: () => {
        this.successMessage.set('Đã xoá sản phẩm');
        this.loadProducts();
      },
      error: err => {
        this.errorMessage.set(
          typeof err.error === 'string' ? err.error : 'Xoá thất bại, vui lòng thử lại'
        );
      },
    });
  }
}