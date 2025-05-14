'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
// Assuming your types are here. Ensure this import is correct or define the interface locally.
// import { NewProductFormData } from '@/types/products'; 

// Define Product interface locally based on the vital information for clarity within this file
// This should match or be compatible with the Product interface in your types/products.ts
interface Product {
  id: string;
  sku: string;
  image: string; // Assuming image is a URL or path string
  name: string;
  shortName: string;
  identifier: string; // e.g., EAN number
  productType: string; // e.g., Kids range, baby products
  brand: string;
  category: string;
  quantity: number;
  stock: number;
  mrp: string; // Manufacturer Suggested Retail Price
  price: string; // Selling Price
  businessPrice: string;
  manufacturer: string;
  hsnCode: string; // Harmonized System of Nomenclature Code
  ppuCount: number; // Pieces Per Unit Count
  unit: string; // e.g., ml, pcs
  tax: string; // e.g., percentage like "18%"
  manufacturingPartNumber: string;
  gender: string;
  status: "Active" | "Draft" | "Archived";
  description?: string;
  rating?: number; // Optional
}


// Define NewProductFormData based on the updated Product interface, omitting fields not typically created by user
export type NewProductFormData = Omit<Product, 'id' | 'rating'> & {
    image?: string; // Keep image optional for the form
};


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


