export interface OrderModelServer {
    id: number;
    orderer: string;
    order_date: Date;
    ship_address: string;
    receiver: string;
    receiver_phone: string;
    total: number;
}

export interface ServerResponse {
    count: number;
    orders: OrderModelServer[];
} 