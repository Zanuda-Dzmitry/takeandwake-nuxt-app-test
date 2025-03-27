export interface User {
  name: string;
  surname: string;
  credentials: {
    username: string;
    passphrase: string;
  };
  active: boolean;
  created: string;
  _comment: string;
}

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  status: "available" | "out_of_stock" | "discontinued";
  price: number;
  date_created: string;
  rating: number;
}
