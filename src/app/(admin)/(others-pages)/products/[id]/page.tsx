'use client';

import React, { useEffect, useState, FormEvent, ChangeEvent, use } from 'react'; 
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import Image from 'next/image';
import Badge from "@/components/ui/badge/Badge"; 
import { mockProducts, Product, ProductFormData } from '@/types/products';


const getProductById = async (id: string): Promise<Product | null> => {
  console.log(`Fetching product with ID: ${id}`);
  await new Promise(resolve => setTimeout(resolve, 300)); 
  const product = mockProducts.find(p => p.id === id);
  return product ? { ...product } : null; 
};

const updateProductApi = async (id: string, data: ProductFormData): Promise<Product | null> => {
  console.log(`Updating product with ID: ${id}`, data);
  await new Promise(resolve => setTimeout(resolve, 500)); 
  const productIndex = mockProducts.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    
    mockProducts[productIndex] = { ...mockProducts[productIndex], ...data } as Product;
    return { ...mockProducts[productIndex] }; 
  }
  return null;
};


interface PageParams {
  id: string;
}

interface SingleProductPageProps {
  params: Promise<PageParams> | undefined;
} 

export default function SingleProductPage({ params: paramsProp }: SingleProductPageProps) {
  
  let resolvedParams: PageParams | undefined;

  // Check if paramsProp is a Promise (duck typing)
  // The `use` hook should only be called with a Promise or Context.
  function isPromise<T>(value: unknown): value is Promise<T> {
    return typeof (value as Promise<T>)?.then === 'function';
  }
  
  if (isPromise<PageParams>(paramsProp)) {
    resolvedParams = use(paramsProp);
  } else {
    resolvedParams = undefined;
  }
  
  
  const { id } = resolvedParams || {}; // Add a fallback for resolvedParams if it could be undefined

  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ensure 'id' is valid before fetching
    if (id) {
      const fetchProductDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const fetchedProduct = await getProductById(id);
          if (fetchedProduct) {
            setProduct(fetchedProduct);
            
            setFormData({
              sku: fetchedProduct.sku,
              image: fetchedProduct.image,
              name: fetchedProduct.name,
              shortName: fetchedProduct.shortName,
              identifier: fetchedProduct.identifier,
              productType: fetchedProduct.productType,
              brand: fetchedProduct.brand,
              category: fetchedProduct.category,
              quantity: fetchedProduct.quantity,
              stock: fetchedProduct.stock,
              mrp: fetchedProduct.mrp,
              price: fetchedProduct.price,
              businessPrice: fetchedProduct.businessPrice,
              manufacturer: fetchedProduct.manufacturer,
              hsnCode: fetchedProduct.hsnCode,
              ppuCount: fetchedProduct.ppuCount,
              unit: fetchedProduct.unit,
              tax: fetchedProduct.tax,
              manufacturingPartNumber: fetchedProduct.manufacturingPartNumber,
              gender: fetchedProduct.gender,
              status: fetchedProduct.status,
              description: fetchedProduct.description,
              rating: fetchedProduct.rating,
            });
          } else {
            setError(`Product with ID '${id}' not found.`);
            setProduct(null);
          }
        } catch (err) {
          console.error("Failed to fetch product:", err);
          setError("Failed to load product details.");
          setProduct(null);
        } finally {
          setLoading(false);
        }
      };
      fetchProductDetails();
    } else if (resolvedParams && !id) { 
        // This condition means params were resolved but 'id' was missing
        setError("Product ID is missing in route parameters.");
        setLoading(false);
        setProduct(null);
    } else if (!resolvedParams) {
        // This condition means paramsProp itself was falsy (e.g. null/undefined)
        // which is unlikely for Next.js route params but good for robustness.
        setError("Route parameters are unavailable.");
        setLoading(false);
        setProduct(null);
    }
  }, [id, resolvedParams]); // Depend on 'id' and the resolvedParams object's identity

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let processedValue: string | number | undefined = value; // Allow undefined for optional fields

    if (type === 'number') {
      // Convert empty string to undefined for optional number fields, otherwise to float
      processedValue = value === '' ? undefined : parseFloat(value);
      // Ensure integer values for specific fields if necessary and not undefined
      if (processedValue !== undefined && (name === 'stock' || name === 'quantity' || name === 'ppuCount')) {
          processedValue = parseInt(value, 10) || 0; // Fallback to 0 if parsing fails for integers
      }
    }

    // For optional text fields, convert empty string to undefined
    if (type === 'text' || type === 'textarea') {
       if (value === '') {
          processedValue = undefined;
       }
    }

     // Special handling for rating to ensure it's between 0 and 5 if not undefined
    if (name === 'rating' && processedValue !== undefined && typeof processedValue === 'number') {
      processedValue = Math.max(0, Math.min(5, processedValue));
    }


    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setLoading(true);
    setError(null);
    try {
      const updatedProduct = await updateProductApi(product.id, formData);
      if (updatedProduct) {
        setProduct(updatedProduct);
        
        setFormData({
            sku: updatedProduct.sku,
            image: updatedProduct.image,
            name: updatedProduct.name,
            shortName: updatedProduct.shortName,
            identifier: updatedProduct.identifier,
            productType: updatedProduct.productType,
            brand: updatedProduct.brand,
            category: updatedProduct.category,
            quantity: updatedProduct.quantity,
            stock: updatedProduct.stock,
            mrp: updatedProduct.mrp,
            price: updatedProduct.price,
            businessPrice: updatedProduct.businessPrice,
            manufacturer: updatedProduct.manufacturer,
            hsnCode: updatedProduct.hsnCode,
            ppuCount: updatedProduct.ppuCount,
            unit: updatedProduct.unit,
            tax: updatedProduct.tax,
            manufacturingPartNumber: updatedProduct.manufacturingPartNumber,
            gender: updatedProduct.gender,
            status: updatedProduct.status,
            description: updatedProduct.description,
            rating: updatedProduct.rating,
        });
        setIsEditing(false);
        console.log("Product updated successfully!");
        
      } else {
        setError("Failed to update product. Product not found after update attempt.");
      }
    } catch (err) {
      console.error("Failed to update product:", err);
      setError("An error occurred while updating the product.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <PageBreadcrumb pageTitle="Loading Product..." createUrl={null} />
        <div className="mt-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg text-center">
          <p>Loading product details, please wait...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PageBreadcrumb pageTitle="Error" createUrl={null} />
        <div className="mt-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg text-red-500 text-center">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <PageBreadcrumb pageTitle="Product Not Found" createUrl={null} />
         <div className="mt-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg text-center">
          <p>The requested product could not be found or the ID is invalid.</p>
        </div>
      </div>
    );
  }
  
  const inputClass = "w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2.5 bg-transparent text-gray-800 dark:text-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors";
  const labelClass = "block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <div>
      <PageBreadcrumb pageTitle={isEditing ? `Edit: ${product.name}` : product.name} createUrl={null} />

      <form onSubmit={handleFormSubmit} className="mt-6 space-y-6">
        <div className="p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Product Details
            </h2>
            <button
              type="button"
              onClick={() => {
                const newState = !isEditing;
                setIsEditing(newState);
                // Reset formData to current product data when entering or cancelling edit mode
                if (newState && product) {
                    setFormData({
                      sku: product.sku,
                      image: product.image,
                      name: product.name,
                      shortName: product.shortName,
                      identifier: product.identifier,
                      productType: product.productType,
                      brand: product.brand,
                      category: product.category,
                      quantity: product.quantity,
                      stock: product.stock,
                      mrp: product.mrp,
                      price: product.price,
                      businessPrice: product.businessPrice,
                      manufacturer: product.manufacturer,
                      hsnCode: product.hsnCode,
                      ppuCount: product.ppuCount,
                      unit: product.unit,
                      tax: product.tax,
                      manufacturingPartNumber: product.manufacturingPartNumber,
                      gender: product.gender,
                      status: product.status,
                      description: product.description,
                      rating: product.rating,
                  });
                } else if (!newState && product) {
                     // If cancelling edit, reset formData to current product state
                      setFormData({
                      sku: product.sku,
                      image: product.image,
                      name: product.name,
                      shortName: product.shortName,
                      identifier: product.identifier,
                      productType: product.productType,
                      brand: product.brand,
                      category: product.category,
                      quantity: product.quantity,
                      stock: product.stock,
                      mrp: product.mrp,
                      price: product.price,
                      businessPrice: product.businessPrice,
                      manufacturer: product.manufacturer,
                      hsnCode: product.hsnCode,
                      ppuCount: product.ppuCount,
                      unit: product.unit,
                      tax: product.tax,
                      manufacturingPartNumber: product.manufacturingPartNumber,
                      gender: product.gender,
                      status: product.status,
                      description: product.description,
                      rating: product.rating,
                  });
                }
              }}
              className="px-5 py-2.5 text-sm font-medium rounded-lg bg-brand-500 hover:bg-brand-600 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-opacity-50 w-full sm:w-auto"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Product'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-span-1 space-y-2">
              <label className={labelClass}>Product Image</label>
              <div className="w-full aspect-square relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <Image
                  src={formData.image || "/images/placeholder.png"} 
                  alt={formData.name || "Product Image"}
                  layout="fill"
                  objectFit="contain"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/images/placeholder.png"; }}
                />
              </div>
              {isEditing && (
                <input
                  type="text" name="image" id="image" value={formData.image || ''} onChange={handleInputChange} placeholder="Enter Image URL" className={inputClass}
                />
              )}
            </div>

            <div className="md:col-span-2 space-y-5">
              <div>
                <label htmlFor="name" className={labelClass}>Product Name</label>
                {isEditing ? (
                  <input type="text" name="name" id="name" value={formData.name || ''} onChange={handleInputChange} className={inputClass} required />
                ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.name}</p> )}
              </div>

              <div>
                <label htmlFor="shortName" className={labelClass}>Short Name</label>
                {isEditing ? (
                  <input type="text" name="shortName" id="shortName" value={formData.shortName || ''} onChange={handleInputChange} className={inputClass} />
                ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.shortName || 'N/A'}</p> )}
              </div>

              <div>
                 <label htmlFor="sku" className={labelClass}>SKU</label>
                 {isEditing ? (
                   <input type="text" name="sku" id="sku" value={formData.sku || ''} onChange={handleInputChange} className={inputClass} required />
                 ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.sku}</p> )}
              </div>

              <div>
                 <label htmlFor="identifier" className={labelClass}>Identifier (e.g., EAN number)</label>
                 {isEditing ? (
                   <input type="text" name="identifier" id="identifier" value={formData.identifier || ''} onChange={handleInputChange} className={inputClass} />
                 ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.identifier || 'N/A'}</p> )}
              </div>

              <div>
                <label htmlFor="productType" className={labelClass}>Product Type</label>
                 {isEditing ? (
                   <input type="text" name="productType" id="productType" value={formData.productType || ''} onChange={handleInputChange} className={inputClass} />
                 ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.productType || 'N/A'}</p> )}
              </div>

               <div>
                 <label htmlFor="brand" className={labelClass}>Brand</label>
                 {isEditing ? (
                   <input type="text" name="brand" id="brand" value={formData.brand || ''} onChange={handleInputChange} className={inputClass} />
                 ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.brand || 'N/A'}</p> )}
               </div>

              <div>
                <label htmlFor="category" className={labelClass}>Category</label>
                {isEditing ? (
                  <input type="text" name="category" id="category" value={formData.category || ''} onChange={handleInputChange} className={inputClass} required />
                ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.category}</p> )}
              </div>

               <div>
                 <label htmlFor="manufacturer" className={labelClass}>Manufacturer</label>
                 {isEditing ? (
                   <input type="text" name="manufacturer" id="manufacturer" value={formData.manufacturer || ''} onChange={handleInputChange} className={inputClass} />
                 ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.manufacturer || 'N/A'}</p> )}
               </div>

                <div>
                  <label htmlFor="hsnCode" className={labelClass}>HSN Code</label>
                  {isEditing ? (
                    <input type="text" name="hsnCode" id="hsnCode" value={formData.hsnCode || ''} onChange={handleInputChange} className={inputClass} />
                  ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.hsnCode || 'N/A'}</p> )}
                </div>

                 <div>
                   <label htmlFor="manufacturingPartNumber" className={labelClass}>Manufacturing Part Number</label>
                   {isEditing ? (
                     <input type="text" name="manufacturingPartNumber" id="manufacturingPartNumber" value={formData.manufacturingPartNumber || ''} onChange={handleInputChange} className={inputClass} />
                   ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.manufacturingPartNumber || 'N/A'}</p> )}
                 </div>

                  <div>
                    <label htmlFor="gender" className={labelClass}>Gender</label>
                    {isEditing ? (
                      <input type="text" name="gender" id="gender" value={formData.gender || ''} onChange={handleInputChange} className={inputClass} />
                    ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.gender || 'N/A'}</p> )}
                  </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="quantity" className={labelClass}>Quantity</label>
                  {isEditing ? (
                    <input type="number" name="quantity" id="quantity" value={formData.quantity === undefined ? '' : formData.quantity} onChange={handleInputChange} className={inputClass} min="0" />
                  ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.quantity} units</p> )}
                </div>
                <div>
                  <label htmlFor="stock" className={labelClass}>Stock Quantity</label>
                  {isEditing ? (
                    <input type="number" name="stock" id="stock" value={formData.stock === undefined ? '' : formData.stock} onChange={handleInputChange} className={inputClass} min="0" />
                  ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.stock} units</p> )}
                </div>
              </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <div>
                   <label htmlFor="ppuCount" className={labelClass}>PPU Count</label>
                   {isEditing ? (
                     <input type="number" name="ppuCount" id="ppuCount" value={formData.ppuCount === undefined ? '' : formData.ppuCount} onChange={handleInputChange} className={inputClass} min="0" />
                   ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.ppuCount || 'N/A'}</p> )}
                 </div>

                  <div>
                    <label htmlFor="unit" className={labelClass}>Unit (e.g., ml, pcs)</label>
                    {isEditing ? (
                      <input type="text" name="unit" id="unit" value={formData.unit || ''} onChange={handleInputChange} className={inputClass} />
                    ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.unit || 'N/A'}</p> )}
                  </div>
               </div>


               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <div>
                   <label htmlFor="mrp" className={labelClass}>MRP</label>
                   {isEditing ? (
                     <input type="text" name="mrp" id="mrp" value={formData.mrp || ''} onChange={handleInputChange} className={inputClass} />
                   ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.mrp || 'N/A'}</p> )}
                 </div>

                 <div>
                   <label htmlFor="price" className={labelClass}>Selling Price</label>
                   {isEditing ? (
                     <input type="text" name="price" id="price" value={formData.price || ''} onChange={handleInputChange} placeholder="$0.00" className={inputClass} required />
                   ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.price}</p> )}
                 </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <div>
                   <label htmlFor="businessPrice" className={labelClass}>Business Price</label>
                   {isEditing ? (
                     <input type="text" name="businessPrice" id="businessPrice" value={formData.businessPrice || ''} onChange={handleInputChange} className={inputClass} />
                   ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.businessPrice || 'N/A'}</p> )}
                 </div>

                  <div>
                     <label htmlFor="tax" className={labelClass}>Tax (%)</label>
                     {isEditing ? (
                       <input type="text" name="tax" id="tax" value={formData.tax || ''} onChange={handleInputChange} className={inputClass} />
                     ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.tax || 'N/A'}</p> )}
                  </div>
               </div>


               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="status" className={labelClass}>Status</label>
                    {isEditing ? (
                    <select name="status" id="status" value={formData.status || 'Draft'} onChange={handleInputChange} className={inputClass}>
                        <option value="Active">Active</option>
                        <option value="Draft">Draft</option>
                        <option value="Archived">Archived</option>
                    </select>
                    ) : (
                    <div className="py-2.5">
                        <Badge
                        size="md"
                        color={product.status === "Active" ? "success" : product.status === "Draft" ? "warning" : "error"}
                        >
                        {product.status}
                        </Badge>
                    </div>
                    )}
                </div>
                <div>
                    <label htmlFor="rating" className={labelClass}>Rating (0-5)</label>
                    {isEditing ? (
                        <input type="number" name="rating" id="rating" value={formData.rating === undefined ? '' : formData.rating} onChange={handleInputChange} step="0.1" min="0" max="5" className={inputClass} />
                    ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5">{product.rating ? `${product.rating} ★` : 'N/A'}</p> )}
                </div>
              </div>


              <div>
                <label htmlFor="description" className={labelClass}>Description</label>
                {isEditing ? (
                  <textarea name="description" id="description" value={formData.description || ''} onChange={handleInputChange} rows={5} className={inputClass} />
                ) : ( <p className="text-gray-700 dark:text-gray-200 py-2.5 whitespace-pre-wrap min-h-[60px]">{product.description || 'No description available.'}</p> )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 text-sm font-medium rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
