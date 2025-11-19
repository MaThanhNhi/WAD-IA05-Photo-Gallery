/**
 * Photo Detail page
 * Container component for displaying individual photo details
 */

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { usePhotoDetails } from "../hooks/usePhotoDetails";

/**
 * Detailed view of a single photo
 */
export function PhotoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { photo, isLoading, error } = usePhotoDetails(id);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <LoadingSpinner size="lg" text="Loading photo details..." />
      </div>
    );
  }

  // Error state
  if (error || !photo) {
    return (
      <div className="container mx-auto px-4 py-16">
        <ErrorMessage
          title="Photo Not Found"
          message={error?.message || "The requested photo could not be found."}
          onRetry={() => navigate("/")}
        />
      </div>
    );
  }

  // Generate placeholder title and description since API doesn't provide them
  const photoTitle = `Photo #${photo.id}`;
  const photoDescription = `A beautiful photograph captured by ${photo.author}. This high-resolution image showcases exceptional composition and artistic vision.`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back navigation */}
      <button
        onClick={() => navigate("/photos")}
        className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        aria-label="Go back to gallery"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="font-medium">Back to Gallery</span>
      </button>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Photo Display */}
        <div className="relative">
          <div className="sticky top-24">
            <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <LoadingSpinner size="lg" />
                </div>
              )}

              <img
                src={photo.download_url}
                alt={photoTitle}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {/* Download button */}
            <a
              href={photo.download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Open full-size image
            </a>
          </div>
        </div>

        {/* Photo Details */}
        <div className="space-y-6">
          {/* Title */}{" "}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{photoTitle}</h1>
            <div className="h-1 w-20 bg-linear-to-r from-blue-600 to-purple-600 rounded-full" />
          </div>{" "}
          {/* Author Info */}
          <div className="bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border border-blue-100 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {photo.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Photographer</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {photo.author}
                </p>
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              About this Photo
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{photoDescription}</p>
          </div>
          {/* Technical Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Technical Details
            </h2>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400 mb-1">Photo ID</dt>
                <dd className="text-lg font-semibold text-gray-900 dark:text-white">#{photo.id}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400 mb-1">Dimensions</dt>
                <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                  {photo.width} × {photo.height}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400 mb-1">Aspect Ratio</dt>
                <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                  {(photo.width / photo.height).toFixed(2)}:1
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400 mb-1">Source</dt>
                <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                  Lorem Picsum
                </dd>
              </div>
            </dl>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-4">
            <a
              href={photo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              View Source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
