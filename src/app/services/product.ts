import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private readonly apiUrl = 'https://localhost:7241/api/Product';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    getById(id: string | null): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }
}