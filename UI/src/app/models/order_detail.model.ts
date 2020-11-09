export interface OrderDetailModelServer {
    id: number;
    user_id: string;
    receiver: string;
    receiver_phone: string;
    order_date: Date;
    ship_address: string;
}

export interface OrderDetailServerResponse {
    count: number;
    orders_details: OrderDetailModelServer[];
}