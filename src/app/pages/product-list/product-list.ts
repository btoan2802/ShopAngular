import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SanPham } from '../../models/san-pham';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-product-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  protected readonly sanPhams = signal<SanPham[]>([]);

  constructor(private http: HttpClient) {
    this.http.get<SanPham[]>('https://localhost:7241/api/Product')
      .subscribe(data => this.sanPhams.set(data));
  }
}