import React from 'react';
import { useDocumentContext } from '../Context/DocumentContext';

interface DocumentCardProps {
  doc: {
    type: string;
    title: string;
    position: number;
    extension: string;
  };
  index: number;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ doc, index }) => {
  const { handleDragStart, handleDrop, setSelectedImage } = useDocumentContext();

  return (
    <div
      className="document-card"
      draggable
      onDragStart={() => handleDragStart(doc)}
      onDrop={(e) => handleDrop(e, index)}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => setSelectedImage(`/assets/${doc.type}.${doc.extension}`)}
    >
      <div className="image-container">
        <img
          src={`/assets/${doc.type}.${doc.extension}`}
          alt={doc.title}
          className="thumbnail"
        />
      </div>
      <p>{doc.title}</p>
    </div>
  );
};

export default DocumentCard;
