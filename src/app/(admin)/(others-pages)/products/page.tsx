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
import { Product, mockProducts } from "@/types/products";
import Link from "next/link";
export const metadata: Metadata = {
    title: "Next.js Products | TailAdmin - Next.js Dashboard Template",
  description:
        "This is Next.js Products page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};




export default function ProductsPage() {
    return (
        <>
            <PageBreadcrumb pageTitle="Products List" />

            <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[900px]">
                        <Table className=" table-fixed">
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-64 lg:w-96"
                                    >
                                        Product Name
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Category
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Price
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Stock
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Status
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {mockProducts.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                                            <Link href={`/products/${product.id}`} className=" w-full">
                                                <div className="flex items-center gap-3 w-full">
                                                    <div className="min-w-10 min-h-10 w-10 h-10 overflow-hidden rounded border">
                                                        <Image
                                                            width={40}
                                                            height={40}
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="object-contain"
                                                        />
              </div>
                  <div>
                                                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                            {product.name}
                                                        </span>
                                                        {product.rating && (
                                                            <span className="block text-yellow-500 text-xs">
                                                                {product.rating} ★
                                                            </span>
                                                        )}
                </div>
              </div>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {product.category}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {product.price}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {product.stock > 0 ? (
                                                <span>{product.stock} units</span>
                                            ) : (
                                                <span className="text-red-500">Out of Stock</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start">
                                            <Badge
                                                size="sm"
                                                color={
                                                    product.status === "Active"
                                                        ? "success"
                                                        : product.status === "Draft"
                                                            ? "warning"
                                                            : "error"
                                                }
                                            >
                                                {product.status}
                                            </Badge>
                                        </TableCell>
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
