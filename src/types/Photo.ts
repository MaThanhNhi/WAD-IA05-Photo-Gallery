/**
 * Type definitions for Lorem Picsum API responses
 */

export interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export interface PhotoDetails extends Photo {
  // Additional fields that could be used for display
  title?: string;
  description?: string;
}
