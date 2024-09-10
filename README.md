<<<<<<< HEAD
Documentation 
This project is a document management system that allows users to interact with various document cards. Users can drag and drop documents to rearrange them, view larger versions in an overlay, and the application automatically saves changes at regular intervals.
The system uses a React frontend, with a mock API to fetch and update document data.
Key features include:
Drag-and-drop functionality for reordering documents.
Document preview overlay on click.
Automatic saving with visual feedback (spinner) when changes are detected.
Key Components
App:

The main component that ties together the document grid, overlay, and saving spinner.
Utilizes a DocumentProvider for state management.
DocumentCard:

Represents each individual document card. It includes functionality for dragging, dropping, and clicking to view a full-sized image in the overlay.
Components : 
Spinner,
ImageOverlay,

State management : 
DocumentContext,

It uses React’s Context API to provide the state to components across the app.

API Usage (Mock API) MSW
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

=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
>>>>>>> 5946dc3 (Initialize project using Create React App)
