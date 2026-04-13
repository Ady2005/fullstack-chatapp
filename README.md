# fullstack-chatapp
Full-stack Real-time Chat Application built with the MERN stack (MongoDB, Express, React, Node.js). Features include real-time messaging using Socket.io, secure JWT authentication, and global state management with Redux Toolkit
=======
# Chat App

A real-time chat application built with React, Node.js, MongoDB, and Socket.io. Features include one-on-one messaging, group chats, user authentication, file sharing, and an admin dashboard.

## 🚀 Features

- **Real-time Messaging**: Instant message delivery using Socket.io
- **User Authentication**: Secure login and signup with JWT tokens
- **One-on-One Chats**: Direct messaging with individual users
- **Group Chats**: Create and manage group conversations
- **File Sharing**: Upload and share files/attachments in chats
- **Friend Requests**: Send and accept friend requests
- **User Search**: Search for users to start conversations
- **Admin Dashboard**: Manage users, chats, and messages
- **Notifications**: Real-time notifications for new messages and requests
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **User Avatars**: Cloudinary integration for profile pictures
- **Message Pagination**: Load messages efficiently with pagination

## 💻 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **Material-UI (MUI)** - UI component library
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client
- **React Router** - Routing
- **Chart.js** - Data visualization
- **Framer Motion** - Animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Socket.io** - Real-time communication
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - Cloud storage for files
- **Express Validator** - Input validation

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Cloudinary account (for file uploads)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/chat-app.git
cd chat-app
```

### 2. Backend Setup

```bash
cd chatapp-server

# Install dependencies
npm install

# Create .env file in the root directory
touch .env

# Add the following environment variables
MONGO_URI=mongodb://localhost:27017/chatapp
# or use MongoDB Atlas
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp

JWT_SECRET=your_jwt_secret_key_here

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

PORT=4000

# Start the development server
npm run dev
```

### 3. Frontend Setup

```bash
cd ../chatapp-frontend

# Install dependencies
npm install

# Create .env file
touch .env.local

