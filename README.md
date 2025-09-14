# The Chef Kart

A modern food ordering application built with React, Redux, and React Router.

## Features

- User authentication (Login/Signup)
- Browse food items by categories
- Add items to cart
- Order summary
- Responsive design

##  Tech Stack

- React 19
- Redux Toolkit for state management
- React Router v6 for routing
- Redux Persist for state persistence
- React Icons
- CSS Modules for styling

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later) or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd the_chef_kart
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies including React and Redux
   npm install react-redux@9.1.2 redux@5.0.1 redux-persist@6.0.0 redux-thunk@3.1.0 @reduxjs/toolkit@2.3.0
   
   # Or install all project dependencies
   npm install
   
   # Or using yarn (if you have yarn installed)
   yarn add react-redux@9.1.2 redux@5.0.1 redux-persist@6.0.0 redux-thunk@3.1.0 @reduxjs/toolkit@2.3.0
   ```

3. **Start the development server**
   ```bash
   # Using npm
   npm start
   
   # Or using yarn
   yarn start
   ```
   
   The application will open automatically in your default browser at [http://localhost:3000](http://localhost:3000).

4. **For production build**
   ```bash
   # Create production build
   npm run build
   
   # Serve the production build locally
   npm install -g serve
   serve -s build
   ```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (use with caution)

## Authentication

- **Sign Up**: Create a new account with email and password
- **Login**: Access your account with registered credentials
- **Logout**: Securely log out from the application

##  Project Structure

```
src/
├── components/     # Reusable UI components
├── redux/         # Redux store, reducers, and actions
├── App.js         # Main application component
└── index.js       # Application entry point
```

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
