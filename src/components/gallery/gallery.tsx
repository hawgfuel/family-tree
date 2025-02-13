import { useState, useEffect } from 'react';
import { GallerySearch } from './gallery-search';
import { imageFileNames } from '../../constants/images';
import './gallery.css';

interface ImageFile {
  value: string;
  caption: string;
}

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [shuffledImageFileNames, setShuffledImageFileNames] = useState<ImageFile[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search term state

  const getImageUrl = (photo: string) => {
    const path = 'https://www.guicoder.com/werstlerfamily/images/';
    return `${path}${photo}`;
  };

  const handleImageClick = (image: string, caption: string, index: number) => {
    setSelectedIndex(index);
    setCaption(caption);
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedIndex(null);
    setCaption('');
    setSelectedImage(null);
  };

  const handleNextImage = () => {
    if (selectedIndex !== null) {
      const nextIndex = (selectedIndex + 1) % shuffledImageFileNames.length;
      setSelectedImage(shuffledImageFileNames[nextIndex].value);
      setCaption(shuffledImageFileNames[nextIndex].caption);
      setSelectedIndex(nextIndex);
    }
  };

  const handlePrevImage = () => {
    if (selectedIndex !== null) {
      const prevIndex =
        (selectedIndex - 1 + shuffledImageFileNames.length) % shuffledImageFileNames.length;
      setSelectedImage(shuffledImageFileNames[prevIndex].value);
      setCaption(shuffledImageFileNames[prevIndex].caption);
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

  useEffect(() => {
    const shuffled = shuffleArray([...imageFileNames]);
    setShuffledImageFileNames(shuffled);
  }, []);

  // Filter images based on search term
  const filteredImages = shuffledImageFileNames.filter(({ caption }) =>
    caption.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <a id="gallery" />
      <p className='filter-instructions'>
        Images are randomly shuffled each time the gallery is visited. Click on an image to enlarge it. Click on the enlarged image to close.
      </p>
      <GallerySearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="fade-in gallery-container">
        {filteredImages.map(({ value, caption }, index) => (
          <div
            className="gallery-image image-size-w"
            key={value}
            onClick={() => handleImageClick(value, caption, index)}
          >
            <img alt={value} src={getImageUrl(value)} loading='lazy' />
          </div>
        ))}

        {selectedImage && (
          <div className="enlarged-image-overlay fade-in">
            <button className="prev-button" onClick={handlePrevImage} role='previous image button'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
                    <circle cx="50" cy="50" r="45" fill="white" strokeWidth="2" />
                    <polygon points="55,35 35,50 55,65" fill="black" />
                </svg>
            </button> 
            <div className="image-container" onClick={handleCloseImage}>
              <img
                src={getImageUrl(selectedImage)}
                alt="Enlarged"
                className="enlarged-image"
              />
              <div className="caption">{caption}</div>
            </div>
            <button className="next-button" onClick={handleNextImage} role='next image button'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
                <circle cx="50" cy="50" r="45" fill="white" strokeWidth="2" />
                <polygon points="45,35 65,50 45,65" fill="black" />
            </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Gallery;
