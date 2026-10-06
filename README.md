📝 NoteSpace

A simple and secure note-taking application where users can create, manage, organize, and search their personal notes.

🚧 Status: Work in Progress

---

✨ Features

🔐 Authentication

- ✅ User registration
- ✅ User login with email and password
- ✅ Google authentication
- ✅ JWT-based authentication
- ✅ Access token and refresh token
- ✅ HTTP-only cookies for secure token storage
- ✅ Logout functionality
- ✅ Refresh token functionality
- ✅ Forgot password functionality
- ✅ OTP-based password reset
- ✅ OTP expiry handling
- ✅ Password hashing

📝 Notes Management

- ✅ Create notes
- ✅ View all notes
- ✅ Edit/update notes
- ✅ Delete notes
- ✅ Star/unstar notes
- ✅ Favorite notes
- ✅ Search notes by note name
- ✅ Note descriptions
- ✅ Note categories/types
- ✅ User-specific notes
- ✅ Notes automatically associated with the logged-in user

📂 Note Organization

- ✅ All Notes
- ⭐ Favorites
- 🎓 Study Notes
- 📢 Marketing Notes
- 🎬 Movie Watching Notes
- 👤 Profile section

👤 Profile

- ✅ View user profile
- ✅ Display user name and email
- ✅ Edit profile information
- ✅ Save profile changes
- ✅ Cancel profile editing

🎨 User Interface

- ✅ Responsive design
- ✅ Mobile-friendly layout
- ✅ Tablet layout
- ✅ Sidebar navigation
- ✅ Search functionality
- ✅ Toast notifications
- ✅ Star/unstar UI
- ✅ Edit and delete actions
- ✅ Clean and simple note interface

---

🛠️ Tech Stack

Frontend

- React.js
- JavaScript (ES6+)
- Vite
- React Router
- Axios
- React Icons
- React Toastify
- Tailwind CSS

Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication
- HTTP-only Cookies
- Nodemailer

Database

- PostgreSQL
- Prisma ORM

Authentication & Security

- JWT
- HTTP-only cookies
- Password hashing
- Google OAuth
- OTP-based password reset

---

🏗️ Project Structure

NoteSpace/
│
├── client/
│   ├── src/
│   │   ├── Api/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── Auth/
│   │   └── ...
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── prisma/
│   └── ...
│
└── README.md

---

🔑 Authentication Flow

NoteSpace uses JWT-based authentication with secure HTTP-only cookies.

User Login
    ↓
Backend verifies credentials
    ↓
JWT Access Token
    +
Refresh Token
    ↓
Stored in HTTP-only cookies
    ↓
Authenticated User

The access token is short-lived, while the refresh token is used to obtain a new access token when required.

---

📧 Forgot Password Flow

NoteSpace includes an OTP-based password reset system.

Enter Email
     ↓
Backend checks user
     ↓
Generate OTP
     ↓
Send OTP using Nodemailer
     ↓
OTP expires after 5 minutes
     ↓
Verify OTP
     ↓
Set New Password

---

🗄️ Database

The application uses PostgreSQL with Prisma ORM.

User

User
├── id
├── email
├── name
├── password
├── refreshToken
└── notes

Note

Note
├── id
├── type
├── noteName
├── isStarred
├── description
└── userId

Each note belongs to a specific user.

---

🔌 API Features

Some of the implemented API operations include:

Notes

GET     /note
POST    /note/notecreat
DELETE  /note/notedelete/:noteId
PATCH   /note/star/:noteId

Authentication

POST    /users/login
POST    /users/google-login
POST    /users/logout
POST    /users/refresh-token

Password Reset

POST    /users/forgot-password
POST    /users/reset-password

---

🎯 Goal

The goal of NoteSpace is to build a clean, secure, and practical full-stack note-taking application while learning and implementing real-world concepts such as:

- Authentication
- Authorization
- REST APIs
- JWT
- HTTP-only cookies
- Database relationships
- Prisma ORM
- PostgreSQL
- Google authentication
- OTP verification
- Email services
- Responsive UI
- Frontend and backend integration

---

🚧 Currently Working On

The project is still under development.

Future improvements may include:

- 🔔 More notification features
- 🖼️ Image/file attachments
- 🏷️ More advanced note organization
- 🌙 Dark mode improvements
- 🔍 Advanced search and filtering
- 📊 Additional user features
- 🚀 Production deployment improvements

---

🛣️ Development Progress

Authentication       ✅ Completed
Google Login         ✅ Completed
JWT Authentication   ✅ Completed
Notes CRUD            ✅ Completed
Search                ✅ Completed
Favorites             ✅ Completed
Note Categories       ✅ Completed
Profile               ✅ Completed
Forgot Password       ✅ Completed
OTP Verification      ✅ Completed
Responsive UI         ✅ Completed
Advanced Features     🚧 In Progress

---

👨‍💻 Developer

Rupesh Pradhan

Full Stack Developer

Technologies:

"React.js" · "Vite" · "JavaScript" · "Node.js" · "Express.js" · "Prisma" · "PostgreSQL"

---

⭐ Project

NoteSpace is being developed as a real-world full-stack project to improve practical development skills and understand how modern web applications work from frontend to backend and database.
