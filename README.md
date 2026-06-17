# 🎓 StudyHouse — Your One-Stop Resource Destination

A complete academic resource platform for **RGPV** (Rajiv Gandhi Proudyogiki Vishwavidyalaya) CSE students. Built with **Next.js 14**, **Tailwind CSS**, and **Firebase**.

![StudyHouse Logo](public/logo.png)

---

## 📖 Table of Contents

- [Features](#-features)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Design System](#-design-system)
- [Firestore Collections](#-firestore-collections)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [Team](#-team)
- [License](#-license)

---

## ✨ Features

### 📚 Core Resources
- **📚 40+ Subjects** across 8 semesters with unit-wise topics
- **📝 Previous Year Questions** organized by semester, subject, and year
- **🎥 Video Lectures** with YouTube integration
- **🧠 Quiz System** — Practice MCQs + AI-generated quizzes (Gemini API)
- **🃏 Flashcards** — Flip-card revision for key concepts
- **📊 Dashboard** — Track streaks, quiz scores, and bookmarks (🔒 protected)
- **📤 Notes Upload** — Students can contribute study materials (🔒 protected)
- **🤖 AI Chatbot** — StudyBot powered by Google Gemini
- **🔐 Firebase Auth** — Google Sign-In + Email/Password
- **🌙 Dark/Light Mode** — Theme toggle with persistence
- **🔍 Global Search** — Cmd+K / Ctrl+K search across all subjects
- **📱 Fully Responsive** — Mobile-first design with collapsible sidebar

### 🚀 AI-Powered Tools
- **🤖 AI Study Agent** — Agentic assistant built on Gemini **function-calling**. It autonomously plans your study schedule, generates daily quizzes, analyzes your weak spots, and reschedules based on your progress and availability.
- **💻 DSA Playground** — Solve built-in problems (Two Sum, Reverse a Linked List, Valid Parentheses, Binary Search) and run code in **4 languages** (Python, JavaScript, C++, Java). Includes custom test cases and AI-powered code review.
- **📺 YouTube → Notes** — Paste any lecture link and get **structured notes + an auto-generated quiz** in seconds.
- **🔁 SRS Flashcards** — **Spaced-repetition** flashcards (Anki-style) that schedule each card's next review based on how well you recalled it.
- **🎙️ Mock Interview** — **Voice-based** placement prep across DSA, OOPs, DBMS, OS, Networks, and System Design (easy / medium / hard). AI evaluates **correctness, confidence, and filler words**.
- **📄 Resume Analyzer** — Upload your resume PDF, pick a target role, and get an **ATS score + actionable fixes** before you apply.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and **npm 9+** installed
- A Firebase project ([free tier works](https://firebase.google.com/))
- A Google Gemini API key (required for the AI tools)

### 1. Clone & Install

```bash
git clone https://github.com/geetathakur13/code-wave.git
cd code-wave
npm install
```

### 2. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Authentication** → Sign-in methods:
   - ✅ Email/Password
   - ✅ Google
4. Create **Firestore Database** (start in test mode for development)
   - ⚠️ **For production**, apply proper [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)
5. Enable **Firebase Storage** (for note uploads)
6. Go to Project Settings → General → Your apps → Add Web App
7. Copy the Firebase config values

### 3. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Firebase and Gemini API keys:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
```

> **Note:** The Gemini key powers six AI features (Study Agent, AI Quiz, Chatbot, YouTube → Notes, Mock Interview, Resume Analyzer). Without it, those features fall back to hardcoded sample responses. Get your key [here](https://makersuite.google.com/app/apikey).

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import your repo
3. Add all environment variables in Vercel's dashboard (Settings → Environment Variables)
4. Deploy!

---

## 📁 Project Structure

```
code-wave/
├── app/                       # Next.js App Router pages
│   ├── layout.js              # Root layout with sidebar + header
│   ├── page.js                # Home page (public)
│   ├── globals.css            # Global styles
│   ├── login/page.js          # Login / Sign Up (public)
│   ├── semesters/page.js      # All semesters (public)
│   ├── subject/[slug]/        # Subject detail (public, dynamic)
│   ├── quiz/page.js           # Quiz — practice + AI (public)
│   ├── flashcards/page.js     # Flashcards (public)
│   ├── dashboard/page.js      # User dashboard (🔒 protected)
│   ├── pyq/page.js            # Previous year questions (public)
│   ├── videos/page.js         # Video lectures (public)
│   ├── upload/page.js         # Upload notes (🔒 protected)
│   ├── syllabus/page.js       # Full syllabus (public)
│   ├── about/page.js          # About + team (public)
│   ├── contact/page.js        # Contact form (public)
│   │
│   ├── agent/page.js          # 🤖 AI Study Agent (Gemini function-calling)
│   ├── playground/page.js     # 💻 DSA Playground (4-language code runner)
│   ├── youtube-notes/page.js  # 📺 YouTube → notes + auto quiz
│   ├── flashcards-srs/page.js # 🔁 Spaced-repetition flashcards
│   ├── mock-interview/page.js # 🎙️ Voice-based mock interview
│   └── resume-analyzer/page.js# 📄 Resume ATS analyzer
├── components/
│   ├── Sidebar.js             # Left sidebar navigation
│   ├── Header.js              # Sticky top header
│   ├── Footer.js              # Site footer
│   ├── SearchModal.js         # Cmd+K search
│   ├── ChatBot.js             # Floating AI chatbot
│   └── ProtectedRoute.js      # Auth guard wrapper
├── context/
│   ├── AuthContext.js         # Firebase auth state
│   ├── ThemeContext.js        # Dark/light mode
│   └── AppContext.js          # Bookmarks, progress, streaks
├── lib/
│   ├── firebase.js            # Firebase initialization
│   ├── gemini.js              # Gemini API helper
│   ├── data.js                # All subjects, quizzes, flashcards
│   └── storage.js             # localStorage helpers
├── public/
│   └── logo.png               # StudyHouse logo
├── .env.local.example         # Environment variables template
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
| `users/{uid}` | User profiles (name, email, avatar) |
| `bookmarks/{uid}` | Bookmarked subjects |
| `progress/{uid}/{slug}` | Unit completion tracking |
| `quizScores/{uid}/{slug}` | Quiz attempt history |
| `streaks/{uid}` | Study streak data |
| `discussions/{slug}/questions` | Q&A per subject |
| `uploads/{docId}` | Uploaded notes metadata |
| `contacts/{docId}` | Contact form submissions |

---

## 🐛 Troubleshooting

### "Gemini API key invalid"
- Check that `NEXT_PUBLIC_GEMINI_API_KEY` is set in `.env.local`
- Verify the key is valid at [Google AI Studio](https://makersuite.google.com/app/apikey)
- Ensure your project has the Generative Language API enabled

### "Firebase auth not working"
- Ensure **Email/Password** and **Google Sign-In** are enabled in Firebase Console
- Check that your Firebase config values in `.env.local` match your Firebase project
- Clear browser cache and reload the page

### "Mock Interview has no audio"
- The feature requires HTTPS or `localhost`
- Check browser microphone permissions (may need to reload page)
- Works best in Chrome/Edge; Safari and Firefox have limited mic API support

### "Code Playground errors"
- Ensure you're using valid syntax for the selected language
- Python: test with `print("hello")`, JavaScript: test with `console.log("hello")`
- Check the output console for detailed error messages

### "Firestore quota exceeded"
- You're likely on the free tier with rate limits
- Upgrade to a paid plan or wait for the limit reset (see [Firestore Pricing](https://firebase.google.com/pricing))

---

## 🗺️ Roadmap

### Phase 1 (Q3 2025)
- [x] Core subject + semester structure
- [x] Quiz system with Gemini integration
- [x] Study Agent (function-calling)
- [x] DSA Playground

### Phase 2 (Q4 2025)
- [ ] Peer discussion forums
- [ ] Real-time collaboration on notes
- [ ] Study group matchmaking
- [ ] Mobile app (React Native)

### Phase 3 (2026)
- [ ] Proctored mock exams
- [ ] Placement portal integration
- [ ] Analytics dashboard for educators
- [ ] Multi-university support

---

## 👥 Team

- **Geeta Thakur** — Full Stack Developer
- **Adarsh Sahu** — Full Stack Developer
- **Aakanksha Gendiya** — Full Stack Developer

---

## 📝 Notes & Caveats

- **Gemini API quotas** — The free tier has rate limits. Test heavily before production use.
- **Mock Interview** — Requires HTTPS in production. Uses browser microphone API (needs user permission).
- **PDF downloads** — Currently placeholders. Add real PDF URLs in `lib/data.js` to enable.
- **YouTube IDs** — Replace placeholder IDs with real lecture links in `lib/data.js`.
- **PYQ data** — Currently placeholder. Add real previous year question papers later.
- **Firestore test mode** — Suitable for development only. Apply security rules before production deployment.

---

## 📄 License

© 2025 StudyHouse | All rights reserved.

Made with ❤️ by Geeta, Adarsh & Aakanksha
