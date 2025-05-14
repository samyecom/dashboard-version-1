'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { NewOrderFormData, Order } from '@/types/order'; // Assuming your types are here

// Mock function to simulate creating an order (replace with actual API call)
const createOrderApi = async (data: NewOrderFormData): Promise<Order> => {
  console.log("Creating order with data:", data);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate backend generating an ID and structuring the order
  const newOrder: Order = {
    id: `ORD-${Date.now().toString().slice(-6)}`, 
    customer: {
        name: data.customerName,
        email: data.customerEmail,
        phone: data.customerPhone,
        avatar: ''
    },
    orderDate: data.orderDate || new Date().toISOString().split('T')[0], // Default to today if not provided
    itemCount: data.itemCount,
    totalAmount: data.totalAmount,
    status: data.status,
    paymentMethod: data.paymentMethod,
    shippingAddress: data.shippingAddress,
    notes: data.notes,
    // items: [], // In a real scenario, items would be processed here
  };
  console.log("Order created:", newOrder);
  return newOrder;
};


export default function CreateOrderPage() {
  const initialFormData: NewOrderFormData = {
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    itemCount: 1,
    totalAmount: 0,
    status: 'Pending', // Default status
    paymentMethod: '',
    shippingAddress: '',
    notes: '',
    orderDate: new Date().toISOString().split('T')[0], // Default to today
  };

  const [formData, setFormData] = useState<NewOrderFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let processedValue: string | number = value;
    if (type === 'number') {
      // Handle itemCount and totalAmount specifically
      processedValue = value === '' ? 0 : name === 'itemCount' ? parseInt(value, 10) : parseFloat(value);
      if (name === 'itemCount' && processedValue < 0) processedValue = 0;
      if (name === 'totalAmount' && processedValue < 0) processedValue = 0;
    }


    setFormData(prev => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Basic validation example
      if (!formData.customerName || formData.totalAmount <= 0 || formData.itemCount <= 0) {
        setError("Customer Name, Item Count, and a valid Total Amount are required.");
        setLoading(false);
        return;
      }

      const createdOrder = await createOrderApi(formData);
      setSuccessMessage(`Order #${createdOrder.id} for ${createdOrder.customer.name} created successfully!`);
      setFormData(initialFormData); // Reset form
      // Optionally, redirect the user: router.push('/admin/orders');
    } catch (err) {
      console.error("Failed to create order:", err);
      setError("An error occurred while creating the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const inputClass = "w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2.5 bg-transparent text-gray-800 dark:text-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500";
  const labelClass = "block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <>
      <PageBreadcrumb pageTitle="Create New Order" createUrl={null} />

      <div className="mt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Customer Information Section */}
          <div className="p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
              Customer Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="customerName" className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                <input type="text" name="customerName" id="customerName" value={formData.customerName} onChange={handleInputChange} className={inputClass} placeholder="e.g., John Doe" required />
              </div>
              <div>
                <label htmlFor="customerEmail" className={labelClass}>Email Address</label>
                <input type="email" name="customerEmail" id="customerEmail" value={formData.customerEmail || ''} onChange={handleInputChange} className={inputClass} placeholder="e.g., john.doe@example.com" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="customerPhone" className={labelClass}>Phone Number</label>
                <input type="tel" name="customerPhone" id="customerPhone" value={formData.customerPhone || ''} onChange={handleInputChange} className={inputClass} placeholder="e.g., (555) 123-4567" />
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
                <input type="date" name="orderDate" id="orderDate" value={formData.orderDate || ''} onChange={handleInputChange} className={inputClass} />
              </div>
              <div>
                <label htmlFor="status" className={labelClass}>Order Status</label>
                <select name="status" id="status" value={formData.status} onChange={handleInputChange} className={inputClass}>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
              <div>
                <label htmlFor="itemCount" className={labelClass}>Number of Items <span className="text-red-500">*</span></label>
                <input type="number" name="itemCount" id="itemCount" value={formData.itemCount} onChange={handleInputChange} className={inputClass} min="1" placeholder="e.g., 3" required />
              </div>
              <div>
                <label htmlFor="totalAmount" className={labelClass}>Total Amount <span className="text-red-500">*</span></label>
                <input type="number" name="totalAmount" id="totalAmount" value={formData.totalAmount} onChange={handleInputChange} className={inputClass} min="0" step="0.01" placeholder="e.g., 199.99" required />
              </div>
               <div className="md:col-span-2">
                <label htmlFor="paymentMethod" className={labelClass}>Payment Method</label>
                <input type="text" name="paymentMethod" id="paymentMethod" value={formData.paymentMethod || ''} onChange={handleInputChange} className={inputClass} placeholder="e.g., Credit Card, PayPal" />
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
                    <textarea name="shippingAddress" id="shippingAddress" value={formData.shippingAddress || ''} onChange={handleInputChange} rows={4} className={inputClass} placeholder="Enter full shipping address..."></textarea>
                </div>
                <div>
                    <label htmlFor="notes" className={labelClass}>Order Notes (Optional)</label>
                    <textarea name="notes" id="notes" value={formData.notes || ''} onChange={handleInputChange} rows={3} className={inputClass} placeholder="Any special instructions or notes for this order..."></textarea>
                </div>
            </div>
          </div>


            {/* Messages and Actions */}
            <div className="mt-8">
                {error && (
                <div className="mb-6 p-4 text-sm text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-300 rounded-lg" role="alert">
                    <span className="font-medium">Error:</span> {error}
                </div>
                )}
                {successMessage && (
                <div className="mb-6 p-4 text-sm text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-lg" role="alert">
                    <span className="font-medium">Success:</span> {successMessage}
                </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => setFormData(initialFormData)}
                        disabled={loading}
                        className="px-6 py-3 w-full sm:w-auto text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-60"
                    >
                        Reset Form
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 w-full sm:w-auto text-sm font-medium rounded-lg bg-brand-500 hover:bg-brand-600 text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-opacity-50"
                    >
                        {loading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating Order...
                        </div>
                        ) : (
                        'Create Order'
                        )}
                    </button>
                </div>
            </div>
        </form>
      </div>
    </>
  );
} 