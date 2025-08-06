# ✉️ AI Email Generator

An AI-powered email sender that helps you generate professional emails using Together.ai, edit them, and send them to recipients—all from a sleek React + Tailwind interface.

## 🌐 Live Demo

- 🔗 : [https://email-sender-app-two.vercel.app/](https://email-sender-app-two.vercel.app/)

## 🚀 Features

- 🤖 Generate professional emails from a prompt using Together.ai (LLaMA 3.3 Turbo)
- ✍️ Choose a tone for the email (e.g., friendly, formal, assertive)
- 📝 Auto-fills subject and body, editable by the user
- 📧 Send the email using Nodemailer and Gmail
- 🎨 Responsive UI styled with Tailwind CSS

## 🛠 Tech Stack

| Frontend     | Backend      | AI              | Email              |
| ------------ | ------------ | --------------- | ------------------ |
| React + Vite | Express.js   | Together.ai     | Nodemailer (Gmail) |
| Tailwind CSS | CORS, dotenv | LLaMA 3.3 Turbo | Gmail SMTP         |

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-email-sender.git
cd ai-email-sender
```

### 2. Setup Backend

```bash
cd servre
npm install
```

#### Create a .env file with:

```.env
MAIL_USER = your-email@gmail.com
MAIL_PASS = your-gmail-app-password
```

⚠️ Use Gmail App Passwords, not your main password.

#### Start the backend server

```bash
nodemon index.js
```

By default, runs on: http://localhost:3000

### 3. Setup Frontend

```bash
cd client
npm install
```

#### Start the frontend

```bash
npm run dev
```

Runs on: http://localhost:5173

## Deployment Notes

### Frontend: Deployed on Vercel

URL: https://email-sender-app-two.vercel.app/

### Backend: Deployed on Render

URL: https://email-sender-app-mnov.onrender.com/

## 🧠 Example Usage

Prompt: "Congratulate Rahul for passing his exam"
Tone: Friendly

✅ Output: AI-generated subject + editable professional email body
✅ Press Send Email → sent via Gmail with real content

## 📸 Screenshots

Add screenshots of the UI and generated emails here if required.

## 🙋‍♂️ Author

Rahul Swarup

- 🔗 GitHub -
- 🔗 Portfolio - https://rahulswarup.vercel.app
- 🔗 LinkedIn - https://www.linkedin.com/in/rahulswarup2407/

---

Let me know if you'd like:

- A downloadable `.md` file
- A badge-based README (Vercel badge, Render badge, etc.)
- Screenshot mockups or actual UI snapshot sections
