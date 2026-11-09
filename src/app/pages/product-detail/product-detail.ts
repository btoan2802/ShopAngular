import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');

    this.http.get<SanPham>(`https://localhost:7241/api/Product/${id}`)
      .subscribe(data => this.sanPham.set(data));
  }
}