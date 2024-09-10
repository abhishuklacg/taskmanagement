import { http, HttpResponse, passthrough } from 'msw';
import { setupWorker } from 'msw/browser';

interface Document {
  type: string;
  title: string;
  position: number;
  thumbnail: string;
}

const initialDocuments: Document[] = [
  { type: 'bankdraft', title: 'Bank Draft', position: 0, thumbnail: '/assets/bankdraft.png' },
  { type: 'bill-of-lading', title: 'Bill of Lading', position: 1, thumbnail: '/assets/billoflading.png' },
  { type: 'invoice', title: 'Invoice', position: 2, thumbnail: '/assets/invoice.png' },
  { type: 'bank-draft-2', title: 'Bank Draft 2', position: 3, thumbnail: '/assets/bankdraft2.png' },
  { type: 'bill-of-lading-2', title: 'Bill of Lading 2', position: 4, thumbnail: '/assets/billoflading2.png' },
];

const getDocuments = (): Document[] => {
  try {
    const stored = localStorage.getItem('documents');
    if (stored) {
      return JSON.parse(stored);
    } else {
      localStorage.setItem('documents', JSON.stringify(initialDocuments));
      return initialDocuments;
    }
  } catch (error) {
    console.error('Error retrieving documents from localStorage:', error);
    localStorage.setItem('documents', JSON.stringify(initialDocuments));
    return initialDocuments;
  }
};

const saveDocuments = (documents: Document[]): void => {
  localStorage.setItem('documents', JSON.stringify(documents));
};

const handlers = [
  http.get('/api/documents', () => {
    const documents = getDocuments();
    return HttpResponse.json(documents);
  }),

  http.put('/api/documents', async ({ request }) => {
    const updatedDocuments = await request.json() as Document[];
    saveDocuments(updatedDocuments); 
    return HttpResponse.json(updatedDocuments); 
  }),

  // Passthrough for other assets
  http.get('/logo192.png', () => passthrough()),
  http.get('/favicon.ico', () => passthrough()),
];

// Setup the worker
const worker = setupWorker(...handlers);

export { worker, handlers };
