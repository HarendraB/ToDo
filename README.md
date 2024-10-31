# Firebase Todo App

A simple and secure Todo List app built using Firebase Realtime Database, Firebase Hosting, and Firebase Functions. This project demonstrates secure server-side handling of database interactions through Firebase Functions while keeping Firebase configuration secure on the backend.

## Project Structure

firebase-todo-app/ ├── public/ │ ├── index.html # Frontend HTML for the app │ ├── style.css # Basic CSS for styling │ └── app.js # Frontend JavaScript ├── functions/ │ ├── index.js # Firebase Functions handling CRUD operations │ └── package.json # Dependencies for Firebase Functions ├── .firebaserc ├── firebase.json # Firebase Hosting and Functions config └── package.json


## Features

- **Add and Delete Tasks**: Users can add new tasks and delete existing tasks.
- **Firebase Functions as Middleware**: Database interactions are securely handled on the backend using Firebase Functions.
- **Firebase Hosting**: The project is hosted securely on Firebase.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js, Firebase Functions
- **Database**: Firebase Realtime Database
- **Hosting**: Firebase Hosting

## Setup and Installation

### Prerequisites

- **Node.js** and **npm** installed on your local machine.
- **Firebase CLI** installed globally:
  ```bash
  npm install -g firebase-tools
 
git clone https://github.com/your-username/firebase-todo-app.git
cd firebase-todo-app

firebase init

# In the root directory
npm install

# Navigate to functions directory and install dependencies
cd functions
npm install

firebase deploy


### Instructions

1. **Replace** `your-username` in the clone URL with your actual GitHub username.
2. **Adjust any sections** as needed to better fit your project details.
3. **Save this content** into a file named `README.md` in your project directory.

Once you've created this file, follow the previous steps to add it to your Git repository and push it to GitHub!
