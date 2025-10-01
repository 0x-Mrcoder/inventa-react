import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppContextType, User, Customer, Product, Sale, Return, Payment, Theme } from '../types';
import { themes } from '../styles/theme';

// Sample Data - Exact match from HTML version
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Cement Bag (50kg)',
    description: 'High quality cement for construction',
    price: 2500,
    cost: 2000,
    stock: 100,
    category: 'Cement',
    sku: 'CEM-50KG',
    image: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Steel Rod (12mm)',
    description: 'Reinforcement steel rod',
    price: 1800,
    cost: 1500,
    stock: 50,
    category: 'Steel',
    sku: 'STL-12MM',
    image: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Sand (Truck Load)',
    description: 'Fine sand for construction',
    price: 18000,
    cost: 15000,
    stock: 5,
    category: 'Aggregates',
    sku: 'SND-TRUCK',
    image: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Paint (White)',
    description: 'High quality white paint',
    price: 3500,
    cost: 2800,
    stock: 5,
    category: 'Paint',
    sku: 'PNT-WHT',
    image: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Nails (2 inches)',
    description: 'Construction nails 2 inches',
    price: 800,
    cost: 600,
    stock: 15,
    category: 'Hardware',
    sku: 'NLS-2IN',
    image: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'PVC Pipes (4 inches)',
    description: 'PVC pipes for plumbing',
    price: 2500,
    cost: 2000,
    stock: 8,
    category: 'Plumbing',
    sku: 'PVC-4IN',
    image: null,
    createdAt: new Date().toISOString(),
  }
];

const sampleCustomers: Customer[] = [
  {
    id: '1',
    name: 'Aliyu Mohammed',
    email: 'aliyu@email.com',
    phone: '08012345678',
    address: 'Kaduna, Nigeria',
    creditLimit: 5000,
    status: 'active',
    lastPurchase: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Fatima Ibrahim',
    email: 'fatima@email.com',
    phone: '08087654321',
    address: 'Abuja, Nigeria',
    creditLimit: 0,
    status: 'active',
    lastPurchase: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  }
];

const sampleSales: Sale[] = [
  {
    id: '1',
    date: new Date().toISOString(),
    customer: 'Walk-in Customer',
    items: [
      { productId: '1', name: 'Cement Bag (50kg)', price: 2500, quantity: 2 }
    ],
    total: 5000,
    paymentMethod: 'cash',
    type: 'normal',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    customer: 'Aliyu Mohammed',
    items: [
      { productId: '2', name: 'Steel Rod (12mm)', price: 1800, quantity: 5 }
    ],
    total: 9000,
    paymentMethod: 'transfer',
    type: 'credit',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  }
];

// Initial State
const initialState: AppState = {
  user: null,
  theme: 'green',
  sidebarCollapsed: false,
  customers: sampleCustomers,
  products: sampleProducts,
  sales: sampleSales,
  returns: [],
  payments: [],
  loading: false,
  error: null,
};

// Action Types
type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'ADD_CUSTOMER'; payload: Customer }
  | { type: 'UPDATE_CUSTOMER'; payload: { id: string; customer: Partial<Customer> } }
  | { type: 'DELETE_CUSTOMER'; payload: string }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: { id: string; product: Partial<Product> } }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'ADD_SALE'; payload: Sale }
  | { type: 'UPDATE_SALE'; payload: { id: string; sale: Partial<Sale> } }
  | { type: 'DELETE_SALE'; payload: string }
  | { type: 'ADD_RETURN'; payload: Return }
  | { type: 'UPDATE_RETURN'; payload: { id: string; returnData: Partial<Return> } }
  | { type: 'DELETE_RETURN'; payload: string }
  | { type: 'ADD_PAYMENT'; payload: Payment }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case 'ADD_CUSTOMER':
      return { ...state, customers: [...state.customers, action.payload] };
    case 'UPDATE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.map(customer =>
          customer.id === action.payload.id
            ? { ...customer, ...action.payload.customer }
            : customer
        ),
      };
    case 'DELETE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.filter(customer => customer.id !== action.payload),
      };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id
            ? { ...product, ...action.payload.product }
            : product
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
      };
    case 'ADD_SALE':
      return { ...state, sales: [...state.sales, action.payload] };
    case 'UPDATE_SALE':
      return {
        ...state,
        sales: state.sales.map(sale =>
          sale.id === action.payload.id
            ? { ...sale, ...action.payload.sale }
            : sale
        ),
      };
    case 'DELETE_SALE':
      return {
        ...state,
        sales: state.sales.filter(sale => sale.id !== action.payload),
      };
    case 'ADD_RETURN':
      return { ...state, returns: [...state.returns, action.payload] };
    case 'UPDATE_RETURN':
      return {
        ...state,
        returns: state.returns.map(returnData =>
          returnData.id === action.payload.id
            ? { ...returnData, ...action.payload.returnData }
            : returnData
        ),
      };
    case 'DELETE_RETURN':
      return {
        ...state,
        returns: state.returns.filter(returnData => returnData.id !== action.payload),
      };
    case 'ADD_PAYMENT':
      return { ...state, payments: [...state.payments, action.payload] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setUser: (user: User | null) => dispatch({ type: 'SET_USER', payload: user }),
    setTheme: (theme: Theme) => dispatch({ type: 'SET_THEME', payload: theme }),
    toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
    addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => {
      const newCustomer: Customer = {
        ...customer,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: 'ADD_CUSTOMER', payload: newCustomer });
    },
    updateCustomer: (id: string, customer: Partial<Customer>) =>
      dispatch({ type: 'UPDATE_CUSTOMER', payload: { id, customer } }),
    deleteCustomer: (id: string) => dispatch({ type: 'DELETE_CUSTOMER', payload: id }),
    addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => {
      const newProduct: Product = {
        ...product,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    },
    updateProduct: (id: string, product: Partial<Product>) =>
      dispatch({ type: 'UPDATE_PRODUCT', payload: { id, product } }),
    deleteProduct: (id: string) => dispatch({ type: 'DELETE_PRODUCT', payload: id }),
    addSale: (sale: Omit<Sale, 'id' | 'createdAt'>) => {
      const newSale: Sale = {
        ...sale,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: 'ADD_SALE', payload: newSale });
    },
    updateSale: (id: string, sale: Partial<Sale>) =>
      dispatch({ type: 'UPDATE_SALE', payload: { id, sale } }),
    deleteSale: (id: string) => dispatch({ type: 'DELETE_SALE', payload: id }),
    addReturn: (returnData: Omit<Return, 'id' | 'createdAt'>) => {
      const newReturn: Return = {
        ...returnData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: 'ADD_RETURN', payload: newReturn });
    },
    updateReturn: (id: string, returnData: Partial<Return>) =>
      dispatch({ type: 'UPDATE_RETURN', payload: { id, returnData } }),
    deleteReturn: (id: string) => dispatch({ type: 'DELETE_RETURN', payload: id }),
    addPayment: (payment: Omit<Payment, 'id' | 'createdAt'>) => {
      const newPayment: Payment = {
        ...payment,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: 'ADD_PAYMENT', payload: newPayment });
    },
    setLoading: (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error: string | null) => dispatch({ type: 'SET_ERROR', payload: error }),
  };

  const theme = themes[state.theme];

  return (
    <AppContext.Provider value={{ state, actions, theme }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
