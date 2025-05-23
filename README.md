# Collaborative Notes App

The Collaborative Notes App is a real-time note-taking application built using React, React-Quill, Socket.IO, and Tailwind CSS. It allows multiple users to collaborate on notes simultaneously, with real-time updates and conflict resolution.

## Features

- **Note Creation and Listing**: Users can create new notes and view a list of all their notes with timestamps.
- **Rich Text Editing**: The app uses the React-Quill library to provide a rich text editor, allowing users to format their notes with bold, italic, underline, and lists.
- **Real-Time Collaboration**: Multiple users can edit the same note simultaneously, with real-time updates reflected across all connected clients.
- **Conflict Resolution**: The app handles conflicts when two users edit the same note at the same time, ensuring that all changes are properly merged and saved.
- **Performance Optimization**: The app uses techniques like memoization and efficient data structures to ensure smooth performance, even with large note lists and frequent updates.

## Directory Structure
```bash
collaborative-notes/
├── client/                         # React frontend code
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Home Screen
│   │   │   ├── NoteEditor.jsx      # Note Editing Screen
│   │   ├── services/               
│   │   │   ├── api.js              # API service
│   │   │   ├── socket.js           # WebScoket service
│   │   ├── ...
│   │   └── main.jsx
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
├── server/                         # Backend Node.js API code
│   ├── controllers/
│   │   ├── noteController.js       # Controller for note-related operations
│   ├── routes/
│   │   ├── notes.js                # Routes for note-related endpoints
│   ├── models/
│   │   ├── noteStore.js            # Model for note data storage - In Memory store
│   ├── index.js
│   └── package.json
├── .gitignore
└── package.json
```
## Technologies Used

- **Frontend**: React, React-Quill, React Router, Axios, Socket.IO-client, Tailwind CSS
- **Backend**: Express, Socket.IO, UUID

## Development Setup

 Clone the repository:

   ```bash
   git clone https://github.com/DanielDev93/Collaborative-Notes.git