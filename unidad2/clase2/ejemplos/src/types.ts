export interface Category {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  categoryId: string | null;
  createdAt: string;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  orderId: string;
  status: "CONFIRMED" | "PENDING" | "FAILED";
}

export interface PaymentResponseCache {
  status: number;
  body: Payment;
}

export interface ProductsQuery {
  page?: string;
  limit?: string;
  sort?: string;
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  status?: string;
  tags?: string; // CSV "a,b,c"
}
