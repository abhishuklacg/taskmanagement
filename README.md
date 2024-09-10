Documentation

This project is a document management system that allows users to interact with various document cards. Users can drag and drop documents to rearrange them, view larger versions in an overlay, and the application automatically saves changes at regular intervals.
The system uses a React frontend, with a mock API to fetch and update document data.

Key features include:
Drag-and-drop functionality for reordering documents.
Document preview overlay on click.
Automatic saving with visual feedback (spinner) when changes are detected.

App:

The main component that ties together the document grid, overlay, and saving spinner.
Utilizes a DocumentProvider for state management.



The centralized state management for documents, saving status, and dragging functionality.
It uses React’s Context API to provide the state to components across the app.

API Usage (Mock API)MSW 

GET /api/documents: Fetches the list of documents to display in the app.
PUT /api/documents: Updates the document list with new positions after drag-and-drop operations.
How to Use This Project

Development Setup:
Clone the repository.
Install dependencies: npm install.
Start the development server: npm start.
The app will run on http://localhost:3000.

Docker Setup:

A Dockerfile is included to containerize the app. You can also use docker-compose.yml to run the app as a microservice.
To start the app with Docker:

docker-compose up --build
