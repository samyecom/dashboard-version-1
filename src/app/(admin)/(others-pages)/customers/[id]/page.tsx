import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

// Assuming you have types for Customer and Order
// import { Customer } from "@/types/customers";
// import { Order } from "@/types/orders";

export const metadata: Metadata = {
    title: "Customer Details | TailAdmin - Next.js Dashboard Template",
    description:
        "This is the Customer Details page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

// Placeholder Customer type (should match your actual type)
type Customer = {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    address?: string;
    totalOrders: number;
    status: "Active" | "Inactive";
    createdAt: string;
};

// Placeholder Order type (should match your actual type)
type Order = {
    id: string;
    date: string;
    total: number;
    status: "Pending" | "Processing" | "Completed" | "Cancelled";
    customerId: string;
};

// Placeholder mock customer data (same as list page for example)
const mockCustomers: Customer[] = [
    {
        id: "cust-1",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        totalOrders: 5,
        status: "Active",
        createdAt: "2023-01-15"
    },
    {
        id: "cust-2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "987-654-3210",
        totalOrders: 12,
        status: "Active",
        createdAt: "2023-02-20"
    },
    {
        id: "cust-3",
        name: "Peter Jones",
        email: "peter.jones@example.com",
        phone: null,
        totalOrders: 1,
        status: "Inactive",
        createdAt: "2023-03-10"
    },
];

// Define the prop type for the page component to receive the customer ID
interface CustomerDetailsPageProps {
    params: {
        id: string; // The customer ID from the URL
    };
    // Add searchParams as it's part of the standard PageProps type
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function CustomerDetailsPage({ params }: CustomerDetailsPageProps) {
    const customerId = params.id;

    // --- Placeholder: Fetch Customer Data ---
    // In a real application, you would fetch customer details here
    // using the customerId from your API or database.
    // Example: const customer = fetchCustomerById(customerId);
    // Now mockCustomers is declared above and can be used here
    const customer: Customer | null = mockCustomers.find(cust => cust.id === customerId) || {
        id: customerId,
        name: "Loading Customer...",
        email: "",
        phone: null,
         totalOrders: 0,
         status: "Inactive",
         createdAt: "N/A"
    }; // Fallback if customer not found

    // --- Placeholder: Fetch Recent Orders ---
    // In a real application, you would fetch recent orders here
    // filtering by the customerId.
    // Example: const recentOrders = fetchOrdersByCustomerId(customerId);
    // For now, we'll use placeholder mock order data, filtered by customerId.

     // Placeholder mock order data (replace with actual fetched data)
    const mockOrders: Order[] = [
        { id: "ord-101", customerId: "cust-1", date: "2023-11-01", total: 150.00, status: "Completed" },
        { id: "ord-102", customerId: "cust-1", date: "2023-11-05", total: 75.50, status: "Processing" },
        { id: "ord-103", customerId: "cust-2", date: "2023-10-20", total: 300.00, status: "Completed" },
        { id: "ord-104", customerId: "cust-1", date: "2023-11-10", total: 25.00, status: "Pending" },
        // Add more mock orders...
    ];

    // Filter mock orders by customerId
    const recentOrders: Order[] = mockOrders.filter(order => order.customerId === customerId);


    if (!customer || customer.name === "Loading Customer...") {
        // Optionally show a loading state or not found message
        return <div>Loading customer or customer not found...</div>;
    }


    return (
        <>
            <PageBreadcrumb pageTitle={`Customer: ${customer.name}`} createUrl={null} />

            {/* Customer Details Section */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-500 text-theme-sm dark:text-gray-400">Name:</p>
                        <p className="font-medium text-gray-800 dark:text-white/90">{customer.name}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-theme-sm dark:text-gray-400">Email:</p>
                        <p className="font-medium text-gray-800 dark:text-white/90">{customer.email}</p>
                    </div>
                    {customer.phone && (
                        <div>
                             <p className="text-gray-500 text-theme-sm dark:text-gray-400">Phone:</p>
                             <p className="font-medium text-gray-800 dark:text-white/90">{customer.phone}</p>
                        </div>
                    )}
                     {/* Add more customer details fields here */}
                     <div>
                         <p className="text-gray-500 text-theme-sm dark:text-gray-400">Total Orders:</p>
                         <p className="font-medium text-gray-800 dark:text-white/90">{customer.totalOrders}</p>
                     </div>
                     <div>
                         <p className="text-gray-500 text-theme-sm dark:text-gray-400">Status:</p>
                         {/* You can use a Badge here as well */}
                          <span className={`font-medium ${customer.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                              {customer.status}
                          </span>
                     </div>
                      <div>
                         <p className="text-gray-500 text-theme-sm dark:text-gray-400">Member Since:</p>
                         <p className="font-medium text-gray-800 dark:text-white/90">{customer.createdAt}</p>
                     </div>
                </div>
                 {/* Add Edit button if needed */}
                 {/* <div className="mt-6 text-right">
                     <Link href={`/customers/edit/${customer.id}`} className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-center font-medium text-white hover:bg-blue-600">
                         Edit Customer
                     </Link>
                 </div> */}
            </div>

            {/* Recent Orders Section */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
                 <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-4">Recent Orders</h3>

                {recentOrders.length > 0 ? (
                     <div className="max-w-full overflow-x-auto">
                        {/* Placeholder for a table or list of recent orders */}
                         <table className="w-full table-auto">
                             <thead>
                                 <tr className="text-left">
                                     <th className="min-w-[150px] px-4 py-4 font-medium text-gray-500 dark:text-gray-400">Order ID</th>
                                     <th className="min-w-[150px] px-4 py-4 font-medium text-gray-500 dark:text-gray-400">Date</th>
                                     <th className="min-w-[150px] px-4 py-4 font-medium text-gray-500 dark:text-gray-400">Total</th>
                                      <th className="min-w-[150px] px-4 py-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                                     {/* Add more order table headers here */}
                                 </tr>
                             </thead>
                             <tbody>
                                 {recentOrders.map(order => (
                                     <tr key={order.id}>
                                          <td className="border-b border-[#eee] px-4 py-5 dark:border-white/[0.05]">
                                             {/* Link to order details if available */}
                                             <Link href={`/orders/${order.id}`} className="text-blue-500 hover:underline">
                                                 {order.id}
                                             </Link>
                                         </td>
                                          <td className="border-b border-[#eee] px-4 py-5 dark:border-white/[0.05]">
                                             <p className="text-gray-800 dark:text-white/90">{order.date}</p>
                                         </td>
                                          <td className="border-b border-[#eee] px-4 py-5 dark:border-white/[0.05]">
                                             <p className="text-gray-800 dark:text-white/90">${order.total.toFixed(2)}</p>
                                         </td>
                                          <td className="border-b border-[#eee] px-4 py-5 dark:border-white/[0.05]">
                                              {/* Use Badge for order status if desired */}
                                              <span className={`font-medium ${order.status === 'Completed' ? 'text-green-500' : order.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}`}>
                                                 {order.status}
                                             </span>
                                         </td>
                                         {/* Add more order cells here */}
                                     </tr>
                                 ))}
                             </tbody>
                         </table>
                     </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">No recent orders found for this customer.</p>
                )}
            </div>

            {/* Add more sections as needed for editing */}
        </>
    );
}
