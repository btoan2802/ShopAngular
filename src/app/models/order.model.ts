export interface CreateOrderRequest {
    customerName: string;
    phone: string;
    address: string;
    items: { productId: number; quantity: number }[];
}

export interface OrderResponse {
    orderId: number;
    totalPrice: number;
}