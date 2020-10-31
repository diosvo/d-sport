export interface ClassifyModelServer {
    id: number;
   name: string;
}

export interface ClassifyServerResponse {
    classify: ClassifyModelServer[];
}