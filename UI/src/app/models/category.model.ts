export interface CategoryModelServer {
    id: number;
   title: string;
}

export interface CategoryServerResponse {
    categories: CategoryModelServer[];
}