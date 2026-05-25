# StudyHub - Advanced Study Management Dashboard

## 🎓 Full-Stack Application

A comprehensive study management platform with AI-powered insights, real-time analytics, and collaborative learning features.

## 🚀 Features

### Dashboard & Analytics
- 📊 Real-time study statistics and performance metrics
- 📈 Weekly/Monthly progress tracking
- 🎯 Subject-wise progress visualization
- 💡 AI-powered study suggestions
- 🔥 Daily streak tracking

### Task Management
- ✅ Create, update, and manage tasks
- 🏷️ Categorize by subject and priority
- 📅 Due date tracking with notifications
- ⏱️ Time estimation and actual time logging
- 🎯 Subtask support for complex projects

### Study Tools
- ⏲️ Pomodoro Timer (25/5 minute sessions)
- 📝 Rich note-taking with categories
- 📚 Subject progress tracking
- 🎓 Exam preparation and countdown
- 📊 Mock test performance analysis

### Gamification
- 🏆 Global leaderboard system
- ⭐ XP and badge rewards
- 🔥 Streak maintenance bonuses
- 🎖️ Achievement unlocks

### Social Features
- 👥 Peer comparison and friendly competition
- 📤 Share notes and study materials
- 💬 Community discussions
- 📊 Group study analytics

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Mongoose** - ODM

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Zustand** - State management
- **Axios** - HTTP client

## 📋 Project Structure

```
root/
├── server.js                 # Express server entry
├── package.json             # Server dependencies
├── models/                  # Database schemas
│   ├── User.js
│   ├── Task.js
│   ├── Subject.js
│   ├── StudySession.js
│   ├── Note.js
│   ├── Leaderboard.js
│   └── Exam.js
├── routes/                  # API endpoints
│   ├── auth.js
│   ├── tasks.js
│   ├── subjects.js
│   ├── analytics.js
│   ├── timer.js
│   ├── notes.js
│   ├── leaderboard.js
│   └── aiSuggestions.js
├── middleware/              # Custom middleware
│   ├── auth.js
│   └── validators.js
└── client/                  # React frontend
    ├── src/
    │   ├── pages/          # Page components
    │   ├── components/     # Reusable components
    │   ├── store/          # State management
    │   └── index.css       # Global styles
    └── package.json        # Client dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/utsav539/literate-octo-computing-machine.git
cd literate-octo-computing-machine
```

2. **Install server dependencies**
```bash
npm install
```

3. **Install client dependencies**
```bash
cd client
npm install
cd ..
```

4. **Setup environment variables**
Create `.env` file:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/study-dashboard
JWT_SECRET=your_secret_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

5. **Run the application**
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Tasks
- `GET /api/tasks` - Fetch all tasks (with filters)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Analytics
- `GET /api/analytics/user-stats` - User statistics
- `GET /api/analytics/weekly-data` - Weekly data
- `GET /api/analytics/subject-progress` - Subject progress
- `POST /api/analytics/session` - Log study session

### More endpoints...
Refer to route files for complete API documentation.

## 🎨 UI Features

- **Modern Design** - Glassmorphism effect with gradient accents
- **Dark Mode** - Eye-friendly dark theme
- **Animations** - Smooth transitions with Framer Motion
- **Responsive** - Mobile-first design approach
- **Charts** - Interactive data visualization
- **Real-time Updates** - Live progress tracking

## 📊 Key Metrics Tracked

- Total study hours
- Tasks completed
- Subject progress
- Daily streak
- XP points
- Attendance percentage
- Productivity score
- Best study time

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation
- CORS configuration

## 🚧 Future Enhancements

- [ ] Real-time notifications
- [ ] Social study groups
- [ ] Video tutorials integration
- [ ] Advanced AI recommendations
- [ ] Mobile app (React Native)
- [ ] Offline mode
- [ ] Dark/Light theme toggle
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Utsav Arora**
- GitHub: [@utsav539](https://github.com/utsav539)

## 🙏 Acknowledgments

- Built with ❤️ for students
- Inspired by Pomodoro Technique
- Community-driven development

---

**Happy Studying! 📚✨**
