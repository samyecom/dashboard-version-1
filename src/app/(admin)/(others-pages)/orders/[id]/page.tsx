'use client';

import React, { useEffect, useState, FormEvent, ChangeEvent, use } from 'react';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import Badge from "@/components/ui/badge/Badge"; // Adjust path to your Badge component
import { Order, OrderEditFormData } from '@/types/order';

// --- Mock Data & API Functions (Replace with your actual API calls) ---
// This mock database will be "updated" by the mock API function.
const mockOrderDatabase: Order[] = [
  {
    id: "ORD-2024-001",
    customer: {
      id: "CUST-001", name: "Alice Wonderland", email: "alice@example.com",
      avatar: ''
    },
    orderDate: "2024-07-28", totalAmount: 150.75, status: "Delivered", itemCount: 3, paymentMethod: "Credit Card", shippingAddress: "123 Main St, Wonderland", notes: "Gift wrap please."
  },
  {
    id: "ORD-2024-002",
    customer: {
      id: "CUST-002", name: "Bob The Builder", email: "bob@example.com",
      avatar: ''
    },
    orderDate: "2024-07-27", totalAmount: 89.99, status: "Shipped", itemCount: 1, paymentMethod: "PayPal", shippingAddress: "456 Fixit Ave, Builderville"
  },
  {
    id: "ORD-2024-003",
    customer: {
      id: "CUST-003", name: "Charlie Brown", email: "charlie@example.com",
      avatar: ''
    },
    orderDate: "2024-07-26", totalAmount: 230.00, status: "Processing", itemCount: 5, paymentMethod: "Stripe", shippingAddress: "789 Good Grief Ln, Peanuts Town"
  },
];

const getOrderByIdApi = async (id: string): Promise<Order | null> => {
  console.log(`API: Fetching order with ID: ${id}`);
  await new Promise(resolve => setTimeout(resolve, 300));
  const order = mockOrderDatabase.find(o => o.id === id);
  return order ? { ...order, customer: { ...order.customer } } : null; // Return copies
};

const updateOrderApi = async (id: string, data: OrderEditFormData): Promise<Order | null> => {
  console.log(`API: Updating order with ID: ${id}`, data);
  await new Promise(resolve => setTimeout(resolve, 500));
  const orderIndex = mockOrderDatabase.findIndex(o => o.id === id);
  if (orderIndex !== -1) {
    // Update the order in our "database"
    const existingOrder = mockOrderDatabase[orderIndex];
    mockOrderDatabase[orderIndex] = {
      ...existingOrder,
      customer: {
        ...existingOrder.customer,
        name: data.customerName,
        email: data.customerEmail,
        phone: data.customerPhone,
      },
      orderDate: data.orderDate || existingOrder.orderDate,
      itemCount: data.itemCount,
      totalAmount: data.totalAmount,
      status: data.status,
      paymentMethod: data.paymentMethod,
      shippingAddress: data.shippingAddress,
      notes: data.notes,
    };
    return { ...mockOrderDatabase[orderIndex], customer: { ...mockOrderDatabase[orderIndex].customer } }; // Return a copy
  }
  return null;
};
// --- End Mock Data & API Functions ---

interface PageParams {
  id: string;
}

type EditOrderPageProps = {
  params: PageParams | Promise<PageParams>;
};

