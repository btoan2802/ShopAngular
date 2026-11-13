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
export interface OrderLine {
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
}

export interface OrderSummary {
    id: number;
    createdAt: string;
    totalPrice: number;
    customerName: string;
    address: string;
    items: OrderLine[];
}