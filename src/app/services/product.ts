import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SanPham } from '../models/san-pham';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private readonly apiUrl = 'https://localhost:7241/api/Product';

    constructor(private http: HttpClient) { }

    getAll(): Observable<SanPham[]> {
        return this.http.get<SanPham[]>(this.apiUrl);
    }

    getById(id: string | null): Observable<SanPham> {
        return this.http.get<SanPham>(`${this.apiUrl}/${id}`);
    }
}