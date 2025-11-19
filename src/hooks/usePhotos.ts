/**
 * Custom hook for fetching and managing photos with pagination
 */

import { useState, useCallback, useEffect } from "react";
import type { Photo } from "../types/Photo";
import { fetchPhotos } from "../api/photoApi";

interface UsePhotosReturn {
  photos: Photo[];
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => void;
  currentPage: number;
}

/**
 * Hook for managing photo list with infinite scroll pagination
 * @returns Photo list state and actions
 */
export function usePhotos(): UsePhotosReturn {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadPhotos(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load photos for a specific page
  const loadPhotos = useCallback(
    async (page: number) => {
      if (isLoading) return;

      setIsLoading(true);
      setError(null);

      try {
        const newPhotos = await fetchPhotos(page);

        if (newPhotos.length === 0) {
          setHasMore(false);
        } else {
          setPhotos((prev) => (page === 1 ? newPhotos : [...prev, ...newPhotos]));
          setCurrentPage(page);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load photos"));
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  // Load more photos for the next page
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      loadPhotos(currentPage + 1);
    }
  }, [currentPage, isLoading, hasMore, loadPhotos]);

  return {
    photos,
    isLoading,
    error,
    hasMore,
    loadMore,
    currentPage,
  };
}
