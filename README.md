# Full-Stack TODO List Application

A modern, responsive full-stack TODO list application built with React, Node.js, Next.js, Express, and MongoDB.

## Features

- User authentication (signup, login, logout)
- Create, read, update, and delete TODO items
- Mark TODO items as complete/incomplete
- Responsive design for mobile and desktop

## Tech Stack

### Frontend
- Next.js 
- React
- TypeScript
- Tailwind CSS
- Axios for API requests
- React Hook Form for form management
- React Hot Toast for notifications

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing

## Screenshots
![Login Screen](Images\image1.PNG)
![Register Screen](Images\image2.PNG)
![TODO List](Images\image3.PNG)

## Setup Instructions

### Prerequisites
- Node.js 
- MongoDB

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the frontend directory with the following content:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:
   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000`

## Project Structure

### Backend
```
backend/
├── config/
│   └── db.js
├── controllers/
│   └── todoController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── Todo.js
│   └── User.js
├── routes/
│   └── todoRoutes.js
├── .env
└── server.js
```

### Frontend
```
frontend/
├── src/app/
│   ├── layout.tsx
│   └── page.tsx
│   └── providers.tsx
├── components/
│   ├── AddTodo.tsx
│   ├── LoginForm.tsx
│   └── RegisterForm.tsx
│   └── TodoItem.tsx
│   └── TodoList.tsx
├── contexts/
│   └── AuthContext.ts
├── lib/
│   └── api.ts
└── types/
    └── index.ts
```

## Challenges and Decisions

1. **State Management**: We decided to use React's built-in Context API for managing authentication state instead of a more complex solution like Redux. This decision was made to keep the application simple and avoid unnecessary complexity for a relatively small-scale project.

2. **API Integration**: We faced challenges in handling API errors and providing meaningful feedback to users. We implemented a custom error handling middleware on the backend and used React Hot Toast on the frontend to display user-friendly error messages.

3. **Responsive Design**: Creating a responsive design that works well on both mobile and desktop was challenging. We leveraged Tailwind CSS's responsive classes to create a fluid layout that adapts to different screen sizes.

4. **Authentication**: Implementing secure authentication with JWT tokens required careful consideration. We decided to store the token in memory (React state) rather than localStorage for better security, although this means users need to log in again after a page refresh.

5. **Form Validation**: We chose to use Zod along with React Hook Form for robust form validation. This combination provides excellent TypeScript integration and runtime type checking.

6. **Database Design**: We opted for a simple schema design with separate collections for users and todos. Each todo item references the user who created it, allowing for efficient querying of a user's todos.

## Future Improvements

- Allow users to set priority levels for tasks (e.g., High, Medium, Low)
- Add due dates and target times for tasks to help with time management
- Implement a progress tracking feature to visualize the completion process of tasks
- Introduce notifications or reminders for upcoming deadlines
- Enhance user experience with a dark mode option


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
