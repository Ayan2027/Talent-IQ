<h1 align="center">✨ Full-Stack Interview Platform ✨</h1>

![Demo App](/frontend/public/screenshot-for-readme.png)

# 🚀 TALENT-IQ  
### Real-Time Interview & Coding Platform (MERN Stack)

TALENT-IQ is a full-stack MERN platform that simulates real technical interviews by combining **video calling, collaborative code editor, real-time chat, and automated code evaluation** into a single interview room.

GitHub: https://github.com/Ayan2027/Talent-IQ  

---

## ✨ Features

- 🧑‍💻 VSCode-like Code Editor (Monaco)
- 🔐 Authentication using Clerk
- 🎥 1-on-1 Video Interview Calls (Stream Video)
- 💬 Real-time Chat Messaging
- 🧭 Dashboard with Live Session Stats
- ⚡ Secure Code Execution (Piston API)
- 🎯 Auto Feedback using Test Cases
- 🎉 Confetti on Successful Code
- 🧩 Practice Problems Page (Solo Mode)
- 🔒 Room Locking (Only 2 participants)
- 🧠 Background Jobs (Inngest)
- ⚙️ REST API with Node.js & Express
- ⚡ TanStack Query for Data Fetching
- 🤖 CodeRabbit for PR Analysis
- 🧑‍💻 GitHub PR-based Workflow

---

## 🧠 Why TALENT-IQ?

Most platforms separate:
- Video calls  
- Code editors  
- Chat  
- Test cases  

TALENT-IQ combines everything into **one real interview room** where:
- Interviewer and candidate talk
- Write code together
- Run code live
- See results instantly
- Get automatic pass/fail feedback

This recreates a real technical interview experience.

---

## 🛠️ Tech Stack

### Frontend
- React + Vite  
- Tailwind CSS + DaisyUI  
- TanStack Query  
- Clerk Auth  
- Stream Video SDK  
- Monaco Editor  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Inngest  
- Stream API  
- Clerk Webhooks  

### Tools
- Piston API (code execution)
- CodeRabbit (PR review)
- GitHub

---

## 📁 Project Structure
```
TALENT-IQ
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── lib
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── data
│   │   ├── hooks
│   │   ├── lib
│   │   └── pages
│   ├── public
│   ├── .env
│   └── package.json
├── README.md
└── .gitignore
```


---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```
PORT=5001
MONGO_URI=mongodb+srv://ayandhal2014_db_user:ayan2003@cluster0.cjhx2rp.mongodb.net/interview_db
CLERK_SECRET_KEY=sk_test_gpiButtiZH08g0cqGU9sVz4FT1poFKagMjI0NhXKy3
STREAM_API_KEY=kwyacaex7etc
STREAM_API_SECRET=c5q7nbwmhpxm2w6ubyu7njzbjpd8j8w63qu5j43j3anv9havtxdzurwksb8f2v34
PISTON_URL=https://emkc.org/api/v2/piston

CLIENT_URL=http://localhost:5173
```


### Frontend (`frontend/.env`)
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_YWJzb2x1dGUtc3VuYmlyZC04OS5jbGVyay5hY2NvdW50cy5kZXYk
VITE_STREAM_API_KEY=kwyacaex7etc
VITE_BACKEND_URL=http://localhost:3000/api
```


---

## ⚙️ How to Run Locally

### 1️⃣ Clone Repository
```
git clone https://github.com/Ayan2027/Talent-IQ

cd Talent-IQ
```

### 2️⃣ Start Backend
```
cd backend
npm install
npm run dev
```


Backend runs on:
```
http://localhost:4000
```


### 3️⃣ Start Frontend
```
cd ../frontend
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

## 🔄 How Interview Sessions Work

1. Host creates a session  
2. A room is generated  
3. Candidate joins  
4. Video + Chat + Code Editor start  
5. Code is written & executed  
6. Output is validated  
7. Session ends → Dashboard updates  

---

## 👨‍💻 Author

**Ayan Dhal**  
GitHub: https://github.com/Ayan2027  

---

## 🌟 Summary

TALENT-IQ is a production-grade interview platform that demonstrates:
- Real-time collaboration
- WebRTC video calls
- Secure code execution
- Scalable backend design
- Modern frontend architecture

This project showcases **startup-level engineering**.