export default function CreateProductPage() {
  const initialFormData: NewProductFormData = {
    sku: '',
    image: '',
    name: '',
    shortName: '',
    identifier: '',
    productType: '',
    brand: '',
    category: '',
    quantity: 0,
    stock: 0,
    mrp: '',
    price: '', // Corresponds to Selling Price
    businessPrice: '',
    manufacturer: '',
    hsnCode: '',
    ppuCount: 0,
    unit: '',
    tax: '',
    manufacturingPartNumber: '',
    gender: '',
    status: 'Draft',
    description: '',
    // rating is omitted as it's not in NewProductFormData
  };

  const [formData, setFormData] = useState<NewProductFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    let processedValue: string | number = value;
    // Handle number types explicitly
    if (type === 'number') {
      processedValue = value === '' ? 0 : parseFloat(value);
       // Ensure integer values for specific fields if necessary
       if (name === 'stock' || name === 'quantity' || name === 'ppuCount') {
         processedValue = parseInt(value, 10) || 0;
       }
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
      // Basic validation example (add more as needed based on your requirements)
      if (!formData.name || !formData.price || !formData.sku || !formData.category) {
        setError("Product Name, Selling Price, SKU, and Category are required.");
        setLoading(false);
        return;
      }
      if (formData.stock < 0 || formData.quantity < 0 || formData.ppuCount < 0) {
         setError("Stock, Quantity, and PPU Count cannot be negative.");
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
      <PageBreadcrumb pageTitle="Create New Product" createUrl={null} />

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

              {/* Short Name */}
              <div>
                <label htmlFor="shortName" className={labelClass}>Short Name</label>
                <input
                  type="text"
                  name="shortName"
                  id="shortName"
                  value={formData.shortName}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="e.g., Headphones"
                />
              </div>

              {/* SKU */}
              <div>
                 <label htmlFor="sku" className={labelClass}>SKU <span className="text-red-500">*</span></label>
                 <input
                   type="text"
                   name="sku"
                   id="sku"
                   value={formData.sku}
                   onChange={handleInputChange}
                   className={inputClass}
                   placeholder="e.g., ABC-12345"
                   required
                 />
              </div>

              {/* Identifier */}
              <div>
                 <label htmlFor="identifier" className={labelClass}>Identifier (e.g., EAN number)</label>
                 <input
                   type="text"
                   name="identifier"
                   id="identifier"
                   value={formData.identifier}
                   onChange={handleInputChange}
                   className={inputClass}
                   placeholder="e.g., 1234567890123"
                 />
              </div>

              {/* Product Type */}
              <div>
                <label htmlFor="productType" className={labelClass}>Product Type</label>
                 <input
                   type="text"
                   name="productType"
                   id="productType"
                   value={formData.productType}
                   onChange={handleInputChange}
                   className={inputClass}
                   placeholder="e.g., Electronics, Apparel"
                 />
              </div>

              {/* Brand */}
              <div>
                 <label htmlFor="brand" className={labelClass}>Brand</label>
                 <input
                   type="text"
                   name="brand"
                   id="brand"
                   value={formData.brand}
                   onChange={handleInputChange}
                   className={inputClass}
                   placeholder="e.g., Sony, Nike"
                 />
              </div>


              {/* Category */}
              <div>
                <label htmlFor="category" className={labelClass}>Category <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="e.g., Electronics, Books"
                  required
                />
              </div>

              {/* Manufacturer */}
              <div>
                 <label htmlFor="manufacturer" className={labelClass}>Manufacturer</label>
                 <input
                   type="text"
                   name="manufacturer"
                   id="manufacturer"
                   value={formData.manufacturer}
                   onChange={handleInputChange}
                   className={inputClass}
                   placeholder="e.g., Sony Corporation"
                 />
              </div>

               {/* HSN Code */}
               <div>
                 <label htmlFor="hsnCode" className={labelClass}>HSN Code</label>
                 <input
                   type="text"
                   name="hsnCode"
                   id="hsnCode"
                   value={formData.hsnCode}
                   onChange={handleInputChange}
                   className={inputClass}
                   placeholder="e.g., 8517"
                 />
               </div>

               {/* Manufacturing Part Number */}
               <div>
                 <label htmlFor="manufacturingPartNumber" className={labelClass}>Manufacturing Part Number</label>
                 <input
                   type="text"
                   name="manufacturingPartNumber"
                   id="manufacturingPartNumber"
                   value={formData.manufacturingPartNumber}
                   onChange={handleInputChange}
                   className={inputClass}
                   placeholder="e.g., XYZ-789"
                 />
               </div>

                {/* Gender */}
                <div>
                  <label htmlFor="gender" className={labelClass}>Gender</label>
                  <input
                    type="text"
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="e.g., Unisex, Male, Female"
                  />
                </div>


              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className={labelClass}>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className={inputClass}
                  min="0"
                  placeholder="e.g., 1"
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

               {/* PPU Count */}
               <div>
                 <label htmlFor="ppuCount" className={labelClass}>PPU Count</label>
                 <input
                   type="number"
                   name="ppuCount"
                   id="ppuCount"
                   value={formData.ppuCount}
                   onChange={handleInputChange}
                   className={inputClass}
                   min="0"
                   placeholder="e.g., 1"
                 />
               </div>

                {/* Unit */}
                <div>
                  <label htmlFor="unit" className={labelClass}>Unit (e.g., ml, pcs)</label>
                  <input
                    type="text"
                    name="unit"
                    id="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="e.g., pcs"
                  />
                </div>


              {/* MRP */}
              <div>
                 <label htmlFor="mrp" className={labelClass}>MRP</label>
                 <input
                   type="text"
                   name="mrp"
                   id="mrp"
                   value={formData.mrp}
                   onChange={handleInputChange}
                   className={inputClass}
                   placeholder="e.g., $100.00"
                 />
              </div>

              {/* Selling Price (Price) */}
              <div>
                <label htmlFor="price" className={labelClass}>Selling Price <span className="text-red-500">*</span></label>
                <input
                  type="text" // Use text for price to allow currency symbols, parse on backend or before submit if number
                  name="price" // Corresponds to Selling Price
                  id="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="e.g., $99.99 or 99.99"
                  required
                />
              </div>

               {/* Business Price */}
               <div>
                 <label htmlFor="businessPrice" className={labelClass}>Business Price</label>
                 <input
                   type="text"
                   name="businessPrice"
                   id="businessPrice"
                   value={formData.businessPrice}
                   onChange={handleInputChange}
                   className={inputClass}
                   placeholder="e.g., $90.00"
                 />
               </div>

                {/* Tax */}
                <div>
                   <label htmlFor="tax" className={labelClass}>Tax (%)</label>
                   <input
                     type="text"
                     name="tax"
                     id="tax"
                     value={formData.tax}
                     onChange={handleInputChange}
                     className={inputClass}
                     placeholder="e.g., 18%"
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
                  type="text" // Using text for URL, you might want a file input for uploads
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

                {/* Rating (Optional - typically not set on creation) */}
                {/* If you need to allow setting rating on creation, uncomment this block */}
                {/*
                <div>
                  <label htmlFor="rating" className={labelClass}>Rating (Optional)</label>
                  <input
                    type="number"
                    name="rating"
                    id="rating"
                    value={formData.rating || ''} // Use || '' for optional number input
                    onChange={handleInputChange}
                    className={inputClass}
                    step="0.1"
                    min="0"
                    max="5"
                    placeholder="e.g., 4.5"
                  />
                </div>
                */}


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
                    Creating...
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