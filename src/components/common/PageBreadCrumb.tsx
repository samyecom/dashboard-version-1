
import { PlusIcon } from "@/icons";
import Link from "next/link";
import React from "react";


interface BreadcrumbProps {
  pageTitle: string;
  createUrl: string | null;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle , createUrl }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2
        className="text-xl hidden sm:block font-semibold text-gray-800 dark:text-white/90"
        x-text="pageName"
      >
        {pageTitle}
      </h2>
      <nav>
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-md sm:text-sm text-gray-500 dark:text-gray-400"
              href="/"
            >
              Home
              <svg
                className="stroke-current"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li className="text-md sm:text-sm text-gray-800 dark:text-white/90">
            {pageTitle}
          </li>
        </ol>
      </nav>
      {createUrl != null && 
      <Link href={createUrl} className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700 dark:">
        <PlusIcon/>
        Add New
      </Link>}
    </div>
  );
};

export default PageBreadcrumb;
