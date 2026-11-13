import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CreateOrderRequest, OrderResponse, OrderSummary } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
    private readonly apiUrl = 'https://localhost:7241/api/Order';

    constructor(private http: HttpClient) { }

    create(request: CreateOrderRequest): Observable<OrderResponse> {
        return this.http.post<OrderResponse>(this.apiUrl, request);
    }

    getMyOrders(): Observable<OrderSummary[]> {
        return this.http.get<OrderSummary[]>(`${this.apiUrl}/my`).pipe(
            map(orders =>
                orders.map(order => ({
                    ...order,
                    createdAt: order.createdAt.endsWith('Z') ? order.createdAt : order.createdAt + 'Z',
                }))
            )
        );
    }
}