# Add the following environment variables
VITE_SERVER_URL=http://localhost:4000

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:4000`.

## 📁 Project Structure

### Frontend (`chatapp-frontend/`)

```
src/
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Chat.jsx
│   ├── Groups.jsx
│   └── admin/          # Admin pages
│       ├── Dashboard.jsx
│       ├── UserManagement.jsx
│       ├── ChatManagement.jsx
│       └── MessageManagement.jsx
├── components/         # Reusable components
│   ├── auth/          # Authentication
│   ├── dialogs/       # Dialog components
│   ├── layout/        # Layout components
│   ├── shared/        # Shared components
│   └── specific/      # Page-specific components
├── redux/             # State management
│   ├── store.js
│   ├── api/           # RTK Query API
│   ├── reducers/      # Redux slices
│   └── thunks/        # Async thunks
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── constants/         # App constants
├── styles/            # Global styles
└── socket.jsx         # Socket.io client setup
```

### Backend (`chatapp-server/`)

```
src/
├── controllers/       # Request handlers
│   ├── user.js
│   ├── chat.js
│   └── admin.js
├── models/           # Database schemas
│   ├── user.js
│   ├── chat.js
│   ├── message.js
│   └── request.js
├── routes/           # API routes
│   ├── user.js
│   ├── chat.js
│   └── admin.js
├── middlewares/      # Custom middlewares
│   ├── auth.js
│   ├── error.js
│   └── multer.js
├── lib/              # Utility functions
│   ├── helper.js
│   └── validators.js
├── utils/            # Utility functions
│   ├── features.js
│   └── utility.js
├── constants/        # Constants
│   ├── config.js
│   └── events.js
└── seeders/          # Database seeders
```

## 📚 API Endpoints

### User Routes

- `GET /api/v1/user/me` - Get current user
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - Login user
- `POST /api/v1/user/logout` - Logout user
- `GET /api/v1/user/search?name=...` - Search users
- `GET /api/v1/user/notifications` - Get friend requests
- `PUT /api/v1/user/sendrequest` - Send friend request
- `PUT /api/v1/user/acceptrequest` - Accept friend request
- `GET /api/v1/user/friends` - Get all friends
- `PUT /api/v1/user/avatar` - Update profile picture

### Chat Routes

- `GET /api/v1/chat/my` - Get all chats
- `GET /api/v1/chat/my/groups` - Get user's groups
- `POST /api/v1/chat/new` - Create new group
- `GET /api/v1/chat/:chatId` - Get chat details
- `PUT /api/v1/chat/:chatId` - Rename group
- `DELETE /api/v1/chat/:chatId` - Delete group
- `PUT /api/v1/chat/addmembers` - Add group members
- `PUT /api/v1/chat/removemember` - Remove group member
- `DELETE /api/v1/chat/leave/:chatId` - Leave group
- `POST /api/v1/chat/message` - Send message with attachments
- `GET /api/v1/chat/message/:chatId?page=...` - Get messages

### Admin Routes

- `GET /api/v1/admin/stats` - Get dashboard statistics
- `GET /api/v1/admin/users` - Get all users
- `GET /api/v1/admin/chats` - Get all chats
- `GET /api/v1/admin/messages` - Get all messages
- `DELETE /api/v1/admin/user/:userId` - Delete user
- `DELETE /api/v1/admin/chat/:chatId` - Delete chat
- `DELETE /api/v1/admin/message/:messageId` - Delete message

## 🔌 Socket Events

### Client to Server
- `"user-online"` - Notify user is online
- `"send-message"` - Send a message
- `"typing"` - Notify typing status
- `"stop-typing"` - Stop typing notification

### Server to Client
- `"new-message-alert"` - New message received
- `"new-message"` - Message data
- `"online-users"` - List of online users
- `"user-typing"` - User is typing
- `"user-stop-typing"` - User stopped typing

## 🎯 Usage

### Running the Application

**Terminal 1 - Backend:**
```bash
cd chatapp-server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd chatapp-frontend
npm run dev
```

### Creating a Group

1. Navigate to the Groups page
2. Click "Create Group"
3. Enter group name and select members
4. Click "Create"

### Sending Messages

1. Select a chat from the sidebar
2. Type your message in the input field
3. Press Enter or click Send
4. Messages appear in real-time for all participants

### File Sharing

1. Click the attachment icon
2. Select a file to upload
3. File is uploaded to Cloudinary and shared in the chat

### Admin Dashboard

1. Login with admin credentials
2. Access `/admin` route
3. View statistics, manage users, chats, and messages

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

- Tokens are stored in HTTP-only cookies
- Token expires after 7 days (configurable)
- Protected routes require valid authentication
- Admin routes require admin privileges

## 🐛 Troubleshooting

### Groups Not Displaying
- Ensure you've fixed the `getMyGroups` endpoint to show all groups, not just created ones

### Add Member Not Working
- The backend properly filters duplicate members before adding
- Ensure members are properly selected in the dialog

### No Real-time Updates
- Check Socket.io connection in browser console
- Verify CORS settings on backend
- Ensure both frontend and backend are running

## 📦 Build for Production

### Frontend
```bash
cd chatapp-frontend
npm run build
```

### Backend
```bash
cd chatapp-server
npm start
```

## 📝 Environment Variables

### Frontend (.env.local)
```
VITE_SERVER_URL=http://localhost:4000
```

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
PORT=4000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the ISC License.

## 👤 Author

Created by [Your Name]

## 🙏 Acknowledgments

- Material-UI for beautiful components
- Redux Toolkit for state management
- Socket.io for real-time communication
- MongoDB and Mongoose for database
- Cloudinary for cloud storage


If you have any questions or issues, please open an issue on GitHub.

---

**Happy Chatting! 💬**
>>>>>>> fa465dd (Initial commit: Full-stack chat application with React, Node.js, MongoDB, and Socket.io)
