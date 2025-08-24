# Victory Blog - Frontend

A modern, responsive blogging platform built with React, TypeScript, and the MERN stack.

## ✨ Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Authentication System**: User login/register with JWT tokens
- **Context-based State Management**: React Context for user authentication
- **Responsive Design**: Mobile-first approach with modern CSS
- **Protected Routes**: Secure access to authenticated features
- **Blog Management**: Create and manage blog posts

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd blogusingmern
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── NewHeader.tsx   # Main navigation header
│   ├── Footer.tsx      # Site footer
│   └── ...
├── context/            # React Context providers
│   └── AuthContext.tsx # User authentication context
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Login.tsx       # User login
│   ├── Register.tsx    # User registration
│   ├── CreateBlog.tsx  # Blog creation form
│   └── About.tsx       # About page
├── utils/              # Utility functions
│   └── auth.ts         # Authentication helpers
└── App.tsx             # Main application component
```

## 🎨 Design Features

- **Gradient Backgrounds**: Modern gradient color schemes
- **Card-based Layout**: Clean, organized content presentation
- **Hover Effects**: Interactive elements with smooth transitions
- **Responsive Grid**: Flexible layouts that adapt to all screen sizes
- **Modern Typography**: Clean, readable font hierarchy

## 🔐 Authentication

The app uses a context-based authentication system:

- **AuthContext**: Manages user login state across the application
- **Protected Routes**: Certain pages require authentication
- **JWT Tokens**: Secure token-based authentication
- **Auto-login**: Remembers user sessions

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 480px, 768px, 1200px
- Flexible grid systems
- Touch-friendly interactions

## 🛠️ Technologies Used

- **React 19**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **CSS3**: Modern CSS with gradients and animations
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **JWT Decode**: Token management

## 🔧 Available Scripts

- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm eject`: Eject from Create React App

## 🌟 Key Components

### NewHeader
- Unified navigation header
- User profile display when logged in
- Login/Register buttons when not authenticated
- Responsive mobile menu

### AuthContext
- Centralized authentication state
- User login/logout functionality
- Token management
- Protected route handling

### Pages
- **Home**: Landing page with hero section and featured blogs
- **Login/Register**: Beautiful authentication forms
- **CreateBlog**: Protected blog creation interface
- **About**: Information about the platform

## 📄 License

This project is part of the Victory Blog platform.
