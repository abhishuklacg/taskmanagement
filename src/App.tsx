import React from 'react';
import { DocumentProvider, useDocumentContext } from './Context/DocumentContext';
import DocumentCard from './components/DocumentCard';
import Spinner from './components/Spinner';
import ImageOverlay from './components/ImageOverlay';
import "./App.css";

const App: React.FC = () => {
  const { docs, isSaving, lastSaved } = useDocumentContext();

  const getTimeSinceLastSave = () => {
    if (!lastSaved) return 'Never';
    const secondsAgo = Math.floor((new Date().getTime() - lastSaved.getTime()) / 1000);
    return `${secondsAgo} seconds ago`;
  };

  return (
    <div className="App">
      {isSaving ? <Spinner /> : <p>Last saved: {getTimeSinceLastSave()}</p>}

      <div className="documents-grid">
        {docs.map((doc, index) => (
          <DocumentCard key={doc.type} doc={doc} index={index} />
        ))}
      </div>

      <ImageOverlay />
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <DocumentProvider>
    <App />
  </DocumentProvider>
);

export default AppWrapper;
