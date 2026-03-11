export interface OrderProductInterface {
  id?: number;
  user_id?: number;
  status?: number;
  note?: string;
  created_at?: string;
  updated_at?: string;
  total?: number;
  qty?: number;
  product_qty?: number;
  order_id?: number;
  product_id?: number;
  title?: string;
  slug?: string;
  price?: number;
  sum?: number;
  complete?: number;
}
