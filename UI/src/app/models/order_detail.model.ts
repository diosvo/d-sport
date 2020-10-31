export interface OrderDetailModelServer {
    item_number: number;
    product_name: string;
    quantity: number;
    price: number;
}

export interface OrderDetailServerResponse {
    count: number;
    orders_details: OrderDetailModelServer[];
}