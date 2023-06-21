export interface TtproductInterface {
  id: number;
  category_id: number;
  slug: string;
  price: number;
  old_price: number;
  status: number;
  hit: number;
  img: string;
  is_download: number;
  product_id: number;
  language_id: number;
  title: string;
  content: string;
  exerpt: string;
  keywords: string;
  description: string;
  qty?: number;
}
