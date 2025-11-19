/**
 * 404 Not Found page
 * Presentational component for handling unknown routes
 */

import { Link } from "react-router-dom";

/**
 * 404 page for invalid routes
 */
export function NotFoundPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {" "}
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="mb-8">
          <div className="text-8xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
            404
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link
          to="/photos"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