export default function EditOrderPage({ params }: EditOrderPageProps) {
  const resolvedParams: PageParams =
    typeof (params as Promise<PageParams>)?.then === 'function'
      ? use(params as Promise<PageParams>)
      : (params as PageParams);

  const { id } = resolvedParams || {};
  const [order, setOrder] = useState<Order | null>(null);
  const [formData, setFormData] = useState<OrderEditFormData>({} as OrderEditFormData); // Initialize properly
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Start in view mode, allow toggle to edit
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchOrderDetails = async () => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
          const fetchedOrder = await getOrderByIdApi(id);
          if (fetchedOrder) {
            setOrder(fetchedOrder);
            setFormData({
              customerName: fetchedOrder.customer.name,
              customerEmail: fetchedOrder.customer.email || '',
              customerPhone: fetchedOrder.customer.phone || '',
              orderDate: fetchedOrder.orderDate,
              itemCount: fetchedOrder.itemCount,
              totalAmount: fetchedOrder.totalAmount,
              status: fetchedOrder.status,
              paymentMethod: fetchedOrder.paymentMethod || '',
              shippingAddress: fetchedOrder.shippingAddress || '',
              notes: fetchedOrder.notes || '',
            });
          } else {
            setError(`Order with ID '${id}' not found.`);
            setOrder(null);
          }
        } catch (err) {
          console.error("Failed to fetch order:", err);
          setError("Failed to load order details.");
          setOrder(null);
        } finally {
          setLoading(false);
        }
      };
      fetchOrderDetails();
    } else if (resolvedParams && !id) {
      setError("Order ID is missing in route parameters.");
      setLoading(false);
      setOrder(null);
    } else if (!resolvedParams) {
      setError("Route parameters are unavailable.");
      setLoading(false);
      setOrder(null);
    }
  }, [id, resolvedParams]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let processedValue: string | number = value;
    if (type === 'number') {
      processedValue = value === '' ? 0 : name === 'itemCount' ? parseInt(value, 10) : parseFloat(value);
      if (name === 'itemCount' && processedValue < 0) processedValue = 0;
      if (name === 'totalAmount' && processedValue < 0) processedValue = 0;
    }
    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!order) return;

    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      if (!formData.customerName || formData.totalAmount <= 0 || formData.itemCount <= 0) {
        setError("Customer Name, Item Count, and a valid Total Amount are required.");
        setLoading(false);
        return;
      }
      const updatedOrder = await updateOrderApi(order.id, formData);
      if (updatedOrder) {
        setOrder(updatedOrder); // Update displayed order
        setFormData({ // Reset formData to reflect saved state
          customerName: updatedOrder.customer.name,
          customerEmail: updatedOrder.customer.email || '',
          customerPhone: updatedOrder.customer.phone || '',
          orderDate: updatedOrder.orderDate,
          itemCount: updatedOrder.itemCount,
          totalAmount: updatedOrder.totalAmount,
          status: updatedOrder.status,
          paymentMethod: updatedOrder.paymentMethod || '',
          shippingAddress: updatedOrder.shippingAddress || '',
          notes: updatedOrder.notes || '',
        });
        setIsEditing(false); // Exit editing mode
        setSuccessMessage(`Order #${updatedOrder.id} updated successfully!`);
      } else {
        setError("Failed to update order. Please try again.");
      }
    } catch (err) {
      console.error("Failed to update order:", err);
      setError("An error occurred while updating the order.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !order) { // Initial loading state before order data is available
    return (
      <div>
        <PageBreadcrumb pageTitle="Loading Order..." />
        <div className="mt-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg text-center">
          <p>Loading order details, please wait...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PageBreadcrumb pageTitle="Error" />
        <div className="mt-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg text-red-500 text-center">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!order) { // Order not found after attempting to load (and not in initial loading phase)
    return (
      <div>
        <PageBreadcrumb pageTitle="Order Not Found" />
        <div className="mt-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg text-center">
          <p>The requested order (ID: {id}) could not be found.</p>
        </div>
      </div>
    );
  }

  const inputClass = "w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2.5 bg-transparent text-gray-800 dark:text-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed";
  const labelClass = "block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300";
  const viewTextClass = "text-gray-700 dark:text-gray-200 py-2.5 min-h-[42px] flex items-center"; // Ensure same height as input

  return (
    <>
      <PageBreadcrumb pageTitle={isEditing ? `Edit Order: #${order.id}` : `Order Details: #${order.id}`} />

      <div className="mt-6">
        <form onSubmit={handleFormSubmit} className="space-y-8">
          {/* Messages are now above the main form card for better visibility */}
          {error && (
            <div className="p-4 text-sm text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-300 rounded-lg" role="alert">
              <span className="font-medium">Error:</span> {error}
            </div>
          )}
          {successMessage && (
            <div className="p-4 text-sm text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-lg" role="alert">
              <span className="font-medium">Success:</span> {successMessage}
            </div>
          )}

          {/* Customer Information Section */}
          <div className="p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Customer Information
              </h2>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2.5 text-sm font-medium rounded-lg bg-brand-500 hover:bg-brand-600 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-opacity-50 w-full sm:w-auto"
                >
                  Edit Order
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="customerName" className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                {isEditing ? <input type="text" name="customerName" id="customerName" value={formData.customerName} onChange={handleInputChange} className={inputClass} required /> : <p className={viewTextClass}>{order.customer.name}</p>}
              </div>
              <div>
                <label htmlFor="customerEmail" className={labelClass}>Email Address</label>
                {isEditing ? <input type="email" name="customerEmail" id="customerEmail" value={formData.customerEmail || ''} onChange={handleInputChange} className={inputClass} /> : <p className={viewTextClass}>{order.customer.email || 'N/A'}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="customerPhone" className={labelClass}>Phone Number</label>
                {isEditing ? <input type="tel" name="customerPhone" id="customerPhone" value={formData.customerPhone || ''} onChange={handleInputChange} className={inputClass} /> : <p className={viewTextClass}>{order.customer.phone || 'N/A'}</p>}
              </div>
            </div>
          </div>

          {/* Order Details Section */}
          <div className="p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
              Order Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="orderDate" className={labelClass}>Order Date</label>
                {isEditing ? <input type="date" name="orderDate" id="orderDate" value={formData.orderDate || ''} onChange={handleInputChange} className={inputClass} /> : <p className={viewTextClass}>{new Date(order.orderDate).toLocaleDateString()}</p>}
              </div>
              <div>
                <label htmlFor="status" className={labelClass}>Order Status</label>
                {isEditing ? (
                  <select name="status" id="status" value={formData.status} onChange={handleInputChange} className={inputClass}>
                    <option value="Delivered">Delivered</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Processing">Processing</option>
                    <option value="Pending">Pending</option>
                  </select>

                ) : <div className={viewTextClass}><Badge size="md" color={order.status === "Delivered" ? "success" : order.status === "Shipped" ? "info" : order.status === "Processing" ? "warning" : order.status === "Pending" ? "info" : "error"}>{order.status}</Badge></div>}
              </div>
              <div>
                <label htmlFor="itemCount" className={labelClass}>Number of Items <span className="text-red-500">*</span></label>
                {isEditing ? <input type="number" name="itemCount" id="itemCount" value={formData.itemCount} onChange={handleInputChange} className={inputClass} min="1" required /> : <p className={viewTextClass}>{order.itemCount}</p>}
              </div>
              <div>
                <label htmlFor="totalAmount" className={labelClass}>Total Amount <span className="text-red-500">*</span></label>
                {isEditing ? <input type="number" name="totalAmount" id="totalAmount" value={formData.totalAmount} onChange={handleInputChange} className={inputClass} min="0" step="0.01" required /> : <p className={viewTextClass}>${order.totalAmount.toFixed(2)}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="paymentMethod" className={labelClass}>Payment Method</label>
                {isEditing ? <input type="text" name="paymentMethod" id="paymentMethod" value={formData.paymentMethod || ''} onChange={handleInputChange} className={inputClass} /> : <p className={viewTextClass}>{order.paymentMethod || 'N/A'}</p>}
              </div>
            </div>
          </div>

          {/* Shipping and Notes Section */}
          <div className="p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
              Shipping & Notes
            </h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="shippingAddress" className={labelClass}>Shipping Address</label>
                {isEditing ? <textarea name="shippingAddress" id="shippingAddress" value={formData.shippingAddress || ''} onChange={handleInputChange} rows={4} className={inputClass}></textarea> : <p className={`${viewTextClass} whitespace-pre-wrap`}>{order.shippingAddress || 'N/A'}</p>}
              </div>
              <div>
                <label htmlFor="notes" className={labelClass}>Order Notes</label>
                {isEditing ? <textarea name="notes" id="notes" value={formData.notes || ''} onChange={handleInputChange} rows={3} className={inputClass}></textarea> : <p className={`${viewTextClass} whitespace-pre-wrap`}>{order.notes || 'N/A'}</p>}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  // Reset formData to original order details if canceling
                  if (order) {
                    setFormData({
                      customerName: order.customer.name, customerEmail: order.customer.email || '', customerPhone: order.customer.phone || '',
                      orderDate: order.orderDate, itemCount: order.itemCount, totalAmount: order.totalAmount, status: order.status,
                      paymentMethod: order.paymentMethod || '', shippingAddress: order.shippingAddress || '', notes: order.notes || ''
                    });
                  }
                }}
                disabled={loading}
                className="px-6 py-3 w-full sm:w-auto text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 w-full sm:w-auto text-sm font-medium rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
} 