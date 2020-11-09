export interface ProductModelServer {
    id: number
    title: string
    image: string
    image_1: string
    image_2: string
    image_3: string
    description: string
    price: number
    quantity: number
    another_CatName: string
    categoryName: string
    category_id: number
    classify_id: number
    classify_name: string
}

export interface ServerResponse {
    count: number
    products: ProductModelServer[]
} 