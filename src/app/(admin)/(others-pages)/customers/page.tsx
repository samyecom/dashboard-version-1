// src/app/(admin)/(others-pages)/customers/page.tsx
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
// Assuming you have a Customer type and mock data similar to products
// import { mockCustomers, Customer } from "@/types/customers";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Badge from "@/components/ui/badge/Badge";

export const metadata: Metadata = {
    title: "Customer List | TailAdmin - Next.js Dashboard Template",
    description:
        "This is the Customer List page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

// Define a placeholder Customer type for now if you don't have one
type Customer = {
    id: string;
    name: string;
    email: string;
    phone?: string | null; // Added null to phone type
    totalOrders: number;
    status: "Active" | "Inactive"; // Example statuses
};

// Placeholder mock data
const mockCustomers: Customer[] = [
    {
        id: "cust-1",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        totalOrders: 5,
        status: "Active",
    },
    {
        id: "cust-2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "987-654-3210",
        totalOrders: 12,
        status: "Active",
    },
    {
        id: "cust-3",
        name: "Peter Jones",
        email: "peter.jones@example.com",
        phone: null,
        totalOrders: 1,
        status: "Inactive",
    },
];


export default function CustomerListPage() {
    return (
        <>
            <PageBreadcrumb pageTitle="Customers List" createUrl='/customers/create' />


            <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[900px]"> {/* Adjust min-width as needed */}
                        <Table className=" table-fixed">
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-64 lg:w-96" // Adjust width
                                    >
                                        Customer Name
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Email
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Total Orders
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Status
                                    </TableCell>
                                    {/* Add more headers for other customer details like phone if needed */}
                                </TableRow>
                            </TableHeader>

                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {mockCustomers.map((customer) => (
                                    <TableRow key={customer.id}>
                                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                                            {/* Link to the customer detail page */}
                                            <Link href={`/customers/${customer.id}`} className=" w-full">
                                                <div className="flex items-center gap-3 w-full">
                                                    {/* You might add a customer avatar/icon here */}
                                                    <div>
                                                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                            {customer.name}
                                                        </span>
                                                        {/* Optionally show email or other quick info here */}
                                                        <span className="block text-gray-500 text-xs dark:text-gray-400">
                                                            {customer.email}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {customer.email} {/* Repeat email for clarity in table */}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {customer.totalOrders}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start">
                                            {/* Use your Badge component here based on status */}
                                            <Badge
                                                size="sm"
                                                color={customer.status === "Active" ? "success" : "error"}
                                            >
                                                {customer.status}
                                            </Badge>
                                        </TableCell>
                                        {/* Add more cells for other customer details */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}