import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface Document {
  type: string;
  title: string;
  position: number;
  extension: string;
}

interface DocumentContextType {
  docs: Document[];
  isSaving: boolean;
  lastSaved: Date | null;
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  handleDragStart: (doc: Document) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error("useDocumentContext must be used within a DocumentProvider");
  }
  return context;
};

const DocumentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [docs, setDocs] = useState<Document[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<Document | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('/api/documents', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Failed to fetch documents');

        const data = await response.json();
        setDocs(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    fetchDocuments();
  }, []);

  const handleDragStart = (doc: Document) => {
    setDraggedItem(doc);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const items = Array.from(docs);
    const dragIndex = items.findIndex((item) => item.type === draggedItem.type);

    items.splice(dragIndex, 1);
    items.splice(dropIndex, 0, draggedItem);

    const updatedItems = items.map((item, index) => ({ ...item, position: index }));
    setDocs(updatedItems);
    setHasChanges(true);
  };

  useEffect(() => {
    const saveInterval = setInterval(async () => {
      if (hasChanges) {
        setIsSaving(true);

        try {
          const response = await fetch('/api/documents', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(docs),
          });

          if (response.ok) {
            setLastSaved(new Date());
            setHasChanges(false);
          }
        } catch (error) {
          console.error('Error saving documents:', error);
        } finally {
          setTimeout(() => setIsSaving(false), 2000);
        }
      }
    }, 5000);

    return () => clearInterval(saveInterval);
  }, [docs, hasChanges]);

  return (
    <DocumentContext.Provider
      value={{
        docs,
        isSaving,
        lastSaved,
        selectedImage,
        setSelectedImage,
        handleDragStart,
        handleDrop,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export { DocumentProvider, useDocumentContext };
