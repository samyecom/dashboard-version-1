export interface CustomerInfo {
  avatar: any;
  id?: string; 
  name: string;
  email?: string;
  phone?: string;
  
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Refunded";

export interface Order {
  id: string; 
  customer: CustomerInfo;
  orderDate: string; 
  totalAmount: number;
  status: OrderStatus;
  itemCount: number;
  paymentMethod?: string;
  shippingAddress?: string;
  notes?: string;
  items?: OrderItem[]; 
}


export type NewOrderFormData = {
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  
  
  itemCount: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod?: string;
  shippingAddress?: string;
  notes?: string;
  orderDate?: string; 
};




export type OrderEditFormData = {
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  itemCount: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod?: string;
  shippingAddress?: string;
  notes?: string;
  orderDate?: string;
}; 

export 
const mockOrderData: Order[] = [
  {
    id: "ORD-2024-001",
    customer: {
      id: "CUST-001",
      name: "Alice Wonderland",
      email: "alice@example.com",
      avatar: "/images/user/user-10.jpg", 
    },
    orderDate: "2024-07-28",
    totalAmount: 150.75,
    status: "Delivered",
    itemCount: 3,
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-2024-002",
    customer: {
      id: "CUST-002",
      name: "Bob The Builder",
      email: "bob@example.com",
      avatar: "/images/user/user-11.jpg",
    },
    orderDate: "2024-07-27",
    totalAmount: 89.99,
    status: "Shipped",
    itemCount: 1,
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-2024-003",
    customer: {
      id: "CUST-003",
      name: "Charlie Brown",
      email: "charlie@example.com",
      avatar: "/images/user/user-29.jpg", 
    },
    orderDate: "2024-07-26",
    totalAmount: 230.00,
    status: "Processing",
    itemCount: 5,
    paymentMethod: "Stripe",
  },
  {
    id: "ORD-2024-004",
    customer: {
      id: "CUST-004",
      name: "Diana Prince",
      email: "diana@example.com",
      avatar: "/images/user/user-12.jpg",
    },
    orderDate: "2024-07-25",
    totalAmount: 45.50,
    status: "Pending",
    itemCount: 2,
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-2024-005",
    customer: {
      id: "CUST-001", 
      name: "Alice Wonderland",
      email: "alice@example.com",
      avatar: "/images/user/user-10.jpg",
    },
    orderDate: "2024-07-24",
    totalAmount: 78.20,
    status: "Cancelled",
    itemCount: 1,
    paymentMethod: "PayPal",
  },
];
