export interface Menu {
    id: number;
    parent_id: number;
    slug: string;
    category_id: number;
    language_id: number;
    title?: string;
    children?: any;
}
