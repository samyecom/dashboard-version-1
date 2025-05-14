'use client';

import React, { useState } from "react";
import { PlusIcon, ChevronDownIcon, ChevronLeftIcon, PencilIcon } from "@/icons";

export default function CreateCustomerPage() {
  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    language: "English [Default]",
    email: "",
    phoneCode: "GB", // Default country code (UK)
    phoneNumber: "",
    marketingEmails: false,
    marketingSMS: false,
    vatNumber: "",
    taxSettings: "Collect tax",
    notes: "",
    tags: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    
    setCustomerData(prevState => ({
      ...prevState,
      [id]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Submitting Customer Data:", customerData);
    
    // Reset form or redirect logic would go here
    alert("Customer creation logic placeholder executed. Check console.");
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="text-lg font-medium text-gray-900">New customer</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (Customer Details) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Overview Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Customer overview</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={customerData.firstName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={customerData.lastName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <div className="relative">
                    <select
                      id="language"
                      value={customerData.language}
                      onChange={(e) => handleInputChange(e)}
                      className="w-full appearance-none border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="English [Default]">English [Default]</option>
                      <option value="French">French</option>
                      <option value="Spanish">Spanish</option>
                      <option value="German">German</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">This customer will receive notifications in this language.</p>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={customerData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone number
                  </label>
                  <div className="flex">
                    <div className="relative w-20">
                      <button type="button" className="h-full flex items-center justify-between border border-gray-300 rounded-l-md px-3 py-2 bg-white">
                        <span className="text-sm">
                          {customerData.phoneCode === 'GB' && (
                            <span className="font-mono">🇬🇧</span>
                          )}
                        </span>
                        <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={customerData.phoneNumber}
                      onChange={handleInputChange}
                      className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="marketingEmails"
                        type="checkbox"
                        checked={customerData.marketingEmails}
                        onChange={handleInputChange}
                        className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="marketingEmails" className="font-medium text-gray-700">
                        Customer agreed to receive marketing emails.
                      </label>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="marketingSMS"
                        type="checkbox"
                        checked={customerData.marketingSMS}
                        onChange={handleInputChange}
                        className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="marketingSMS" className="font-medium text-gray-700">
                        Customer agreed to receive SMS marketing text messages.
                      </label>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    You should ask your customers for permission before you subscribe them to your marketing emails or SMS.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Default Address Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-1">Default address</h2>
                <p className="text-sm text-gray-500 mb-6">The primary address of this customer</p>
                
                <button 
                  type="button" 
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <PlusIcon className="h-4 w-4 text-gray-500 mr-2" />
                    <span>Add address</span>
                  </div>
                  <ChevronLeftIcon className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
            
            {/* Tax Details Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Tax details</h2>
                
                <div className="mb-6">
                  <label htmlFor="vatNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    VAT number
                  </label>
                  <input
                    type="text"
                    id="vatNumber"
                    value={customerData.vatNumber}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Valid VAT numbers apply the <a href="#" className="text-blue-600 hover:text-blue-800">reverse charge</a> exemption
                  </p>
                </div>
                
                <div>
                  <label htmlFor="taxSettings" className="block text-sm font-medium text-gray-700 mb-1">
                    Tax settings
                  </label>
                  <div className="relative">
                    <select
                      id="taxSettings"
                      value={customerData.taxSettings}
                      onChange={handleInputChange}
                      className="w-full appearance-none border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Collect tax">Collect tax</option>
                      <option value="Exempt from tax">Exempt from tax</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column (Notes & Tags) */}
          <div className="space-y-6">
            {/* Notes Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Notes</h2>
                  <button type="button">
                    <PencilIcon className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  Notes are private and won't be shared with the customer.
                </p>
                <textarea
                  id="notes"
                  value={customerData.notes}
                  onChange={handleInputChange}
                  className="mt-4 w-full h-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add a note..."
                ></textarea>
              </div>
            </div>
            
            {/* Tags Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Tags</h2>
                  <button type="button">
                    <PencilIcon className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                <input
                  type="text"
                  id="tags"
                  value={customerData.tags}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Wholesale, VIP, Returns"
                />
              </div>
            </div>
            
            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}