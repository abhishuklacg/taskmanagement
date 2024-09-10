import React from 'react';
import { useDocumentContext } from '../Context/DocumentContext';

const ImageOverlay: React.FC = () => {
  const { selectedImage, setSelectedImage } = useDocumentContext();

  if (!selectedImage) return null;

  return (
    <div className="overlay" onClick={() => setSelectedImage(null)}>
      <img src={selectedImage} alt="Document" className="overlay-image" />
    </div>
  );
};

export default ImageOverlay;
