import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOrderRequest, OrderResponse } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
    private readonly apiUrl = 'https://localhost:7241/api/Order';

    constructor(private http: HttpClient) { }

    create(request: CreateOrderRequest): Observable<OrderResponse> {
        return this.http.post<OrderResponse>(this.apiUrl, request);
    }
}