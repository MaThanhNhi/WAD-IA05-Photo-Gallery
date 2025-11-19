/**
 * Home page - Photo Gallery List
 * Container component that manages photo list with infinite scroll
 */
import { PhotoGrid } from "../components/PhotoGrid";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { usePhotos } from "../hooks/usePhotos";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

/**
 * Main gallery page with infinite scroll
 */
export function HomePage() {
  const { photos, isLoading, error, hasMore, loadMore } = usePhotos();

  // Set up infinite scroll
  const { sentinelRef } = useInfiniteScroll({
    onLoadMore: loadMore,
    isLoading,
    hasMore,
    threshold: 300,
  });

  // Show error state if initial load fails
  if (error && photos.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          title="Failed to Load Photos"
          message={error.message}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Explore Photos</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Discover beautiful images from talented photographers
        </p>
      </div>

      <PhotoGrid photos={photos} />

      {isLoading && (
        <div className="mt-8">
          <LoadingSpinner text="Loading more photos..." />
        </div>
      )}

      {!hasMore && photos.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">You've reached the end of the gallery</p>
        </div>
      )}

      {error && photos.length > 0 && (
        <div className="mt-8">
          <ErrorMessage title="Failed to Load More" message={error.message} onRetry={loadMore} />
        </div>
      )}

      <div ref={sentinelRef} className="h-4" aria-hidden="true" />
    </div>
  );
}
