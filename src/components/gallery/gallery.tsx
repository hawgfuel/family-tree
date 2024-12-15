import { useState, useEffect } from 'react';
import { imageFileNames } from '../../constants/images';
import './gallery.css';

interface ImageFile {
  value: string;
}

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [shuffledImageFileNames, setShuffledImageFileNames] = useState<ImageFile[]>([]);

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

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  // Shuffle images on page load
  useEffect(() => {
    const shuffled = shuffleArray([...imageFileNames]);
    setShuffledImageFileNames(shuffled);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <p className='filter-instructions'>
        Images are randomly shuffled each time the gallery is visited. Click on an image to enlarge it. Click on the enlarged image to close.
      </p>
      <div className="fade-in gallery-container">
        {shuffledImageFileNames.map(({ value }: ImageFile) => (
          <div
            className="gallery-image image-size-w"
            key={value}
            onClick={() => handleImageClick(value)}
          >
            <img alt={value} src={getImageUrl(value)} />
          </div>
        ))}

        {selectedImage && (
          <div className="enlarged-image-overlay fade-in" onClick={handleCloseImage}>
            <img
              src={getImageUrl(selectedImage)}
              alt="Enlarged"
              className="enlarged-image"
            />
          </div>
        )}
      </div>
    </>
  );
}
