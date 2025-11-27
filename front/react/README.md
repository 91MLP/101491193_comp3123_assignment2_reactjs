# Employee Management System - Frontend

**Student ID:** 101491193
**Course:** COMP 3123 - Full Stack Development I
**Assignment:** Assignment 2 - Frontend (12%)

## Project Description

This is a full-stack Employee Management System built with React.js for the frontend and Node.js/Express/MongoDB for the backend. The application allows users to manage employee records with full CRUD operations, authentication, and search functionality.

## Features

- User Authentication (Login/Signup)
- Employee List with Search/Filter
- Add New Employee with Profile Picture Upload
- View Employee Details
- Edit Employee Information
- Delete Employee
- Responsive Design using React-Bootstrap
- Session Management using Context API

## Tech Stack

### Frontend
- React.js
- React Router DOM (Navigation)
- React-Bootstrap (UI Components)
- Axios (HTTP Client)
- Context API (State Management)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication

## Project Structure

```
101491193_comp3123_assignment2_reactjs/
├── public/
├── src/
│   ├── assets/          # Static files
│   ├── components/      # Reusable components
│   ├── context/         # Context API (AuthContext)
│   ├── pages/           # Page components
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── EmployeeList.js
│   │   ├── AddEmployee.js
│   │   ├── EmployeeDetail.js
│   │   └── EditEmployee.js
│   ├── services/        # API services
│   │   └── api.js
│   ├── utils/           # Utility functions
│   ├── App.js           # Main app component
│   └── index.js         # Entry point
├── .env                 # Environment variables
├── Dockerfile           # Docker configuration
└── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud)

### Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update `REACT_APP_API_URL` to your backend API URL
   ```
   REACT_APP_API_URL=http://localhost:3000
   PORT=3001
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Access the application:**
   - Frontend: http://localhost:3001
   - Backend should be running on: http://localhost:3000

## Docker Setup

### Using Docker Compose (Recommended)

1. **Navigate to the docker-compose directory:**
   ```bash
   cd ../
   ```

2. **Start all services:**
   ```bash
   docker-compose up --build
   ```

3. **Access the services:**
   - Frontend: http://localhost:3001
   - Backend: http://localhost:3000
   - MongoDB: localhost:27017
   - Mongo Express: http://localhost:8081

4. **Stop all services:**
   ```bash
   docker-compose down
   ```

## API Endpoints

The frontend communicates with the following backend API endpoints:

### Authentication
- `POST /api/v1/user/signup` - Register new user
- `POST /api/v1/user/login` - Login user

### Employees
- `GET /api/v1/emp/employees` - Get all employees
- `GET /api/v1/emp/employees/:id` - Get employee by ID
- `POST /api/v1/emp/employees` - Create new employee
- `PUT /api/v1/emp/employees/:id` - Update employee
- `DELETE /api/v1/emp/employees/:id` - Delete employee

## Available Scripts

- `npm start` - Run the development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (not recommended)

## Features Implementation

### 1. Authentication
- Login and Signup forms with validation
- JWT token storage in localStorage
- Protected routes with authentication check
- Auto-redirect based on authentication status

### 2. Employee Management
- Display employees in responsive table
- Add new employee with form validation
- Upload profile pictures (Base64 encoding)
- View detailed employee information
- Edit employee details
- Delete employee with confirmation

### 3. Search & Filter
- Search by department
- Search by position
- Clear filters option

### 4. UI/UX
- Responsive design using React-Bootstrap
- Form validation with error messages
- Loading spinners for async operations
- Success/Error alerts

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| REACT_APP_API_URL | Backend API URL | http://localhost:3000 |
| PORT | Frontend port | 3001 |

## Troubleshooting

### Port Already in Use
If port 3001 is already in use, change the PORT in `.env` file.

### API Connection Issues
- Ensure backend server is running
- Check REACT_APP_API_URL in `.env`
- Verify CORS is enabled on backend

### Docker Issues
- Ensure Docker is running
- Check docker-compose.yml paths are correct
- Try rebuilding: `docker-compose up --build --force-recreate`

## Author

**Yueyang**
Student ID: 101491193
Course: COMP 3123 - Full Stack Development I

## Assignment Requirements Met

✅ ReactJS with hooks and components
✅ React Router DOM for navigation
✅ React-Bootstrap for UI
✅ Axios for API calls
✅ Form validation
✅ File upload (Profile pictures)
✅ Session management (Context API + localStorage)
✅ CRUD operations
✅ Search functionality
✅ Docker configuration
✅ Responsive design

## Submission Deadline

**Week 13 - Sunday, 30th November 2025, 23:59 PM**
