import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';

interface SanPham {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

@Component({
  imports: [RouterOutlet, DecimalPipe],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Shop của Toàn');
  protected readonly sanPhams = signal<SanPham[]>([]);

  constructor(private http: HttpClient) {
    this.http.get<SanPham[]>('https://localhost:7241/api/Product')
      .subscribe(data => this.sanPhams.set(data));
  }
}
