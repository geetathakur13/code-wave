# 🎓 StudyHouse — Your One-Stop Resource Destination

A complete academic resource platform for **RGPV** (Rajiv Gandhi Proudyogiki Vishwavidyalaya) CSE students. Built with **Next.js 14**, **Tailwind CSS**, and **Firebase**.

![StudyHouse Logo](public/logo.png)

---

## ✨ Features

- **📚 40+ Subjects** across 8 semesters with unit-wise topics
- **📝 Previous Year Questions** organized by semester, subject, and year
- **🎥 Video Lectures** with YouTube integration
- **🧠 Quiz System** — Practice MCQs + AI-generated quizzes (Gemini API)
- **🃏 Flashcards** — Flip-card revision for key concepts
- **📊 Dashboard** — Track streaks, quiz scores, and bookmarks
- **📤 Notes Upload** — Students can contribute study materials
- **🤖 AI Chatbot** — StudyBot powered by Google Gemini
- **🔐 Firebase Auth** — Google Sign-In + Email/Password
- **🌙 Dark/Light Mode** — Theme toggle with persistence
- **🔍 Global Search** — Cmd+K / Ctrl+K search across all subjects
- **📱 Fully Responsive** — Mobile-first design with collapsible sidebar

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Firebase project (free tier works)
- (Optional) A Google Gemini API key

### 1. Clone & Install

```bash
git clone https://github.com/your-username/studyhouse.git
cd studyhouse
npm install
```

### 2. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Authentication** → Sign-in methods:
   - Email/Password ✅
   - Google ✅
4. Create **Firestore Database** (start in test mode)
5. Enable **Firebase Storage** (for note uploads)
6. Go to Project Settings → General → Your apps → Add Web App
7. Copy the Firebase config values

### 3. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Firebase config:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key (optional)
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import your repo
3. Add all environment variables in Vercel's dashboard
4. Deploy!

---

## 📁 Project Structure

```
studyhouse/
├── app/                    # Next.js App Router pages
│   ├── layout.js           # Root layout with sidebar + header
│   ├── page.js             # Home page
│   ├── globals.css          # Global styles
│   ├── login/page.js       # Login / Sign Up
│   ├── semesters/page.js   # All semesters
│   ├── subject/[slug]/     # Subject detail (dynamic)
│   ├── quiz/page.js        # Quiz (practice + AI)
│   ├── flashcards/page.js  # Flashcards
│   ├── dashboard/page.js   # User dashboard (protected)
│   ├── pyq/page.js         # Previous year questions
│   ├── videos/page.js      # Video lectures
│   ├── upload/page.js      # Upload notes (protected)
│   ├── syllabus/page.js    # Full syllabus
│   ├── about/page.js       # About + team
│   └── contact/page.js     # Contact form
├── components/
│   ├── Sidebar.js          # Left sidebar navigation
│   ├── Header.js           # Sticky top header
│   ├── Footer.js           # Site footer
│   ├── SearchModal.js      # Cmd+K search
│   ├── ChatBot.js          # Floating AI chatbot
│   └── ProtectedRoute.js   # Auth guard wrapper
├── context/
│   ├── AuthContext.js       # Firebase auth state
│   ├── ThemeContext.js      # Dark/light mode
│   └── AppContext.js        # Bookmarks, progress, streaks
├── lib/
│   ├── firebase.js          # Firebase initialization
│   ├── gemini.js            # Gemini API helper
│   ├── data.js              # All subjects, quizzes, flashcards
│   └── storage.js           # localStorage helpers
├── public/
│   └── logo.png             # StudyHouse logo
├── .env.local.example       # Environment variables template
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#2563EB` | Buttons, links, active states |
| Dark Blue | `#1E40AF` | Headings, CTAs |
| Light Blue | `#EFF6FF` | Subtle backgrounds |
| Dark BG | `#0F172A` | Dark mode background |
| Card Dark | `#1E293B` | Dark mode cards |

---

## 🔥 Firestore Collections

| Collection | Purpose |
|------------|---------|
| `users/{uid}` | User profiles |
| `bookmarks/{uid}` | Bookmarked subjects |
| `progress/{uid}/{slug}` | Unit completion tracking |
| `quizScores/{uid}/{slug}` | Quiz attempt history |
| `streaks/{uid}` | Study streak data |
| `discussions/{slug}/questions` | Q&A per subject |
| `uploads/{docId}` | Uploaded notes metadata |
| `contacts/{docId}` | Contact form submissions |

---

## 👥 Team

- **Geeta Thakur** — Developer
- **Adarsh Sahu** — Developer
- **Aakanksha Gendiya** — Developer

---

## 📝 Notes

- The AI chatbot and AI quiz require a valid Gemini API key. Without it, hardcoded fallback responses are used.
- PDF download buttons are placeholders — add real PDF URLs in `lib/data.js` later.
- Video lecture YouTube IDs are placeholders — replace with real IDs.
- PYQ entries are placeholder data — add real papers later.

---

## 📄 License

© 2025 StudyHouse | All rights reserved.

Made with ❤️ by Geeta, Adarsh & Aakanksha
