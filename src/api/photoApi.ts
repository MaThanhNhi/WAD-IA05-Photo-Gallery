/**
 * API utilities for fetching photos from Lorem Picsum
 */

import type { Photo } from "../types/Photo";

const BASE_URL = "https://picsum.photos/v2";
const PHOTOS_PER_PAGE = 20;

/**
 * Fetch a paginated list of photos
 * @param page - The page number to fetch (1-indexed)
 * @param limit - Number of photos per page
 * @returns Promise with array of photos
 */
export async function fetchPhotos(
  page: number = 1,
  limit: number = PHOTOS_PER_PAGE,
): Promise<Photo[]> {
  const response = await fetch(`${BASE_URL}/list?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch photos: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch a single photo by ID
 * @param id - The photo ID
 * @returns Promise with photo details
 */
export async function fetchPhotoById(id: string): Promise<Photo> {
  const response = await fetch(`${BASE_URL}/list?page=1&limit=100`);

  if (!response.ok) {
    throw new Error(`Failed to fetch photo: ${response.statusText}`);
  }

  const photos: Photo[] = await response.json();
  const photo = photos.find((p) => p.id === id);

  if (!photo) {
    throw new Error("Photo not found");
  }

  return photo;
}

/**
 * Get thumbnail URL for a photo
 * @param downloadUrl - The original download URL
 * @param width - Thumbnail width
 * @param height - Thumbnail height
 * @returns Thumbnail URL
 */
export function getThumbnailUrl(id: string, width: number = 400, height: number = 300): string {
  // Lorem Picsum supports dynamic image sizing
  return `https://picsum.photos/id/${id}/${width}/${height}`;
}
