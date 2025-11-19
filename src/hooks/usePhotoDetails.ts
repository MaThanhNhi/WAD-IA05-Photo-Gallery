/**
 * Custom hook for fetching individual photo details
 */

import { useState, useEffect } from "react";
import type { Photo } from "../types/Photo";
import { fetchPhotoById } from "../api/photoApi";

interface UsePhotoDetailsReturn {
  photo: Photo | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook for fetching a single photo's details
 * @param id - Photo ID to fetch
 * @returns Photo details state
 */
export function usePhotoDetails(id: string | undefined): UsePhotoDetailsReturn {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    const loadPhoto = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const photoData = await fetchPhotoById(id);

        if (!isCancelled) {
          setPhoto(photoData);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err : new Error("Failed to load photo"));
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadPhoto();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isCancelled = true;
    };
  }, [id]);

  return { photo, isLoading, error };
}
