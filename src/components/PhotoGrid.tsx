import { memo } from "react";
import type { Photo } from "../types/Photo";
import { PhotoCard } from "./PhotoCard";

interface PhotoGridProps {
  photos: Photo[];
}

export const PhotoGrid = memo(function PhotoGrid({ photos }: PhotoGridProps) {
  if (photos.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No photos to display</p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      role="list"
      aria-label="Photo gallery"
    >
      {photos.map((photo) => (
        <div key={photo.id} role="listitem">
          <PhotoCard photo={photo} />
        </div>
      ))}
    </div>
  );
});
