export interface CategoryInterface {
  id: number;
  parent_id: number;
  slug: string;
  category_id: number;
  language_id: number;
  title?: string;
  description?: string;
  keywords?: string;
  content?: string;
  children?: any;
}
