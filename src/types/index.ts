// Core Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'employee';
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  creditLimit?: number;
  status: 'active' | 'inactive';
  lastPurchase?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  cost: number;
  stock: number;
  category: string;
  sku: string;
  image?: string | null;
  createdAt: string;
}

export interface Sale {
  id: string;
  date: string;
  customer: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  paymentMethod: 'cash' | 'transfer' | 'card';
  type: 'normal' | 'credit' | 'return';
  createdAt: string;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Return {
  id: string;
  originalSaleId: string;
  date: string;
  items: ReturnItem[];
  refundAmount: number;
  reason: 'defective' | 'wrong_item' | 'customer_change' | 'damaged' | 'other';
  status: 'completed' | 'pending' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface ReturnItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Payment {
  id: string;
  saleId: string;
  customerId: string;
  amount: number;
  method: 'cash' | 'transfer' | 'card';
  date: string;
  notes?: string;
  createdAt: string;
}

// Theme Types
export type Theme = 'green' | 'blue' | 'purple' | 'red' | 'orange';

export interface ThemeConfig {
  primary: string;
  secondary: string;
  primaryLight: string;
  primaryDark: string;
}

// Component Props
export interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export interface HeaderProps {
  title: string;
  subtitle: string;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
}

export interface FilterOptions {
  search: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
  category?: string;
}

// State Types
export interface AppState {
  user: User | null;
  theme: Theme;
  sidebarCollapsed: boolean;
  customers: Customer[];
  products: Product[];
  sales: Sale[];
  returns: Return[];
  payments: Payment[];
  loading: boolean;
  error: string | null;
}

export interface AppContextType {
  state: AppState;
  actions: {
    setUser: (user: User | null) => void;
    setTheme: (theme: Theme) => void;
    toggleSidebar: () => void;
    addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
    updateCustomer: (id: string, customer: Partial<Customer>) => void;
    deleteCustomer: (id: string) => void;
    addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    addSale: (sale: Omit<Sale, 'id' | 'createdAt'>) => void;
    updateSale: (id: string, sale: Partial<Sale>) => void;
    deleteSale: (id: string) => void;
    addReturn: (returnData: Omit<Return, 'id' | 'createdAt'>) => void;
    updateReturn: (id: string, returnData: Partial<Return>) => void;
    deleteReturn: (id: string) => void;
    addPayment: (payment: Omit<Payment, 'id' | 'createdAt'>) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
  };
  theme: ThemeConfig;
}
