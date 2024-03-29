export interface OrderModelServer {
    id: number;
    user_id: string;
    receiver: string;
    receiver_phone: string;
    order_date: Date;
    ship_address: string;
    total: number;
}

export interface ServerResponse {
    count: number;
    orders: OrderModelServer[];
} 