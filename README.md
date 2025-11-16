# 🌤️ Weather Dashboard

A full-stack weather application with user authentication. View real-time weather data for major cities around the world.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=flat)

---

## ✨ Features

- 🔐 **User Authentication** - Secure JWT-based login and registration
- 🌦️ **Real-time Weather Data** - Current weather for 10 major cities
- ⚡ **Smart Caching** - 10-minute cache to optimize API calls
- 🎨 **Modern UI** - Beautiful sky blue gradient with smooth animations
- 📱 **Responsive Design** - Works on all devices

---

## 🛠️ Tech Stack

**Frontend:** React 18, TypeScript, Vite, React Router, Axios

**Backend:** Node.js, Express, TypeScript, TypeORM, SQLite, JWT, Bcrypt

**API:** OpenWeatherMap

---

## 📦 Prerequisites

- Node.js (v16+)
- npm or yarn
- OpenWeatherMap API Key ([Get free key](https://openweathermap.org/api))

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/tobey028/Fidenz-assignmnet.git
cd Fidenz-assignmnet/my-fullstack-app
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create `.env` file in `server/` directory:

```env
PORT=5001
OPENWEATHER_API_KEY=your_api_key_here
JWT_SECRET=your-secret-key-change-this
CACHE_TTL_MINUTES=10
DATABASE_PATH=./database.sqlite
```

Start the backend:

```bash
npm run dev
```

Backend runs on: **http://localhost:5001**

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

Frontend runs on: **http://localhost:3001**

### 4. Open Application

Navigate to: **http://localhost:3001**

---

## 📡 API Endpoints

### Authentication

**Register**
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Get Current User**
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Weather

**Get Weather by City**
```http
GET /api/weather?cityId=1850144
Authorization: Bearer <token>
```

---

## 🌍 Available Cities

1. Tokyo, Japan
2. New York, USA
3. London, UK
4. Mumbai, India
5. Paris, France
6. Rio de Janeiro, Brazil
7. Sydney, Australia
8. Beijing, China
9. Moscow, Russia
10. São Paulo, Brazil

---

## 📁 Project Structure

```
my-fullstack-app/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Login, Register, Dashboard
│   │   ├── context/        # Auth context
│   │   └── services/       # API calls
│   └── package.json
│
├── server/                 # Backend Express app
│   ├── src/
│   │   ├── entities/       # Database models
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API routes
│   │   └── middleware/     # Auth middleware
│   ├── .env                # Environment variables
│   └── package.json
│
└── README.md
```

---

## 🎯 Usage

1. **Register** - Create an account with email and password
2. **Login** - Sign in with your credentials
3. **View Weather** - Click city buttons to view weather data
4. **Remove Cards** - Click ✕ to remove weather cards
5. **Logout** - Click logout button to end session

---

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- CORS configuration
- SQL injection prevention via TypeORM
- Environment variables for sensitive data

---

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Kill process on port 5001
lsof -i :5001
kill -9 <PID>
```

**Weather data not loading:**
- Verify OpenWeatherMap API key is valid
- Ensure backend server is running
- Check browser console for errors

**Can't login:**
- Clear browser localStorage
- Verify JWT_SECRET is set in .env
- Check database.sqlite exists

---

## 📝 License

MIT License - feel free to use this project for learning and development.

---

## 👤 Author

**Chalindu Shehal**

GitHub: [@tobey028](https://github.com/tobey028)

---

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) - Weather data API
- [React](https://reactjs.org/) - Frontend framework
- [Express](https://expressjs.com/) - Backend framework

---

**Built with ❤️ for Fidenz Assignment**
