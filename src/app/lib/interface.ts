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
};

export type Order ={
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  total_price: number;
  date?: Date;
}

export type Review = {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  date: string;
  name: string;
};
