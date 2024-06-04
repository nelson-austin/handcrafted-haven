export interface CardProps {
  cardId: string;
  cardImage: string;
  name: string;
  price: number;
  description: string;
}

export interface Item {
  id: string;
  user_id: string;
  product_id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  quantity_available: number;
  image_id: string | null;
  quantity: number;
}

export type Product = {
  id: string;
  product_id: string
  user_id: string;
  name: string;
  image_id: string;
  image: string;
  description: string;
  price: number;
  quantity_available: number;
  category_id?: number,
  category_name?: string,
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  is_seller: boolean;
  business_name: string;
  image: string;
  image_id: string;
};

export type Order = {
  id: string;
  user_id: string;
  order_date: Date;
};

export type OrderItem = {
  product_id: string;
  quantity: number;
  price: number;
};

export type Invoice = {
  id: string;
  user_name: string;
  user_email: string;
  total_price: number;
  invoice_date: Date;
};

export type InvoiceDetail = {
  id: string;
  product_image: string;
  product_image_id: string;
  product_name: string;
  quantity: number;
  price: number;
};

export type Review = {
  id: string;
  product_id: string;
  user_id: string;
  rating: string;
  comment: string;
  date: Date;
  name: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Quantity = {
  id: string;
  quantity_available: number;
}

export type Company = {
  id: string;
  user_id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  quantity_available: number;
  image_id: string,
  email: string;
  password: string;
  is_seller: boolean;
  business_name: string;
};