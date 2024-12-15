import { useState } from 'react';
import { imageFileNames } from '../../constants/images';
import './gallery.css';

interface ImageFile {
  value: string;
}

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getImageUrl = (photo: string) => {
    const path = 'https://www.guicoder.com/werstlerfamily/images/';
    return `${path}${photo}`;
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="fade-in gallery-container">
      {imageFileNames.map(({ value }: ImageFile) => (
        <div
          className="gallery-image image-size-w"
          key={value}
          onClick={() => handleImageClick(value)}
        >
          <img alt={value} src={getImageUrl(value)} />
        </div>
      ))}

      {selectedImage && (
        <div
          className="enlarged-image-overlay"
        >
          <img
            src={getImageUrl(selectedImage)}
            alt="Enlarged"
            className="enlarged-image"
            onClick={handleCloseImage} 
          />
        </div>
      )}
    </div>
  );
}
