import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import Image from "next/image"; 
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; 
import Badge from "@/components/ui/badge/Badge"; 
import { OrderStatus , mockOrderData} from "@/types/order"; 
import Link from "next/link";


type CompatibleBadgeColor = "success" | "warning" | "error" | "info"; 

export const metadata: Metadata = {
  title: "Orders List | TailAdmin - Next.js Dashboard Template",
  description:
    "This is the Orders List page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};



const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};


const getStatusColor = (status: OrderStatus): CompatibleBadgeColor => {
  switch (status) {
    case "Delivered":
      return "success";
    case "Shipped":
      return "info";
    case "Processing":
      return "warning";
    case "Pending":
      return "info";
    case "Cancelled":
    case "Refunded":
      return "error";
    default:
      return "info";
  }
};


export default function OrdersPage() {
  
  

  return (
    <>
      <PageBreadcrumb pageTitle="Customer Orders" createUrl='/orders/create' />

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-gray-900">
        <div className="max-w-full overflow-x-auto">
         
          <div className="min-w-[1000px] xl:min-w-full">
            <Table>
              <TableHeader className="border-b border-gray-100 bg-gray-50 dark:border-white/[0.05] dark:bg-white/[0.03]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3.5 font-semibold text-gray-600 dark:text-gray-300 text-start text-sm">
                    Order ID
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3.5 font-semibold text-gray-600 dark:text-gray-300 text-start text-sm">
                    Customer
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3.5 font-semibold text-gray-600 dark:text-gray-300 text-start text-sm">
                    Date
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3.5 font-semibold text-gray-600 dark:text-gray-300 text-start text-sm">
                    Items
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3.5 font-semibold text-gray-600 dark:text-gray-300 text-end text-sm">
                    Total
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3.5 font-semibold text-gray-600 dark:text-gray-300 text-center text-sm">
                    Status
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3.5 font-semibold text-gray-600 dark:text-gray-300 text-center text-sm">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {mockOrderData.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                    <TableCell className="px-5 py-4 text-start">
                      <Link href={`/orders/${order.id}`} className="font-medium text-brand-600 dark:text-brand-400 hover:underline cursor-pointer">
                        {order.id}
                      </Link>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start">
                      <div className="flex items-center gap-3">
                        {order.customer.avatar ? (
                          <div className="w-9 h-9 overflow-hidden rounded-full shrink-0">
                            <Image
                              width={36}
                              height={36}
                              src={order.customer.avatar}
                              alt={order.customer.name}
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm font-medium shrink-0">
                            {order.customer.name.substring(0, 1)} 
                          </div>
                        )}
                        <div>
                          <span className="block font-medium text-gray-800 dark:text-white text-sm">
                            {order.customer.name}
                          </span>
                          {order.customer.email && (
                            <span className="block text-gray-500 dark:text-gray-400 text-xs">
                              {order.customer.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-400 text-start text-sm">
                      {formatDate(order.orderDate)}
                    </TableCell>
                     <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-400 text-start text-sm">
                      {order.itemCount}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-gray-800 dark:text-white text-end text-sm font-medium">
                      ${order.totalAmount.toFixed(2)}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center">
                      <Badge
                        size="sm" 
                        color={getStatusColor(order.status)}
                        
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center">
                     
                      <button
                        
                        className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-500 text-sm font-medium focus:outline-none"
                        title="View Order Details"
                      >
                        View
                      </button>
                     
                    </TableCell>
                  </TableRow>
                ))}
                {mockOrderData.length === 0 && (
                   <TableRow>
                    <TableCell className="px-5 py-10 text-center text-gray-500 dark:text-gray-400">
                        No orders found.
                    </TableCell>
                   </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
       
        <div className="p-4 border-t border-gray-100 dark:border-white/[0.05]">
            Pagination UI here
        </div>
      </div>
    </>
  );
} 