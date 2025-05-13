'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { NewProductFormData } from '@/types/products'; // Assuming your types are here

// Mock function to simulate creating a product (replace with actual API call)
const createProductApi = async (data: NewProductFormData): Promise<Product> => {
  console.log("Creating product with data:", data);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Simulate backend generating an ID and returning the full product object
  const newProduct: Product = {
    ...data,
    id: Date.now().toString(), // Example ID generation
    image: data.image || "/images/placeholder.png", // Default image if none provided
    rating: undefined, // Rating typically not set at creation
  };
  console.log("Product created:", newProduct);
  return newProduct;
};

// Define Product interface locally if not importing, for clarity within this file
interface Product {
  id: string;
  image: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: "Active" | "Draft" | "Archived";
  description?: string;
  rating?: number;
}


export default function CreateProductPage() {
  const initialFormData: NewProductFormData = {
    name: '',
    category: '',
    price: '',
    stock: 0,
    status: 'Draft',
    description: '',
    image: '',
  };

  const [formData, setFormData] = useState<NewProductFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let processedValue: string | number = value;
    if (type === 'number') {
      processedValue = value === '' ? 0 : parseFloat(value);
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
      // Basic validation example (add more as needed)
      if (!formData.name || !formData.price) {
        setError("Product Name and Price are required.");
        setLoading(false);
        return;
      }
      if (formData.stock < 0) {
        setError("Stock cannot be negative.");
        setLoading(false);
        return;
      }

      const createdProduct = await createProductApi(formData);
      setSuccessMessage(`Product "${createdProduct.name}" created successfully!`);
      setFormData(initialFormData); // Reset form
      // Optionally, redirect the user or update a list of products
      // router.push('/admin/products');
    } catch (err) {
      console.error("Failed to create product:", err);
      setError("An error occurred while creating the product. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const inputClass = "w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2.5 bg-transparent text-gray-800 dark:text-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500";
  const labelClass = "block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <>
      <PageBreadcrumb pageTitle="Create New Product" />

      <div className="mt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
              Product Information
            </h2>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="md:col-span-2">
                <label htmlFor="name" className={labelClass}>Product Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="e.g., Wireless Bluetooth Headphones"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className={labelClass}>Category</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="e.g., Electronics, Books"
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className={labelClass}>Price <span className="text-red-500">*</span></label>
                <input
                  type="text" // Use text for price to allow currency symbols, parse on backend or before submit if number
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="e.g., $99.99 or 99.99"
                  required
                />
              </div>

              {/* Stock Quantity */}
              <div>
                <label htmlFor="stock" className={labelClass}>Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className={inputClass}
                  min="0"
                  placeholder="e.g., 150"
                />
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className={labelClass}>Status</label>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={inputClass}
                >
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label htmlFor="image" className={labelClass}>Image URL (Optional)</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={formData.image || ''}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="e.g., https://example.com/image.png"
                />
                {formData.image && (
                  <div className="mt-3 w-32 h-32 relative rounded-md overflow-hidden border dark:border-gray-700">
                    <img src={formData.image} alt="Image Preview" style={{objectFit: 'contain', width: '100%', height: '100%'}} />
                  </div>
                )}
              </div>
              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className={labelClass}>Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  rows={5}
                  className={inputClass}
                  placeholder="Provide a detailed description of the product..."
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-end gap-4">
               <button
                type="button"
                onClick={() => setFormData(initialFormData)} // Reset button
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
                    Saving...
                  </div>
                ) : (
                  'Create Product'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
} 