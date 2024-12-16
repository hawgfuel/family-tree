import { useState, useEffect } from 'react';
import { imageFileNames } from '../../constants/images';
import './gallery.css';

interface ImageFile {
  value: string;
}

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [shuffledImageFileNames, setShuffledImageFileNames] = useState<ImageFile[]>([]);

  const getImageUrl = (photo: string) => {
    const path = 'https://www.guicoder.com/werstlerfamily/images/';
    return `${path}${photo}`;
  };

  const handleImageClick = (image: string, index: number) => {
    setSelectedIndex(index);
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedIndex(null);
    setSelectedImage(null);
  };

  const handleNextImage = () => {
    if (selectedIndex !== null) {
      const nextIndex = (selectedIndex + 1) % shuffledImageFileNames.length;
      setSelectedImage(shuffledImageFileNames[nextIndex].value);
      setSelectedIndex(nextIndex);
    }
  };

  const handlePrevImage = () => {
    if (selectedIndex !== null) {
      const prevIndex =
        (selectedIndex - 1 + shuffledImageFileNames.length) % shuffledImageFileNames.length;
      setSelectedImage(shuffledImageFileNames[prevIndex].value);
      setSelectedIndex(prevIndex);
    }
  };

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
  };

  // Shuffle images on page load
  useEffect(() => {
    const shuffled = shuffleArray([...imageFileNames]);
    setShuffledImageFileNames(shuffled);
  }, []);

  return (
    <>
      <p className='filter-instructions'>
        Images are randomly shuffled each time the gallery is visited. Click on an image to enlarge it. Click on the enlarged image to close.
      </p>
      <div className="fade-in gallery-container">
        {shuffledImageFileNames.map(({ value }, index) => (
          <div
            className="gallery-image image-size-w"
            key={value}
            onClick={() => handleImageClick(value, index)}
          >
            <img alt={value} src={getImageUrl(value)} />
          </div>
        ))}

        {selectedImage && (
          <div className="enlarged-image-overlay fade-in">
            <button className="prev-button" onClick={handlePrevImage} role='previous image button'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
                    <circle cx="50" cy="50" r="45" fill="white" stroke-width="2" />
                    <polygon points="55,35 35,50 55,65" fill="black" />
                </svg>
            </button>
            <img
              src={getImageUrl(selectedImage)} 
              onClick={handleCloseImage}
              alt="Enlarged"
              className="enlarged-image"
            />
            <button className="next-button" onClick={handleNextImage} role='next image button'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
                <circle cx="50" cy="50" r="45" fill="white" stroke-width="2" />
                <polygon points="45,35 65,50 45,65" fill="black" />
            </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
