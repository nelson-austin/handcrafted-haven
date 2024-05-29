export interface CardProps {
  cardId: string;
  cardImage: string;
  name: string;
  price: number;
  description: string;
}

export type Product = {
  id: string;
  user_id: string;
  name: string;
  image_id: string;
  image: string;
  description: string;
  price: number;
  quantity_available: number;
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
  product_id: string;
  quantity: number;
  total_price: number;
  order_date?: Date;
};

export type Invoice = {
  id: string;
  name: string;
  email: string;
  total_price: number;
  order_date?: Date;
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
